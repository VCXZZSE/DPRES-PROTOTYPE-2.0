import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';
import { 
  Filter,
  Download,
  Eye,
  X,
  Award
} from 'lucide-react';
import { allInstitutions } from '../shared/institutionsData';
import { useAlerts } from '../shared/AlertContext';

interface Institution {
  id: string;
  name: string;
  district: string;
  state: string;
  type: string;
  students: number;
  avgProgress: number;
  activeAlerts: number;
  lastActive: string;
  contact?: string;
  email?: string;
}

export function InstitutionsTable() {
  const { alerts } = useAlerts();
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  // Transform institutions data
  const institutions = allInstitutions.map(inst => ({
    id: inst.id,
    name: inst.name,
    district: inst.district,
    type: inst.type === 'school' ? 'School' : 'College',
    students: inst.students,
    avgProgress: inst.avgProgress,
    activeAlerts: alerts.filter(alert => alert.institutionId === inst.id && (alert.status === 'active' || alert.status === 'pending')).length,
    lastActive: inst.lastActive,
    state: inst.state,
    contact: inst.contact,
    email: inst.email
  }));

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Institutions Management</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Monitor and manage enrolled schools and colleges</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-48">Institution Name</TableHead>
                  <TableHead className="min-w-24">District</TableHead>
                  <TableHead className="min-w-20">State</TableHead>
                  <TableHead className="min-w-20">Type</TableHead>
                  <TableHead className="min-w-24">Students</TableHead>
                  <TableHead className="min-w-32">Progress %</TableHead>
                  <TableHead className="min-w-24">Alerts</TableHead>
                  <TableHead className="min-w-24">Last Active</TableHead>
                  <TableHead className="min-w-28">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutions.map((institution) => {
                  const inst = allInstitutions.find(i => i.id === institution.id);
                  return (
                    <TableRow key={institution.id} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        <div>
                          <p>{institution.name}</p>
                          {inst?.compliance.certificateStatus === 'issued' && (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs mt-1">
                              <Award className="h-3 w-3 mr-1" />
                              Certified
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">{institution.district}</TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">{institution.state}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">{institution.type}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">{institution.students.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={institution.avgProgress} className="w-12 lg:w-16 h-2" />
                          <span className="text-sm font-medium">{institution.avgProgress}%</span>
                        </div>
                        {inst && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Compliance: {inst.compliance.complianceScore}%
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {institution.activeAlerts > 0 ? (
                          <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">{institution.activeAlerts}</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">0</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">{institution.lastActive}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInstitution(institution)}
                        >
                          <Eye className="h-4 w-4 lg:mr-1" />
                          <span className="hidden lg:inline">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Institution Detail Modal */}
      {selectedInstitution && (
        <Card className="mt-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{selectedInstitution.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">{selectedInstitution.district}, {selectedInstitution.state} • {selectedInstitution.type}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedInstitution(null)} className="border-gray-300 dark:border-gray-600">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">{selectedInstitution.students.toLocaleString()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                <p className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">{selectedInstitution.avgProgress}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Training Progress</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                <p className="text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400">{selectedInstitution.activeAlerts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Alerts</p>
              </div>
            </div>

            {/* Compliance Information */}
            {(() => {
              const inst = allInstitutions.find(i => i.id === selectedInstitution.id);
              return inst ? (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-medium">Compliance Status</p>
                    <Badge className={`${
                      inst.compliance.certificateStatus === 'issued' ? 'bg-green-100 text-green-700' :
                      inst.compliance.certificateStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {inst.compliance.certificateStatus === 'issued' && <Award className="h-3 w-3 mr-1" />}
                      {inst.compliance.certificateStatus.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Training Modules</p>
                      <p className="font-semibold">{inst.compliance.trainingModulesCompleted}/{inst.compliance.totalTrainingModules}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Safety Drills</p>
                      <p className="font-semibold">{inst.compliance.safetyDrillsCompleted}/{inst.compliance.requiredSafetyDrills}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Compliance Score</p>
                      <p className="font-semibold text-purple-600">{inst.compliance.complianceScore}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Audit</p>
                      <p className="font-semibold">{inst.compliance.lastAuditDate}</p>
                    </div>
                  </div>
                  {inst.compliance.certificateStatus === 'issued' && (
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <p className="text-gray-600">Certificate ID</p>
                          <p className="font-mono text-xs">{inst.compliance.certificateId}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null;
            })()}

            {/* Communication Summary */}
            {(() => {
              const inst = allInstitutions.find(i => i.id === selectedInstitution.id);
              const totalContacts = inst ? 
                inst.contacts.students.length + 
                inst.contacts.parents.length + 
                inst.contacts.staff.length + 
                inst.contacts.emergency.length : 0;
              
              return inst ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium mb-3">Communication Contacts</p>
                  <div className="grid grid-cols-4 gap-4 text-sm text-center">
                    <div>
                      <p className="font-bold text-blue-600">{inst.contacts.students.length}</p>
                      <p className="text-gray-600">Students</p>
                    </div>
                    <div>
                      <p className="font-bold text-green-600">{inst.contacts.parents.length}</p>
                      <p className="text-gray-600">Parents</p>
                    </div>
                    <div>
                      <p className="font-bold text-purple-600">{inst.contacts.staff.length}</p>
                      <p className="text-gray-600">Staff</p>
                    </div>
                    <div>
                      <p className="font-bold text-orange-600">{inst.contacts.emergency.length}</p>
                      <p className="text-gray-600">Emergency</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-200 text-center">
                    <p className="text-lg font-bold text-blue-600">{totalContacts}</p>
                    <p className="text-sm text-gray-600">Total SMS/IVR Recipients</p>
                  </div>
                </div>
              ) : null;
            })()}

            {selectedInstitution.contact && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Official Contact Information</p>
                <p className="text-sm text-gray-600">Phone: {selectedInstitution.contact}</p>
                {selectedInstitution.email && (
                  <p className="text-sm text-gray-600">Email: {selectedInstitution.email}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}