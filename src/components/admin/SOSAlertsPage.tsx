import React from 'react';
import { AlertTriangle, Bell, MapPin, Radio } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function SOSAlertsPage() {
  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Live SOS Alerts</h2>
          <p className="text-slate-400 text-base mt-1">
            Real-time emergency distress signals from students and institutions
          </p>
        </div>
        <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 py-1.5 text-sm">
          <Radio className="h-4 w-4 mr-1.5" />
          Awaiting Signals
        </Badge>
      </div>

      <Card className="bg-slate-900/80 border-slate-800 p-8 lg:p-12 min-h-[420px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-red-600/15 border border-red-600/30 flex items-center justify-center mb-5">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>

        <h3 className="text-2xl font-semibold text-white mb-2">Awaiting incoming emergency signals...</h3>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          This space will display live SOS alerts with student details, location coordinates, timestamps, and
          acknowledgment controls once we connect the backend event stream.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left">
            <div className="text-slate-500 text-xs mb-1">Signal Status</div>
            <div className="text-white font-semibold flex items-center">
              <Bell className="h-4 w-4 mr-2 text-slate-400" />
              No active alerts
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left">
            <div className="text-slate-500 text-xs mb-1">Pending Queue</div>
            <div className="text-white font-semibold">0 events</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-left">
            <div className="text-slate-500 text-xs mb-1">Latest Location</div>
            <div className="text-white font-semibold flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-slate-400" />
              N/A
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
