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

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Location services are not available on this device/browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    });
  });
}

export async function triggerStudentSosAlert({ userData, addAlert, source }: TriggerStudentSosParams): Promise<void> {
  const institution = getInstitutionById(userData?.schoolCode || '');
  const institutionName = institution?.name || userData?.schoolName || 'Unknown Institution';
  const institutionId = institution?.id || userData?.schoolCode || 'unknown';
  const district = institution?.district || 'Unknown District';
  const state = institution?.state || 'Unknown State';
  const studentName = userData?.studentName || 'Unknown Student';

  let position: GeolocationPosition;
  try {
    position = await getCurrentPosition();
  } catch (error) {
    const geoError = error as GeolocationPositionError | Error;
    if ('code' in geoError && geoError.code === 1) {
      throw new Error('Location permission was denied. Please allow location access and try again.');
    }
    if ('code' in geoError && geoError.code === 2) {
      throw new Error('Unable to detect current location. Please check GPS/network and retry.');
    }
    if ('code' in geoError && geoError.code === 3) {
      throw new Error('Location request timed out. Please retry in an open signal area.');
    }
    throw geoError;
  }

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = Number.isFinite(position.coords.accuracy) ? position.coords.accuracy : undefined;
  const locationText = `Lat ${latitude.toFixed(6)}, Lng ${longitude.toFixed(6)}`;

  await sosService.trigger({
    latitude,
    longitude,
    location_text: locationText,
    accuracy_meters: accuracy,
  });

  addAlert({
    institution: institutionName,
    institutionId,
    district,
    state,
    studentName,
    type: 'General Emergency',
    status: 'active',
    location: `Student ${source} - ${locationText}`,
    severity: 'high',
    description: `Emergency SOS alert triggered by student ${studentName}`,
    coordinates: {
      lat: latitude,
      lng: longitude,
    },
  });
}