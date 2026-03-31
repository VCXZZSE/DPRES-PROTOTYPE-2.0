import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  Clock,
  Crosshair,
  IdCard,
  Mail,
  MapPin,
  Radio,
  RefreshCcw,
  User,
} from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { sosService, type ActiveSosEvent } from '../../services/api';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const INDIA_CENTER: LatLngExpression = [22.5937, 78.9629];
const INDIA_BOUNDS: [[number, number], [number, number]] = [
  [6.4, 68.1],
  [37.6, 97.4],
];

function FlyToAlert({ alert }: { alert: ActiveSosEvent | null }) {
  const map = useMap();

  useEffect(() => {
    if (!alert) {
      return;
    }
    map.flyTo([alert.latitude, alert.longitude], 9, { duration: 0.8 });
  }, [alert, map]);

  return null;
}

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

function formatCoord(value: number): string {
  return value.toFixed(6);
}

export function SOSAlertsPage() {
  const [events, setEvents] = useState<ActiveSosEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedEvent = useMemo(
    () => events.find((event) => event.event_id === selectedEventId) || events[0] || null,
    [events, selectedEventId],
  );

  const loadEvents = async () => {
    try {
      setError(null);
      const response = await sosService.getActiveAdmin();
      setEvents(response.events || []);
      setSelectedEventId((currentSelectedId) => {
        if (!response.events.length) {
          return null;
        }
        if (currentSelectedId && response.events.some((event) => event.event_id === currentSelectedId)) {
          return currentSelectedId;
        }
        return response.events[0].event_id;
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch active SOS events.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();

    const intervalId = window.setInterval(() => {
      loadEvents();
    }, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Live SOS Alerts</h2>
          <p className="text-slate-400 text-base mt-1">
            Real-time emergency distress signals from students and institutions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 py-1.5 text-sm">
            <Radio className="h-4 w-4 mr-1.5" />
            {events.length ? `${events.length} Active` : 'Awaiting Signals'}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={loadEvents}
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6">
        <Card className="xl:col-span-8 bg-slate-900/90 border-slate-800 p-2 lg:p-3">
          <div className="h-105 lg:h-140 rounded-lg overflow-hidden border border-slate-800">
            <MapContainer
              center={INDIA_CENTER}
              zoom={5}
              minZoom={4}
              maxZoom={16}
              maxBounds={INDIA_BOUNDS}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {events.map((event) => (
                <Marker
                  key={event.event_id}
                  position={[event.latitude, event.longitude]}
                  eventHandlers={{
                    click: () => setSelectedEventId(event.event_id),
                  }}
                >
                  <Popup>
                    <div className="text-sm min-w-50">
                      <div className="font-semibold text-slate-900">{event.student.full_name || 'Student'}</div>
                      <div className="text-slate-700">{event.student.email}</div>
                      <div className="mt-1 text-slate-700">{formatTimestamp(event.created_at)}</div>
                      <div className="mt-1 text-slate-700">
                        {formatCoord(event.latitude)}, {formatCoord(event.longitude)}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <FlyToAlert alert={selectedEvent} />
            </MapContainer>
          </div>
        </Card>

        <Card className="xl:col-span-4 bg-slate-900/90 border-slate-800 p-4 lg:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">{events.length}</Badge>
          </div>

          {loading && (
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-slate-300 text-sm">
              Loading active SOS events...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-700/40 bg-red-950/20 p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center mb-3">
                <Bell className="h-7 w-7 text-red-400" />
              </div>
              <div className="text-white font-medium">No active SOS events</div>
              <div className="text-slate-400 text-sm mt-1">The map will update automatically when a new SOS arrives.</div>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="space-y-3 max-h-62.5 lg:max-h-80 overflow-auto pr-1">
              {events.map((event) => {
                const selected = selectedEvent?.event_id === event.event_id;
                return (
                  <button
                    key={event.event_id}
                    onClick={() => setSelectedEventId(event.event_id)}
                    className={`w-full text-left rounded-lg border p-3 transition-colors ${
                      selected
                        ? 'border-red-500/60 bg-red-900/20'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-white font-medium text-sm">{event.student.full_name || 'Student'}</div>
                    <div className="text-slate-400 text-xs mt-1">{event.student.email}</div>
                    <div className="text-slate-400 text-xs mt-1 flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatTimestamp(event.created_at)}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
            <h4 className="text-white font-semibold mb-3">Selected Alert Details</h4>

            {!selectedEvent && <div className="text-slate-400 text-sm">Select an alert to view student and location details.</div>}

            {selectedEvent && (
              <div className="space-y-2.5 text-sm">
                <div className="text-slate-200 flex items-start">
                  <User className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                  <span>{selectedEvent.student.full_name || 'N/A'}</span>
                </div>
                <div className="text-slate-200 flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                  <span>{selectedEvent.student.email}</span>
                </div>
                <div className="text-slate-200 flex items-start">
                  <IdCard className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                  <span>{selectedEvent.student.id_card_number || 'N/A'}</span>
                </div>
                <div className="text-slate-200 flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                  <span>{formatTimestamp(selectedEvent.created_at)}</span>
                </div>
                <div className="text-slate-200 flex items-start">
                  <Crosshair className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                  <span>
                    {formatCoord(selectedEvent.latitude)}, {formatCoord(selectedEvent.longitude)}
                  </span>
                </div>
                <div className="text-slate-200 flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                  <span>{selectedEvent.location_text || 'GPS coordinate only'}</span>
                </div>
                <div className="text-slate-200 flex items-start">
                  <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-red-400" />
                  <span className="text-red-300 uppercase">{selectedEvent.status}</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left">
          <div className="text-slate-500 text-xs mb-1">Signal Status</div>
          <div className="text-white font-semibold flex items-center">
            <Bell className="h-4 w-4 mr-2 text-slate-400" />
            {events.length ? 'Live events incoming' : 'No active alerts'}
          </div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left">
          <div className="text-slate-500 text-xs mb-1">Pending Queue</div>
          <div className="text-white font-semibold">{events.length} events</div>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left">
          <div className="text-slate-500 text-xs mb-1">Latest Location</div>
          <div className="text-white font-semibold flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
            {selectedEvent ? `${formatCoord(selectedEvent.latitude)}, ${formatCoord(selectedEvent.longitude)}` : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
}
