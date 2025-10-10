#!/bin/bash

# Fix CertificateManager.tsx
sed -i '' '1s/import React,/import/' src/components/CertificateManager.tsx
sed -i '' 's/DialogTrigger, //g' src/components/CertificateManager.tsx
sed -i '' 's/Filter, //g' src/components/CertificateManager.tsx
sed -i '' 's/Calendar, //g' src/components/CertificateManager.tsx
sed -i '' 's/ExternalLink, //g' src/components/CertificateManager.tsx

# Fix Dashboard.tsx
sed -i '' 's/AlertTriangle, //g' src/components/Dashboard.tsx
sed -i '' 's/Info, //g' src/components/Dashboard.tsx

# Fix DesktopOnlyScreen.tsx
sed -i '' 's/^import React from/\/\/ import React from/' src/components/DesktopOnlyScreen.tsx

# Fix IndiaMap.tsx
sed -i '' '1s/import React,/import/' src/components/IndiaMap.tsx
sed -i '' 's/MapPin, //g' src/components/IndiaMap.tsx

# Fix ModulesPage.tsx
sed -i '' '1s/import React,/import/' src/components/ModulesPage.tsx

# Fix Navigation.tsx
sed -i '' 's/User, //g' src/components/Navigation.tsx
sed -i '' 's/X, //g' src/components/Navigation.tsx

# Fix RecentIncidents.tsx
sed -i '' 's/^import React from/\/\/ import React from/' src/components/RecentIncidents.tsx
sed -i '' 's/CardDescription, //g' src/components/RecentIncidents.tsx
sed -i '' 's/CardHeader, //g' src/components/RecentIncidents.tsx
sed -i '' 's/CardTitle, //g' src/components/RecentIncidents.tsx

# Fix SMSIVRManager.tsx
sed -i '' '1s/import React,/import/' src/components/SMSIVRManager.tsx
sed -i '' 's/Users, //g' src/components/SMSIVRManager.tsx
sed -i '' 's/Filter, //g' src/components/SMSIVRManager.tsx
sed -i '' 's/Settings, //g' src/components/SMSIVRManager.tsx
sed -i '' 's/Volume2, //g' src/components/SMSIVRManager.tsx
sed -i '' 's/Mail, //g' src/components/SMSIVRManager.tsx

# Fix SOSAlert.tsx
sed -i '' '1s/import React,/import/' src/components/SOSAlert.tsx

# Fix VRTrainingPage.tsx
sed -i '' '1s/import React,/import/' src/components/VRTrainingPage.tsx
sed -i '' 's/Zap, //g' src/components/VRTrainingPage.tsx
sed -i '' 's/Shield, //g' src/components/VRTrainingPage.tsx

# Fix admin components
sed -i '' '1s/import React,/import/' src/components/admin/AdminSettings.tsx
sed -i '' 's/Settings, //g' src/components/admin/AdminSettings.tsx
sed -i '' 's/Users, //g' src/components/admin/AdminSettings.tsx
sed -i '' 's/AlertTriangle, //g' src/components/admin/AdminSettings.tsx
sed -i '' 's/Moon, //g' src/components/admin/AdminSettings.tsx
sed -i '' 's/Sun, //g' src/components/admin/AdminSettings.tsx

sed -i '' 's/^import React from/\/\/ import React from/' src/components/admin/DashboardOverview.tsx
sed -i '' 's/School, //g' src/components/admin/DashboardOverview.tsx

sed -i '' '1s/import React,/import/' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/Send, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/XCircle, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/Filter, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/Plus, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/BarChart3, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/TrendingUp, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/Zap, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/Settings, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/AlertCircle, //g' src/components/admin/EmergencyAlertsManager.tsx
sed -i '' 's/Calendar, //g' src/components/admin/EmergencyAlertsManager.tsx

sed -i '' '1s/import React,/import/' src/components/admin/InstitutionsTable.tsx

sed -i '' 's/^import React from/\/\/ import React from/' src/components/admin/ReportsAnalytics.tsx

# Fix shared components
sed -i '' '1s/import React,/import/' src/components/shared/AlertContext.tsx
sed -i '' '1s/import React,/import/' src/components/shared/CommunicationContext.tsx

echo "Import fixes applied!"
