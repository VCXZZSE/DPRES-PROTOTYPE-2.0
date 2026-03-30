import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { 
  Shield, 
  GraduationCap, 
  Users, 
  Lock,
  Waves,
  Mountain,
  Zap,
  School,
  Building2,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  X,
  Building
} from 'lucide-react';
import { InstitutionAdminLogin } from './InstitutionAdminLogin';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { useIsMobile } from '../components/hooks/useIsMobile';
import { schools, colleges } from '../components/shared/institutionsData';
import { authService } from '../services/api';

type StudentAuthMode = 'signin' | 'signup' | 'forgot' | 'forgotVerification' | 'verification';

interface LoginPageProps {
  onLogin: (userData: {
    schoolName: string;
    schoolCode: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  }) => void;
  onAdminLogin: (adminData: {
    email: string;
    password: string;
    displayName?: string;
  }) => void;
  onInstitutionAdminLogin: (adminData: {
    institutionId: string;
    adminName: string;
    role: string;
  }) => void;
}

export function LoginPage({ onLogin, onAdminLogin, onInstitutionAdminLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const isMobile = useIsMobile(1024);
  const [currentStep, setCurrentStep] = useState<'userType' | 'institutionType' | 'details'>('userType');
  const [userType, setUserType] = useState<'student' | 'admin' | 'institution'>('student');
  const [institutionType, setInstitutionType] = useState<'school' | 'college'>('school');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showInstitutionAdminFlow, setShowInstitutionAdminFlow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [studentAuthMode, setStudentAuthMode] = useState<StudentAuthMode>('signin');
  const [studentCredentials, setStudentCredentials] = useState({ email: '', password: '' });
  const [signupDraft, setSignupDraft] = useState({
    email: '',
    idCardNumber: '',
    verificationToken: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authInfo, setAuthInfo] = useState('');
  const [idCardForgot, setIdCardForgot] = useState('');
  const [forgotResetDraft, setForgotResetDraft] = useState({
    token: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCode: '',
    studentName: '',
    age: '',
    institutionType: 'school' as 'school' | 'college'
  });

  // Force light mode on login page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    return () => {
      // Cleanup when component unmounts
    };
  }, []);

  // Transform institutions data for dropdown
  const getInstitutions = () => {
    const institutions = institutionType === 'school' ? schools : colleges;
    return institutions
      .sort((a, b) => {
        // Sort Kolkata institutions first, then alphabetically
        const aKolkata = a.district === 'Kolkata' || a.district === 'Howrah';
        const bKolkata = b.district === 'Kolkata' || b.district === 'Howrah';
        if (aKolkata && !bKolkata) return -1;
        if (!aKolkata && bKolkata) return 1;
        return a.name.localeCompare(b.name);
      })
      .map(institution => ({
        id: institution.id,
        name: institution.name,
        code: institution.code,
        type: institution.type,
        district: institution.district,
        state: institution.state
      }));
  };

  const handleInstitutionSelect = (institutionId: string) => {
    const institutions = getInstitutions();
    const institution = institutions.find(s => s.id === institutionId);
    if (institution) {
      setSelectedSchool(institutionId);
      setFormData(prev => ({
        ...prev,
        schoolName: institution.name,
        schoolCode: institution.code,
        institutionType: institutionType
      }));
    }
  };

  const getSelectedInstitutionId = () => {
    const parsed = Number(selectedSchool);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) {
      return parsed;
    }
    return 1;
  };

  const loginAndContinue = async (email: string, password: string) => {
    await authService.loginStudent({ email, password });
    const me = await authService.getMe();
    onLogin({
      ...formData,
      studentName: me.full_name || formData.studentName,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthInfo('');
    setAuthLoading(true);

    try {
      if (studentAuthMode === 'signin') {
        const email = studentCredentials.email.trim().toLowerCase();
        if (!email || !studentCredentials.password) {
          throw new Error('Email and password are required.');
        }
        await loginAndContinue(email, studentCredentials.password);
      }

      if (studentAuthMode === 'forgot') {
        const email = studentCredentials.email.trim().toLowerCase();
        const idCardNumber = idCardForgot.trim();
        if (!email) {
          throw new Error('Email is required.');
        }
        if (!idCardNumber) {
          throw new Error('ID Card Number is required.');
        }
        const forgotResponse = await authService.forgotPassword({ email, idCardNumber });
        setStudentAuthMode('forgotVerification');
        setAuthInfo(forgotResponse.message);
      }

      if (studentAuthMode === 'forgotVerification') {
        const email = studentCredentials.email.trim().toLowerCase();
        if (!forgotResetDraft.token.trim()) {
          throw new Error('Verification token is required.');
        }
        if (!forgotResetDraft.newPassword) {
          throw new Error('New password is required.');
        }
        if (forgotResetDraft.newPassword !== forgotResetDraft.confirmNewPassword) {
          throw new Error('Passwords do not match.');
        }

        await authService.resetPassword(forgotResetDraft.token.trim(), forgotResetDraft.newPassword);
        await loginAndContinue(email, forgotResetDraft.newPassword);
      }

      if (studentAuthMode === 'signup') {
        if (!formData.studentName.trim()) {
          throw new Error('Full name is required for sign up.');
        }
        if (!formData.age || Number.isNaN(Number(formData.age))) {
          throw new Error('Valid age is required for sign up.');
        }
        const email = signupDraft.email.trim().toLowerCase();
        if (!email) {
          throw new Error('Email is required for sign up.');
        }
        if (!signupDraft.idCardNumber.trim()) {
          throw new Error('ID Card Number is required.');
        }

        const result = await authService.signupInitiate({
          institution_id: getSelectedInstitutionId(),
          email,
          id_card_number: signupDraft.idCardNumber.trim(),
          full_name: formData.studentName.trim(),
          age: Number(formData.age),
        });

        setSignupDraft((prev) => ({
          ...prev,
          email,
          verificationToken: result.verification_token || prev.verificationToken,
        }));
        setStudentAuthMode('verification');
        setAuthInfo(result.message);
      }

      if (studentAuthMode === 'verification') {
        if (!signupDraft.verificationToken.trim()) {
          throw new Error('Verification token is required.');
        }
        if (!signupDraft.newPassword) {
          throw new Error('New password is required.');
        }
        if (signupDraft.newPassword !== signupDraft.confirmNewPassword) {
          throw new Error('Passwords do not match.');
        }

        const token = signupDraft.verificationToken.trim();
        await authService.verifyEmail(token);
        await authService.completeSignup(token, signupDraft.newPassword);
        await loginAndContinue(signupDraft.email.trim().toLowerCase(), signupDraft.newPassword);
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 'userType') {
      setCurrentStep('institutionType');
    } else if (currentStep === 'institutionType') {
      setCurrentStep('details');
    }
  };

  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('institutionType');
      setSelectedSchool('');
      setFormData(prev => ({
        ...prev,
        schoolName: '',
        schoolCode: '',
        studentName: '',
        age: ''
      }));
    } else if (currentStep === 'institutionType') {
      setCurrentStep('userType');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStudentCredentialsChange = (field: 'email' | 'password', value: string) => {
    setStudentCredentials(prev => ({ ...prev, [field]: value }));
    setAuthError('');
    setAuthInfo('');
  };

  const handleSignupDraftChange = (
    field: 'email' | 'idCardNumber' | 'verificationToken' | 'newPassword' | 'confirmNewPassword',
    value: string,
  ) => {
    setSignupDraft((prev) => ({ ...prev, [field]: value }));
    setAuthError('');
    setAuthInfo('');
  };

  const setStudentMode = (mode: 'signin' | 'signup' | 'forgot') => {
    setStudentAuthMode(mode);
    setAuthError('');
    setAuthInfo('');
    if (mode !== 'forgot') {
      setForgotResetDraft({ token: '', newPassword: '', confirmNewPassword: '' });
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);
    
    // Check if user is on mobile device
    if (isMobile) {
      setAdminError('Admin portal access is restricted to desktop devices only. Please use a computer with screen width of 1024px or larger for administrative functions.');
      setAdminLoading(false);
      return;
    }
    
    const email = adminCredentials.email.trim().toLowerCase();
    const password = adminCredentials.password;

    if (!email) {
      setAdminError('Email is required.');
      setAdminLoading(false);
      return;
    }

    if (!password) {
      setAdminError('Password is required.');
      setAdminLoading(false);
      return;
    }

    try {
      const response = await authService.sdmaAdminLogin({ email, password });
      onAdminLogin({
        email: response.email,
        password,
        displayName: response.display_name,
      });
      setShowAdminLogin(false);
      navigate('/sdma-dashboard');
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : 'Admin authentication failed. Please try again.');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminCredentialChange = (field: 'email' | 'password', value: string) => {
    setAdminCredentials(prev => ({ ...prev, [field]: value }));
    setAdminError(''); // Clear error when user types
  };
  
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-emerald-50 to-indigo-100 relative overflow-hidden transition-colors duration-200">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Mandala with Indian Geometric Patterns */}
        <div className="absolute top-16 right-8 sm:right-16 w-48 h-48 sm:w-96 sm:h-96 opacity-8">
          <svg viewBox="0 0 384 384" className="w-full h-full animate-spin-slow">
            {/* Outer circle with Mughal-inspired patterns */}
            <circle cx="192" cy="192" r="180" fill="none" stroke="rgb(234 88 12)" strokeWidth="2" strokeDasharray="8,4" className="opacity-30" />
            <circle cx="192" cy="192" r="150" fill="none" stroke="rgb(79 70 229)" strokeWidth="1" strokeDasharray="12,6" className="opacity-40" />
            <circle cx="192" cy="192" r="120" fill="none" stroke="rgb(16 185 129)" strokeWidth="1" strokeDasharray="16,8" className="opacity-30" />
            
            {/* Traditional Rangoli-style center */}
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 30} 192 192)`}>
                <path
                  d="M192 72 L196 76 L192 80 L188 76 Z"
                  fill="rgb(234 88 12)"
                  className="opacity-20"
                />
                <path
                  d="M192 92 L200 100 L192 108 L184 100 Z"
                  fill="rgb(79 70 229)"
                  className="opacity-15"
                />
              </g>
            ))}
            
            {/* Central lotus-like pattern */}
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse
                key={i}
                cx="192"
                cy="192"
                rx="40"
                ry="15"
                fill="none"
                stroke="rgb(16 185 129)"
                strokeWidth="1"
                className="opacity-25"
                transform={`rotate(${i * 45} 192 192)`}
              />
            ))}
          </svg>
        </div>

        {/* Block Print Inspired Patterns */}
        <div className="absolute bottom-20 left-8 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 opacity-12">
          <svg viewBox="0 0 256 256" className="w-full h-full">
            {/* Traditional Indian block print motifs */}
            {Array.from({ length: 4 }, (_, row) =>
              Array.from({ length: 4 }, (_, col) => (
                <g key={`${row}-${col}`} transform={`translate(${col * 64} ${row * 64})`}>
                  <path
                    d="M32 8 Q48 16 32 32 Q16 48 32 56 Q48 48 56 32 Q48 16 32 8 Z"
                    fill="rgb(234 88 12)"
                    className="opacity-30"
                  />
                  <circle cx="32" cy="32" r="8" fill="rgb(79 70 229)" className="opacity-40" />
                </g>
              ))
            )}
          </svg>
        </div>

        {/* Floating Abstract Elements with Disaster Theme */}
        <div className="absolute top-32 left-8 sm:left-16 w-8 h-8 sm:w-12 sm:h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-float shadow-lg"></div>
        <div className="absolute top-48 right-16 sm:right-32 w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-br from-indigo-400 to-indigo-600 rounded-full opacity-30 animate-float delay-300"></div>
        <div className="absolute bottom-48 left-16 sm:left-32 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-full opacity-15 animate-float delay-600"></div>
        
        {/* Jali Pattern Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-orange-500 via-emerald-500 to-indigo-500 opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-indigo-500 via-emerald-500 to-orange-500 opacity-20"></div>

        {/* Subtle Disaster Safety Elements */}
        <div className="absolute top-1/3 left-4 sm:left-8 opacity-8">
          <Waves className="w-8 h-8 sm:w-16 sm:h-16 text-indigo-400 animate-float delay-900" />
        </div>
        <div className="absolute bottom-1/3 right-4 sm:right-8 opacity-8">
          <Mountain className="w-10 h-10 sm:w-20 sm:h-20 text-emerald-400 animate-float delay-450" />
        </div>
        <div className="absolute top-2/3 left-1/4 opacity-8 hidden sm:block">
          <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400 animate-float delay-750" />
        </div>

        {/* Made in India tricolor accent */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-30">
          <div className="w-4 h-1 bg-orange-500 rounded"></div>
          <div className="w-4 h-1 bg-white rounded border border-gray-200"></div>
          <div className="w-4 h-1 bg-emerald-500 rounded"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex justify-center p-4 sm:p-6 py-8 sm:py-12 overflow-y-auto">
        <Card className="w-full max-w-lg h-fit shadow-2xl border-0 bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-orange-500 via-emerald-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <CardTitle className="text-2xl sm:text-3xl bg-linear-to-r from-orange-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent wrap-break-word">
                {t('login.title')}
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600 wrap-break-word">
                {t('login.subtitle')}
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 flex-wrap">
                <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700 text-xs sm:text-sm">
                  {t('login.madeInIndia')}
                </Badge>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-white border border-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === 'userType' ? 'bg-indigo-500' : 'bg-indigo-200'
              }`} />
              <div className={`w-8 h-0.5 transition-all duration-300 ${
                currentStep === 'institutionType' || currentStep === 'details' ? 'bg-indigo-500' : 'bg-gray-200'
              }`} />
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === 'institutionType' ? 'bg-indigo-500' : currentStep === 'details' ? 'bg-indigo-200' : 'bg-gray-200'
              }`} />
              <div className={`w-8 h-0.5 transition-all duration-300 ${
                currentStep === 'details' ? 'bg-indigo-500' : 'bg-gray-200'
              }`} />
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === 'details' ? 'bg-indigo-500' : 'bg-gray-200'
              }`} />
            </div>

            {/* Step Labels */}
            <div className="text-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 wrap-break-word">
              {currentStep === 'userType' && t('login.step1')}
              {currentStep === 'institutionType' && t('login.step2')}
              {currentStep === 'details' && t('login.step3')}
            </div>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            {/* Step 1: User Type Selection */}
            {currentStep === 'userType' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 wrap-break-word">{t('login.welcome')}</h3>
                  <p className="text-sm text-gray-600 wrap-break-word">{t('login.selectType')}</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setUserType('student')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      userType === 'student'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base wrap-break-word">{t('login.student')}</div>
                        <div className="text-xs sm:text-sm opacity-75 wrap-break-word">{t('login.studentDesc')}</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setShowInstitutionAdminFlow(true)}
                    className="w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left border-green-200 text-green-600 hover:border-green-300 hover:bg-green-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base flex items-center flex-wrap">
                          <span className="wrap-break-word">Institution Admin</span>
                        </div>
                        <div className="text-xs sm:text-sm opacity-75 wrap-break-word">
                          Track preparedness scores & drills
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => !isMobile && setShowAdminLogin(true)}
                    disabled={isMobile}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      isMobile 
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
                        : 'border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base flex items-center flex-wrap">
                          <span className="wrap-break-word">SDMA Admin Access</span>
                          <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-2 shrink-0" />
                        </div>
                        <div className="text-xs sm:text-sm opacity-75 wrap-break-word">
                          {isMobile 
                            ? 'Desktop access required (1024px+ screen width)' 
                            : 'Access administrator dashboard'
                          }
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={userType !== 'student'}
                  className="w-full h-10 sm:h-12 bg-linear-to-r from-orange-500 via-emerald-500 to-indigo-600 hover:from-orange-600 hover:via-emerald-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="wrap-break-word">{t('login.continue')}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </span>
                </Button>
              </div>
            )}

            {/* Step 2: Institution Type Selection */}
            {currentStep === 'institutionType' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 wrap-break-word">{t('login.selectInstitution')}</h3>
                  <p className="text-sm text-gray-600 wrap-break-word">{t('login.institutionQuestion')}</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setInstitutionType('school')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      institutionType === 'school'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <School className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base wrap-break-word">{t('login.school')}</div>
                        <div className="text-xs sm:text-sm opacity-75 wrap-break-word">{t('login.schoolDesc')}</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setInstitutionType('college')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      institutionType === 'college'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base wrap-break-word">{t('login.college')}</div>
                        <div className="text-xs sm:text-sm opacity-75 wrap-break-word">{t('login.collegeDesc')}</div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 shrink-0" />
                    <span className="wrap-break-word">{t('login.back')}</span>
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 h-10 sm:h-12 bg-linear-to-r from-orange-500 via-emerald-500 to-indigo-600 hover:from-orange-600 hover:via-emerald-600 hover:to-indigo-700 text-white text-sm sm:text-base"
                  >
                    <span className="wrap-break-word">{t('login.continue')}</span>
                    <ArrowRight className="w-4 h-4 ml-1 sm:ml-2 shrink-0" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Details Form */}
            {currentStep === 'details' && (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 wrap-break-word">{t('login.enterDetails')}</h3>
                  <p className="text-sm text-gray-600 wrap-break-word">
                    {t('login.provideInfo')} {institutionType === 'school' ? t('login.school').toLowerCase() : t('login.college').toLowerCase()} information
                  </p>
                </div>

                {/* Institution Selector */}
                <div className="space-y-2">
                  <Label htmlFor="institution-selector" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">
                    {institutionType === 'school' ? t('login.selectSchool') : t('login.selectCollege')}
                  </Label>
                  <Select value={selectedSchool} onValueChange={handleInstitutionSelect}>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base">
                      <SelectValue placeholder={institutionType === 'school' ? t('login.chooseSchool') : t('login.chooseCollege')}>
                        {selectedSchool && getInstitutions().find(i => i.id === selectedSchool)?.name.replace(/\b(School|Kolkata|High School|Primary School|Secondary School|Higher Secondary School)\b/gi, '').replace(/[,\-\s]+/g, ' ').replace(/\s+/g, ' ').trim()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {getInstitutions().map((institution) => {
                        const cleanName = institution.name.replace(/\b(School|Kolkata|High School|Primary School|Secondary School|Higher Secondary School)\b/gi, '').replace(/[,\-\s]+/g, ' ').replace(/\s+/g, ' ').trim();
                        return (
                          <SelectItem 
                            key={institution.id} 
                            value={institution.id}
                          >
                            <div className="flex flex-col gap-2 py-2">
                              <div className="wrap-break-word font-medium leading-snug">{cleanName}</div>
                              <div className="text-gray-500 wrap-break-word leading-relaxed" style={{ fontSize: '0.8125rem' }}>
                                {institution.district}, {institution.state}
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSchool && (
                  <>
                    <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
                      <button
                        type="button"
                        onClick={() => setStudentMode('signin')}
                        className={`rounded-md px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                          studentAuthMode === 'signin' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentMode('signup')}
                        className={`rounded-md px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                          studentAuthMode === 'signup'
                            ? 'bg-white text-indigo-700 shadow-sm'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        Sign Up
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentMode('forgot')}
                        className={`rounded-md px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                          studentAuthMode === 'forgot' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        Forgot
                      </button>
                    </div>

                    {studentAuthMode === 'signin' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="institutionCodeSignin" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">
                            {institutionType === 'school' ? t('login.schoolCode') : t('login.collegeCode')}
                          </Label>
                          <Input
                            id="institutionCodeSignin"
                            value={formData.schoolCode}
                            disabled
                            className="bg-gray-50 border-gray-200 text-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentEmailSignin" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">
                            {institutionType === 'school' ? 'School Email' : 'College Email'}
                          </Label>
                          <Input
                            id="studentEmailSignin"
                            type="email"
                            placeholder={institutionType === 'school' ? 'Enter your school email' : 'Enter your college email'}
                            value={studentCredentials.email}
                            onChange={(e) => handleStudentCredentialsChange('email', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentPasswordSignin" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Password</Label>
                          <div className="relative">
                            <Input
                              id="studentPasswordSignin"
                              type={showStudentPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              value={studentCredentials.password}
                              onChange={(e) => handleStudentCredentialsChange('password', e.target.value)}
                              required
                              className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowStudentPassword(!showStudentPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showStudentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {studentAuthMode === 'signup' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="institutionCodeSignup" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">
                              {institutionType === 'school' ? t('login.schoolCode') : t('login.collegeCode')}
                            </Label>
                            <Input
                              id="institutionCodeSignup"
                              value={formData.schoolCode}
                              disabled
                              className="bg-gray-50 border-gray-200 text-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ageSignup" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">{t('login.age')}</Label>
                            <Input
                              id="ageSignup"
                              type="number"
                              placeholder={t('login.enterAge')}
                              min={institutionType === 'school' ? '10' : '17'}
                              max={institutionType === 'school' ? '18' : '30'}
                              value={formData.age}
                              onChange={(e) => handleChange('age', e.target.value)}
                              required
                              className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studentNameSignup" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">{t('login.fullName')}</Label>
                          <Input
                            id="studentNameSignup"
                            placeholder={t('login.enterName')}
                            value={formData.studentName}
                            onChange={(e) => handleChange('studentName', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studentEmailSignup" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">
                            {institutionType === 'school' ? 'School Email' : 'College Email'}
                          </Label>
                          <Input
                            id="studentEmailSignup"
                            type="email"
                            placeholder={institutionType === 'school' ? 'name@your-school-domain' : 'name@your-college-domain'}
                            value={signupDraft.email}
                            onChange={(e) => handleSignupDraftChange('email', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="idCardNumberSignup" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">ID Card Number</Label>
                          <Input
                            id="idCardNumberSignup"
                            placeholder="Enter your institution ID card number"
                            value={signupDraft.idCardNumber}
                            onChange={(e) => handleSignupDraftChange('idCardNumber', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    )}

                    {studentAuthMode === 'forgot' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="studentEmailForgot" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Email</Label>
                          <Input
                            id="studentEmailForgot"
                            type="email"
                            placeholder="Enter your registered email"
                            value={studentCredentials.email}
                            onChange={(e) => handleStudentCredentialsChange('email', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studentIdCardForgot" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">ID Card Number</Label>
                          <Input
                            id="studentIdCardForgot"
                            type="text"
                            placeholder="Enter your registered ID card number"
                            value={idCardForgot}
                            onChange={(e) => {
                              setIdCardForgot(e.target.value);
                              setAuthError('');
                              setAuthInfo('');
                            }}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    )}

                    {studentAuthMode === 'forgotVerification' && (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-700">
                          Enter the reset token sent to your email, then set a new password.
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="forgotVerificationEmail" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Email</Label>
                          <Input
                            id="forgotVerificationEmail"
                            value={studentCredentials.email}
                            disabled
                            className="bg-gray-50 border-gray-200 text-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="forgotVerificationToken" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Verification Token</Label>
                          <Input
                            id="forgotVerificationToken"
                            placeholder="Paste your reset verification token"
                            value={forgotResetDraft.token}
                            onChange={(e) => {
                              setForgotResetDraft((prev) => ({ ...prev, token: e.target.value }));
                              setAuthError('');
                              setAuthInfo('');
                            }}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="forgotNewPassword" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">New Password</Label>
                          <div className="relative">
                            <Input
                              id="forgotNewPassword"
                              type={showStudentPassword ? 'text' : 'password'}
                              placeholder="Create a strong password"
                              value={forgotResetDraft.newPassword}
                              onChange={(e) => {
                                setForgotResetDraft((prev) => ({ ...prev, newPassword: e.target.value }));
                                setAuthError('');
                                setAuthInfo('');
                              }}
                              required
                              className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowStudentPassword(!showStudentPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showStudentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="forgotConfirmNewPassword" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Confirm New Password</Label>
                          <Input
                            id="forgotConfirmNewPassword"
                            type={showStudentPassword ? 'text' : 'password'}
                            placeholder="Re-enter your new password"
                            value={forgotResetDraft.confirmNewPassword}
                            onChange={(e) => {
                              setForgotResetDraft((prev) => ({ ...prev, confirmNewPassword: e.target.value }));
                              setAuthError('');
                              setAuthInfo('');
                            }}
                            required
                            className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    )}

                    {studentAuthMode === 'verification' && (
                      <div className="space-y-4">
                        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-700">
                          Verify your email and set your account password to complete signup.
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="verificationEmail" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Email</Label>
                          <Input
                            id="verificationEmail"
                            value={signupDraft.email}
                            disabled
                            className="bg-gray-50 border-gray-200 text-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="verificationToken" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Verification Token</Label>
                          <Input
                            id="verificationToken"
                            placeholder="Paste your verification token"
                            value={signupDraft.verificationToken}
                            onChange={(e) => handleSignupDraftChange('verificationToken', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showStudentPassword ? 'text' : 'password'}
                              placeholder="Create a strong password"
                              value={signupDraft.newPassword}
                              onChange={(e) => handleSignupDraftChange('newPassword', e.target.value)}
                              required
                              className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowStudentPassword(!showStudentPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showStudentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmNewPassword" className="text-gray-700 font-medium text-sm sm:text-base wrap-break-word">Confirm New Password</Label>
                          <Input
                            id="confirmNewPassword"
                            type={showStudentPassword ? 'text' : 'password'}
                            placeholder="Re-enter your password"
                            value={signupDraft.confirmNewPassword}
                            onChange={(e) => handleSignupDraftChange('confirmNewPassword', e.target.value)}
                            required
                            className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    )}

                    {authError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 wrap-break-word">{authError}</p>
                      </div>
                    )}

                    {authInfo && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <p className="text-sm text-emerald-700 wrap-break-word">{authInfo}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="w-full sm:flex-1 h-10 sm:h-12 text-sm sm:text-base"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 shrink-0" />
                        <span className="wrap-break-word">{t('login.back')}</span>
                      </Button>
                      <Button
                        type="submit"
                        disabled={authLoading}
                        className="w-full sm:flex-1 h-10 sm:h-12 bg-linear-to-r from-orange-500 via-emerald-500 to-indigo-600 hover:from-orange-600 hover:via-emerald-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group text-sm sm:text-base"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <Shield className="w-4 h-4 shrink-0" />
                          <span className="wrap-break-word">
                            {authLoading
                              ? 'Please wait...'
                              : studentAuthMode === 'signup'
                              ? 'Request Verification'
                              : studentAuthMode === 'forgotVerification'
                              ? 'Reset Password'
                              : studentAuthMode === 'forgot'
                              ? 'Send Reset Link'
                              : studentAuthMode === 'verification'
                              ? 'Verify & Create Account'
                              : 'Sign In & Continue'}
                          </span>
                        </span>
                      </Button>
                    </div>
                  </>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-300 my-8">
            <button
              onClick={() => {
                setShowAdminLogin(false);
                setAdminCredentials({ email: '', password: '' });
                setAdminError('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 bg-linear-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">SDMA Admin Portal</h2>
              <p className="text-sm text-gray-600">Enter your credentials to access the admin dashboard</p>
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={adminCredentials.email}
                  onChange={(e) => handleAdminCredentialChange('email', e.target.value)}
                  required
                  className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400/20 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={adminCredentials.password}
                    onChange={(e) => handleAdminCredentialChange('password', e.target.value)}
                    required
                    className="bg-white border-gray-200 focus:border-red-400 focus:ring-red-400/20 h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {adminError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 wrap-break-word">{adminError}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={adminLoading}
                className="w-full h-12 bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>{adminLoading ? 'Signing in...' : 'Access Admin Dashboard'}</span>
                </span>
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Institution Admin Flow */}
      {showInstitutionAdminFlow && (
        <div className="fixed inset-0 z-50 bg-linear-to-br from-blue-50 via-white to-purple-50 overflow-y-auto">
          <InstitutionAdminLogin
            onLogin={onInstitutionAdminLogin}
            onBack={() => setShowInstitutionAdminFlow(false)}
          />
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-450 {
          animation-delay: 450ms;
        }
        .delay-600 {
          animation-delay: 600ms;
        }
        .delay-750 {
          animation-delay: 750ms;
        }
        .delay-900 {
          animation-delay: 900ms;
        }
      `}</style>
    </div>
  );
}
