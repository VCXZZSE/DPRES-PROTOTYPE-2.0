import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { 
  Award, 
  Download, 
  Eye, 
  Search, 
  
  RefreshCw, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileCheck,
  QrCode,
  Printer,
  Mail,
  ExternalLink
} from 'lucide-react';
import { allInstitutions, ComplianceCertificate } from './shared/institutionsData';
import { useCommunication } from './shared/CommunicationContext';

export function CertificateManager() {
  const { certificates } = useCommunication();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<ComplianceCertificate | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'pending'>('all');

  // Get institutions with certificate data
  const institutionsWithCertificates = allInstitutions.map(inst => {
    const certificate = certificates.find(cert => cert.institutionId === inst.id);
    return {
      ...inst,
      certificate
    };
  });

  const filteredInstitutions = institutionsWithCertificates.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inst.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inst.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && inst.compliance.certificateStatus === 'issued') ||
                         (filterStatus === 'expired' && inst.compliance.certificateStatus === 'expired') ||
                         (filterStatus === 'pending' && inst.compliance.certificateStatus === 'pending');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'expired': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'not-eligible': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'expired': return <XCircle className="h-4 w-4" />;
      case 'not-eligible': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const generateCertificate = (institutionId: string) => {
    console.log('Generating certificate for institution:', institutionId);
    // Mock certificate generation
    alert('Certificate generation initiated. Institution will be notified once ready for download.');
  };

  const downloadCertificate = (certificateId: string) => {
    console.log('Downloading certificate:', certificateId);
    // Mock download
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iajw...`; // Mock PDF data
    link.download = `${certificateId}.pdf`;
    link.click();
  };

  const previewCertificate = (institution: any) => {
    const certificate = certificates.find(cert => cert.institutionId === institution.id);
    setSelectedCertificate(certificate || null);
  };

  // Statistics
  const stats = {
    total: allInstitutions.length,
    issued: allInstitutions.filter(inst => inst.compliance.certificateStatus === 'issued').length,
    pending: allInstitutions.filter(inst => inst.compliance.certificateStatus === 'pending').length,
    expired: allInstitutions.filter(inst => inst.compliance.certificateStatus === 'expired').length,
    notEligible: allInstitutions.filter(inst => inst.compliance.certificateStatus === 'not-eligible').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Digital Compliance Certificates</h2>
          <p className="text-sm text-muted-foreground">Manage and issue disaster preparedness certificates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Award className="h-4 w-4 mr-2" />
            Bulk Generate
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Total</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
              </div>
              <FileCheck className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Issued</p>
                <p className="text-lg lg:text-2xl font-bold text-green-600">{stats.issued}</p>
              </div>
              <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Pending</p>
                <p className="text-lg lg:text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Expired</p>
                <p className="text-lg lg:text-2xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <XCircle className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground">Not Eligible</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-600">{stats.notEligible}</p>
              </div>
              <AlertCircle className="h-6 w-6 lg:h-8 lg:w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Institutions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, code, or district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter">Filter by Status</Label>
              <select
                id="filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Certificates</option>
                <option value="pending">Pending Review</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Institutions Table */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Institution Certificates</CardTitle>
          <CardDescription>View and manage compliance certificates for all institutions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-48">Institution</TableHead>
                  <TableHead className="min-w-20">Type</TableHead>
                  <TableHead className="min-w-32">Compliance Score</TableHead>
                  <TableHead className="min-w-24">Status</TableHead>
                  <TableHead className="min-w-28">Issue Date</TableHead>
                  <TableHead className="min-w-28">Expiry Date</TableHead>
                  <TableHead className="min-w-40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstitutions.map((institution) => (
                  <TableRow key={institution.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{institution.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{institution.code} • {institution.district}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                        {institution.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={institution.compliance.complianceScore} className="w-16 h-2" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{institution.compliance.complianceScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(institution.compliance.certificateStatus)} flex items-center gap-1`}>
                        {getStatusIcon(institution.compliance.certificateStatus)}
                        {institution.compliance.certificateStatus.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 dark:text-gray-100">
                      {institution.compliance.certificateIssueDate || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 dark:text-gray-100">
                      {institution.compliance.certificateExpiryDate || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {institution.compliance.certificateStatus === 'issued' ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => downloadCertificate(institution.compliance.certificateId!)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => previewCertificate(institution)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </>
                        ) : institution.compliance.certificateStatus === 'pending' ? (
                          <Button
                            size="sm"
                            onClick={() => generateCertificate(institution.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Generate
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                          >
                            Not Eligible
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Certificate Preview Dialog */}
      {selectedCertificate && (
        <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="certificate-preview-description">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Digital Compliance Certificate
              </DialogTitle>
              <DialogDescription id="certificate-preview-description">
                Preview certificate for {selectedCertificate.institutionName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Certificate Header */}
              <div className="text-center border-b pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">State Disaster Management Authority</h3>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Digital Compliance Certificate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Certificate ID: {selectedCertificate.id}</p>
              </div>

              {/* Institution Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Institution Name</Label>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedCertificate.institutionName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Certificate Type</Label>
                  <p className="font-semibold capitalize text-gray-900 dark:text-gray-100">{selectedCertificate.certificateType.replace('-', ' ')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Issue Date</Label>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedCertificate.issueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</Label>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedCertificate.expiryDate}</p>
                </div>
              </div>

              {/* Compliance Score */}
              <div className="text-center bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{selectedCertificate.complianceScore}%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Overall Compliance Score</p>
              </div>

              {/* Requirements */}
              <div>
                <Label className="text-lg font-medium mb-4 block text-gray-900 dark:text-gray-100">Compliance Requirements</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Training Modules</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedCertificate.requirements.trainingModules.completed}/{selectedCertificate.requirements.trainingModules.total}
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Safety Drills</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {selectedCertificate.requirements.safetyDrills.completed}/{selectedCertificate.requirements.safetyDrills.total}
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Infrastructure</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedCertificate.requirements.infrastructure.score}/{selectedCertificate.requirements.infrastructure.maxScore}
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Staff Training</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedCertificate.requirements.staff.trained}/{selectedCertificate.requirements.staff.total}
                      </span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              {selectedCertificate.qrCode && (
                <div className="text-center">
                  <Label className="text-sm font-medium mb-2 block text-gray-900 dark:text-gray-100">Verification QR Code</Label>
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 mx-auto rounded-lg flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Scan to verify certificate authenticity</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button 
                  onClick={() => downloadCertificate(selectedCertificate.id)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}