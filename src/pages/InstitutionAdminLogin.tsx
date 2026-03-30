import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Building2, 
  School, 
  ArrowLeft,
  Lock,
  User,
  Mail,
  Shield,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { schools, colleges } from '../components/shared/institutionsData';
import { useIsMobile } from '../components/hooks/useIsMobile';

interface InstitutionAdminLoginProps {
  onLogin: (data: {
    institutionId: string;
    adminName: string;
    role: string;
  }) => void;
  onBack: () => void;
}

export function InstitutionAdminLogin({ onLogin, onBack }: InstitutionAdminLoginProps) {
  const isMobile = useIsMobile(1024);
  const [step, setStep] = useState<'type' | 'credentials'>('type');
  const [institutionType, setInstitutionType] = useState<'school' | 'college'>('school');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [credentials, setCredentials] = useState({
    adminName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Block mobile access completely
  if (isMobile) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center bg-white/95 backdrop-blur-sm">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Desktop Access Required
            </h2>
            <p className="text-slate-600 mb-4">
              Institution Admin Portal is restricted to desktop devices only for enhanced security and functionality.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>Minimum Requirements:</strong><br />
                • Screen width: 1024px or larger<br />
                • Desktop or laptop computer<br />
                • Tablet in landscape mode
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Please access this portal from a computer, laptop, or tablet with a screen width of at least 1024 pixels.
            </p>
          </div>
          <Button onClick={onBack} variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login Options
          </Button>
        </Card>
      </div>
    );
  }

  const allInstitutions = institutionType === 'school' ? schools : colleges;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!credentials.adminName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!credentials.email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!credentials.password) {
      setError('Please enter your password');
      return;
    }

    if (credentials.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    onLogin({
      institutionId: selectedInstitution,
      adminName: credentials.adminName,
      role: institutionType === 'school' ? 'School Principal' : 'College Director'
    });
  };

  const getSelectedInstitution = () => {
    return allInstitutions.find(inst => inst.id === selectedInstitution);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-y-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-linear-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-linear-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-start lg:justify-center p-4 py-6">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative inline-flex items-center justify-center mb-4"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-linear-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl shadow-2xl">
              <Building2 className="w-10 h-10 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-900" />
              </motion.div>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Institution Portal</h1>
          <p className="text-slate-600 max-w-md mx-auto">
            Secure access to your disaster preparedness dashboard
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Institution Type & Selection */}
          {step === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <Card className="backdrop-blur-xl bg-white/80 border-white/20 shadow-2xl p-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Select Institution Type</h2>
                  <p className="text-sm text-slate-600">Choose your institution category to continue</p>
                </div>

                {/* Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { type: 'school', icon: School, label: 'School', count: schools.length, color: 'blue' },
                    { type: 'college', icon: Building2, label: 'College', count: colleges.length, color: 'purple' }
                  ].map((item) => (
                    <motion.button
                      key={item.type}
                      onClick={() => setInstitutionType(item.type as 'school' | 'college')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        institutionType === item.type
                          ? `border-${item.color}-500 bg-${item.color}-50 shadow-lg`
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          institutionType === item.type
                            ? `bg-${item.color}-100`
                            : 'bg-slate-100'
                        }`}>
                          <item.icon className={`w-7 h-7 ${
                            institutionType === item.type
                              ? `text-${item.color}-600`
                              : 'text-slate-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{item.label} Administrator</h3>
                          <p className="text-sm text-slate-600">{item.count} institutions registered</p>
                        </div>
                        {institutionType === item.type && (
                          <CheckCircle2 className={`w-6 h-6 text-${item.color}-600`} />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Institution Dropdown */}
                <div className="mb-6">
                  <Label htmlFor="institution" className="mb-2 block">
                    Select Your Institution
                  </Label>
                  <select
                    id="institution"
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                  >
                    <option value="">Choose {institutionType === 'school' ? 'school' : 'college'}...</option>
                    {allInstitutions
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          {inst.name} - {inst.district}, {inst.state}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={onBack}
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={() => selectedInstitution && setStep('credentials')}
                    disabled={!selectedInstitution}
                    className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Credentials */}
          {step === 'credentials' && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <Card className="backdrop-blur-xl bg-white/80 border-white/20 shadow-2xl p-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
                {/* Selected Institution Banner */}
                <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    {institutionType === 'school' ? (
                      <School className="w-8 h-8 text-blue-600" />
                    ) : (
                      <Building2 className="w-8 h-8 text-indigo-600" />
                    )}
                    <div>
                      <p className="font-semibold text-slate-900">{getSelectedInstitution()?.name}</p>
                      <p className="text-xs text-slate-600">
                        {getSelectedInstitution()?.district}, {getSelectedInstitution()?.state}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Administrator Login
                  </h2>
                  <p className="text-sm text-slate-600">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="adminName" className="mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="adminName"
                      type="text"
                      placeholder="John Doe"
                      value={credentials.adminName}
                      onChange={(e) => setCredentials({ ...credentials, adminName: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@institution.edu"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="h-11"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Demo: Any password with 4+ characters
                    </p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="text-sm text-red-600">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={() => setStep('type')}
                      variant="outline"
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Access Dashboard
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
