import { getInstitutionById } from './institutionsData';
import { sosService } from '../../services/api';

interface StudentSosUser {
  schoolName: string;
  schoolCode: string;
  studentName: string;
}

interface TriggerStudentSosParams {
  userData?: StudentSosUser | null;
  addAlert: (alert: {
    institution: string;
    institutionId: string;
    district: string;
    state: string;
    studentName: string;
    type: 'General Emergency';
    status: 'active';
    location: string;
    severity: 'high';
    description: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }) => void;
  source: 'Dashboard' | 'Header';
}

interface LocationPayload {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  locationText: string;
}

function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location services are not available on this device/browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function getGeoPermissionState(): Promise<PermissionState | 'unknown'> {
  if (!('permissions' in navigator) || !navigator.permissions?.query) {
    return 'unknown';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state;
  } catch {
    return 'unknown';
  }
}

function normalizeGeoError(error: unknown): string {
  const geoError = error as GeolocationPositionError;
  if (geoError && typeof geoError.code === 'number') {
    if (geoError.code === 1) {
      return 'Location access is blocked for this site. Please allow location access and retry.';
    }
    if (geoError.code === 2) {
      return 'Unable to detect current location. Please check GPS/network and retry.';
    }
    if (geoError.code === 3) {
      return 'Location request timed out. Please retry in an open signal area.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }
  return 'Unable to capture location at the moment.';
}

async function resolveSosLocation(
  institutionCoords?: { lat: number; lng: number },
): Promise<LocationPayload> {
  try {
    const firstAttempt = await getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });

    return {
      latitude: firstAttempt.coords.latitude,
      longitude: firstAttempt.coords.longitude,
      accuracyMeters: Number.isFinite(firstAttempt.coords.accuracy) ? firstAttempt.coords.accuracy : undefined,
      locationText: `Lat ${firstAttempt.coords.latitude.toFixed(6)}, Lng ${firstAttempt.coords.longitude.toFixed(6)}`,
    };
  } catch (firstError) {
    const firstGeoError = firstError as GeolocationPositionError;
    const permissionState = await getGeoPermissionState();

    // Some browsers can transiently return permission denied right after granting.
    if (firstGeoError?.code === 1 && permissionState === 'granted') {
      try {
        const retryAttempt = await getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 12000,
          maximumAge: 30000,
        });
        return {
          latitude: retryAttempt.coords.latitude,
          longitude: retryAttempt.coords.longitude,
          accuracyMeters: Number.isFinite(retryAttempt.coords.accuracy) ? retryAttempt.coords.accuracy : undefined,
          locationText: `Lat ${retryAttempt.coords.latitude.toFixed(6)}, Lng ${retryAttempt.coords.longitude.toFixed(6)}`,
        };
      } catch {
        // Fall through to fallback path below.
      }
    }

    if (institutionCoords) {
      return {
        latitude: institutionCoords.lat,
        longitude: institutionCoords.lng,
        accuracyMeters: undefined,
        locationText: `Approx institution location: ${institutionCoords.lat.toFixed(6)}, ${institutionCoords.lng.toFixed(6)}`,
      };
    }

    throw new Error(normalizeGeoError(firstError));
  }
}

export async function triggerStudentSosAlert({ userData, addAlert, source }: TriggerStudentSosParams): Promise<void> {
  const institution = getInstitutionById(userData?.schoolCode || '');
  const institutionName = institution?.name || userData?.schoolName || 'Unknown Institution';
  const institutionId = institution?.id || userData?.schoolCode || 'unknown';
  const district = institution?.district || 'Unknown District';
  const state = institution?.state || 'Unknown State';
  const studentName = userData?.studentName || 'Unknown Student';

  const resolvedLocation = await resolveSosLocation(institution?.coordinates);

  try {
    await sosService.trigger({
      latitude: resolvedLocation.latitude,
      longitude: resolvedLocation.longitude,
      location_text: resolvedLocation.locationText,
      accuracy_meters: resolvedLocation.accuracyMeters,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : '';
    const maybeStatus = (error as { status?: number } | null)?.status;
    const alreadyActive = maybeStatus === 429 || message.includes('already sent recently');
    if (!alreadyActive) {
      throw error;
    }

    // SOS was already active; keep UI flow consistent across all SOS entry points.
    return;
  }

  addAlert({
    institution: institutionName,
    institutionId,
    district,
    state,
    studentName,
    type: 'General Emergency',
    status: 'active',
    location: `Student ${source} - ${resolvedLocation.locationText}`,
    severity: 'high',
    description: `Emergency SOS alert triggered by student ${studentName}`,
    coordinates: {
      lat: resolvedLocation.latitude,
      lng: resolvedLocation.longitude,
    },
  });
}