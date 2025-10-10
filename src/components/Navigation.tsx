import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Alert, AlertDescription } from './ui/alert';
import { EmergencySOS } from './EmergencySOS';
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  Headphones, 
  Globe,
  AlertTriangle,
  LogOut,
  User,
  Moon,
  Sun,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguage } from './LanguageContext';

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
}

interface NavigationProps {
  userData: UserData | null;
  onLogout: () => void;
  isFirstLogin?: boolean;
}

export function Navigation({ onLogout }: NavigationProps) {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode was previously enabled
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosConfirmed, setSosConfirmed] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  // Apply dark mode on component mount
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const indianLanguages = [
    { value: 'en', label: 'English', native: 'English' },
    { value: 'hi', label: 'Hindi', native: 'हिंदी' },
    { value: 'bn', label: 'Bengali', native: 'বাংলা' },
    { value: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { value: 'te', label: 'Telugu', native: 'తెలుగు' },
    { value: 'mr', label: 'Marathi', native: 'मराठी' },
    { value: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { value: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { value: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { value: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { value: 'as', label: 'Assamese', native: 'অসমীয়া' },
    { value: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
    { value: 'ur', label: 'Urdu', native: 'اردو' }
  ];

  const handleSosConfirm = () => {
    setSosConfirmed(true);
    // Reset after 3 seconds
    setTimeout(() => setSosConfirmed(false), 3000);
  };

  return (
    <>
      {/* Success Message */}
      {sosConfirmed && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 shadow-lg">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
              ✅ {t('dashboard.sos.success')}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <nav className="border-b bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-600 to-indigo-600 bg-clip-text text-transparent">
                DPRES
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/dashboard' 
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="font-medium text-sm">{t('nav.dashboard')}</span>
              </Link>
              
              <Link 
                to="/modules" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/modules' 
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium text-sm">{t('nav.modules')}</span>
              </Link>
              
              <Link 
                to="/vr-training" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/vr-training' 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
              >
                <Headphones className="h-4 w-4" />
                <span className="font-medium text-sm">{t('nav.vr')}</span>
              </Link>
            </div>
            
            {/* Desktop Controls - Fixed spacing */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Emergency Button - Separated */}
              <EmergencySOS onConfirm={handleSosConfirm} variant="navigation">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                  size="sm"
                >
                  <div className="absolute inset-0 bg-red-400 opacity-20 group-hover:animate-pulse"></div>
                  <AlertTriangle className="h-4 w-4 mr-1 relative z-10" />
                  <span className="relative z-10 font-medium text-sm">{t('landing.emergency')}</span>
                </Button>
              </EmergencySOS>

              <div className="flex items-center space-x-3">
                {/* Language Selector */}
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-28 h-9 border-gray-200 dark:border-gray-700">
                    <Globe className="h-4 w-4 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {indianLanguages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.native}</span>
                          {lang.value !== 'en' && (
                            <span className="text-xs text-gray-500">({lang.label})</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center space-x-1">
                  <Sun className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={toggleDarkMode}
                    className="data-[state=checked]:bg-indigo-600 scale-75"
                  />
                  <Moon className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 h-9"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="text-sm">{t('nav.logout')}</span>
                </Button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-12 h-9 p-0 border-gray-200 dark:border-gray-700">
                  <Globe className="h-4 w-4 mx-auto" />
                </SelectTrigger>
                <SelectContent>
                  {indianLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span>{lang.native}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mobile Menu Button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0" aria-label={t('nav.menu')}>
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>{t('nav.menu')}</SheetTitle>
                    <SheetDescription>
                      Navigate to different sections of DPRES
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Navigation Links */}
                    <div className="space-y-3">
                      <Link 
                        to="/dashboard" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          location.pathname === '/dashboard' 
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                        }`}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-medium">{t('nav.dashboard')}</span>
                      </Link>
                      
                      <Link 
                        to="/modules" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          location.pathname === '/modules' 
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                        }`}
                      >
                        <BookOpen className="h-5 w-5" />
                        <span className="font-medium">{t('nav.modules')}</span>
                      </Link>
                      
                      <Link 
                        to="/vr-training" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          location.pathname === '/vr-training' 
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                        }`}
                      >
                        <Headphones className="h-5 w-5" />
                        <span className="font-medium">{t('nav.vr')}</span>
                      </Link>
                    </div>

                    {/* Emergency Button */}
                    <EmergencySOS onConfirm={() => { handleSosConfirm(); setMobileMenuOpen(false); }} variant="navigation">
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white shadow-lg w-full justify-start"
                      >
                        <AlertTriangle className="h-5 w-5 mr-3" />
                        <span className="font-medium">{t('landing.emergency')}</span>
                      </Button>
                    </EmergencySOS>

                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between px-3 py-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('nav.darkMode')}</span>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Switch 
                          checked={darkMode} 
                          onCheckedChange={toggleDarkMode}
                          className="data-[state=checked]:bg-indigo-600"
                        />
                        <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>

                    {/* Logout Button */}
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 w-full justify-start"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      <span className="font-medium">{t('nav.logout')}</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>


    </>
  );
}