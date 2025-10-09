import React, { useState } from 'react';
import { MapPin, School, Building2, AlertTriangle, X, Info } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { allInstitutions, representedStates } from './shared/institutionsData';
import { useAlerts } from './shared/AlertContext';
import { indiaStatesAccurateGeoJSON } from './shared/indiaGeography';

interface IndiaMapProps {
  className?: string;
  showInstitutions?: boolean;
  onInstitutionClick?: (institutionId: string) => void;
}

export function IndiaMap({ className = '', showInstitutions = true, onInstitutionClick }: IndiaMapProps) {
  const { getActiveAlerts } = useAlerts();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const activeAlerts = getActiveAlerts();

  // Convert geographical coordinates to SVG coordinates
  const geoToSVG = (lng: number, lat: number) => {
    // India bounds: lng 68-97, lat 8-37
    const minLng = 68, maxLng = 97, minLat = 8, maxLat = 37;
    const svgWidth = 700, svgHeight = 800;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * svgWidth;
    const y = svgHeight - ((lat - minLat) / (maxLat - minLat)) * svgHeight;
    
    return { x, y };
  };

  // Convert GeoJSON coordinates to SVG path
  const createSVGPath = (coordinates: number[][][]) => {
    if (!coordinates || !coordinates[0]) return '';
    
    const coords = coordinates[0]; // First polygon ring
    let path = '';
    
    coords.forEach((coord, index) => {
      const [lng, lat] = coord;
      const { x, y } = geoToSVG(lng, lat);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    path += ' Z'; // Close path
    return path;
  };

  // State coordinates for institutions (converted from lat/lng)
  const stateCoordinates = {
    'Delhi': geoToSVG(77.10, 28.70),
    'Maharashtra': geoToSVG(75.71, 19.75),
    'Karnataka': geoToSVG(75.71, 15.32),
    'Tamil Nadu': geoToSVG(78.66, 11.13),
    'Telangana': geoToSVG(79.02, 18.11),
    'Rajasthan': geoToSVG(74.22, 27.02)
  };

  const getInstitutionsByState = (state: string) => {
    return allInstitutions.filter(inst => inst.state === state);
  };

  const getStateAlerts = (state: string) => {
    return activeAlerts.filter(alert => alert.state === state);
  };

  const getStateColor = (state: string) => {
    const alerts = getStateAlerts(state);
    const institutions = getInstitutionsByState(state);
    
    if (alerts.length > 0) {
      return '#dc2626'; // Red for states with active alerts
    } else if (institutions.length > 0) {
      return '#10b981'; // Emerald green for states with institutions but no alerts
    } else {
      return '#84cc16'; // Lime green for states without institutions (matching image aesthetic)
    }
  };

  return (
    <div className={`relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-slate-700 ${className}`}>
      {/* Clean, modern India map SVG */}
      <svg
        viewBox="0 0 700 800"
        className="w-full h-full"
        style={{ maxHeight: '700px' }}
      >
        {/* Modern definitions */}
        <defs>
          <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
          <linearGradient id="activeStateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="alertStateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <filter id="modernShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1"/>
          </filter>
          <filter id="hoverGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Clean background */}
        <rect width="700" height="800" fill="#f8fafc" className="dark:fill-slate-800" />

        {/* India states with modern styling */}
        <g stroke="#ffffff" strokeWidth="2" fill="none" filter="url(#modernShadow)">
          {indiaStatesAccurateGeoJSON.features.map((feature) => {
            const stateName = feature.properties.name;
            const pathData = createSVGPath(feature.geometry.coordinates);
            const alerts = getStateAlerts(stateName);
            const institutions = getInstitutionsByState(stateName);
            const isHovered = hoveredState === stateName;
            const isSelected = selectedState === stateName;
            
            let fillColor = 'url(#stateGradient)';
            if (alerts.length > 0) {
              fillColor = 'url(#alertStateGradient)';
            } else if (institutions.length > 0) {
              fillColor = 'url(#activeStateGradient)';
            }
            
            return (
              <path
                key={feature.properties.state_code}
                d={pathData}
                fill={fillColor}
                className={`cursor-pointer transition-all duration-300 ease-in-out ${
                  isHovered ? 'opacity-90 brightness-110' : 'opacity-100'
                } ${isSelected ? 'stroke-blue-500 stroke-4' : ''}`}
                style={{
                  filter: isHovered ? 'url(#hoverGlow)' : 'url(#modernShadow)',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
                onClick={() => setSelectedState(selectedState === stateName ? null : stateName)}
                onMouseEnter={() => setHoveredState(stateName)}
                onMouseLeave={() => setHoveredState(null)}
              />
            );
          })}
        </g>

        {/* Modern state labels - only show on hover or selection */}
        <g className="text-sm font-semibold pointer-events-none">
          {hoveredState && (
            <text 
              x="350" 
              y="50" 
              textAnchor="middle" 
              className="fill-gray-800 dark:fill-white text-lg font-bold animate-in fade-in duration-200"
            >
              {hoveredState}
            </text>
          )}
        </g>

        {/* Modern institution markers - subtle and clean */}
        {showInstitutions && representedStates.map(state => {
          const institutions = getInstitutionsByState(state);
          const stateCoord = stateCoordinates[state as keyof typeof stateCoordinates];
          
          if (!stateCoord || institutions.length === 0) return null;
          
          return (
            <g key={state}>
              {/* Single marker per state with count */}
              <circle
                cx={stateCoord.x}
                cy={stateCoord.y}
                r="16"
                fill="rgba(59, 130, 246, 0.9)"
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer hover:scale-110 transition-all duration-300 drop-shadow-lg"
                onClick={() => setSelectedState(selectedState === state ? null : state)}
              />
              <text
                x={stateCoord.x}
                y={stateCoord.y + 1}
                textAnchor="middle"
                className="text-sm fill-white font-bold pointer-events-none"
              >
                {institutions.length}
              </text>
              
              {/* Alert indicator if any alerts in this state */}
              {getStateAlerts(state).length > 0 && (
                <circle
                  cx={stateCoord.x + 12}
                  cy={stateCoord.y - 12}
                  r="8"
                  fill="#ef4444"
                  stroke="white"
                  strokeWidth="2"
                  className="animate-pulse drop-shadow-md"
                />
              )}
            </g>
          );
        })}

        {/* Minimalist compass */}
        <g className="opacity-60">
          <circle cx="50" cy="50" r="24" fill="rgba(255,255,255,0.9)" stroke="#6b7280" strokeWidth="1" className="drop-shadow-sm"/>
          <text x="50" y="45" textAnchor="middle" className="text-xs fill-gray-700 font-semibold">N</text>
          <path d="M 46 58 L 50 42 L 54 58 L 50 54 Z" fill="#6b7280" />
        </g>

        {/* Clean title */}
        <text x="350" y="30" textAnchor="middle" className="text-2xl font-bold fill-gray-800 dark:fill-white">भारत</text>
        <text x="350" y="45" textAnchor="middle" className="text-sm fill-gray-600 dark:fill-gray-300">Disaster Preparedness Network</text>
      </svg>

      {/* Modern, minimal legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-lime-400 to-lime-600"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Alert</span>
          </div>
        </div>
      </div>

      {/* Hover state info card */}
      {hoveredState && (
        <div className="absolute top-6 left-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-100 dark:border-gray-700 animate-in slide-in-from-left duration-200">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{hoveredState}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{getInstitutionsByState(hoveredState).length} Institutions</span>
                {getStateAlerts(hoveredState).length > 0 && (
                  <span className="text-red-500 font-medium">
                    {getStateAlerts(hoveredState).length} Alert{getStateAlerts(hoveredState).length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern state details panel */}
      {selectedState && (
        <div className="absolute top-6 right-6 w-96 max-w-[calc(100vw-3rem)]">
          <Card className="bg-white/98 dark:bg-slate-800/98 backdrop-blur-lg shadow-2xl border-0 rounded-3xl overflow-hidden animate-in slide-in-from-right duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">{selectedState}</CardTitle>
                  <p className="text-blue-100 text-sm opacity-90">
                    {getInstitutionsByState(selectedState).length} Educational Institutions
                  </p>
                </div>
                <button
                  onClick={() => setSelectedState(null)}
                  className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {getInstitutionsByState(selectedState).filter(i => i.type === 'school').length}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Schools</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-4 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {getInstitutionsByState(selectedState).filter(i => i.type === 'college').length}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Colleges</div>
                </div>
              </div>

              {/* Institutions List */}
              {getInstitutionsByState(selectedState).length > 0 && (
                <div>
                  <h5 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                    <School className="w-4 h-4" />
                    Educational Institutions
                  </h5>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {getInstitutionsByState(selectedState).map(institution => (
                      <div
                        key={institution.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-200 hover:scale-[1.02]"
                        onClick={() => onInstitutionClick?.(institution.id)}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          {institution.type === 'school' ? (
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <School className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <span className="truncate font-medium text-gray-900 dark:text-white">{institution.name}</span>
                        </div>
                        {getStateAlerts(selectedState).some(alert => alert.institutionId === institution.id) && (
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Alerts */}
              {getStateAlerts(selectedState).length > 0 && (
                <div>
                  <h5 className="font-semibold mb-3 text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Active Emergency Alerts
                  </h5>
                  <div className="space-y-3 max-h-32 overflow-y-auto pr-2">
                    {getStateAlerts(selectedState).map(alert => (
                      <div key={alert.id} className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border border-red-200 dark:border-red-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-red-900 dark:text-red-100 text-sm">{alert.type}</span>
                          <Badge className={`text-xs ${
                            alert.severity === 'high' ? 'bg-red-500 text-white' :
                            alert.severity === 'medium' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-red-700 dark:text-red-300 text-xs">{alert.institution}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}