import React, { useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { AlertProvider } from "./components/shared/AlertContext";
import { CommunicationProvider } from "./components/shared/CommunicationContext";
import { useIsMobile } from "./components/hooks/useIsMobile";
import { Toaster } from "./components/ui/sonner";

// Lazy load components for better code splitting
const LoginPage = lazy(() => import("./components/LoginPage").then(m => ({ default: m.LoginPage })));
const LandingPage = lazy(() => import("./components/LandingPage").then(m => ({ default: m.LandingPage })));
const Dashboard = lazy(() => import("./components/Dashboard").then(m => ({ default: m.Dashboard })));
const ModulesPage = lazy(() => import("./components/ModulesPage").then(m => ({ default: m.ModulesPage })));
const VRTrainingPage = lazy(() => import("./components/VRTrainingPage").then(m => ({ default: m.VRTrainingPage })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const DesktopOnlyScreen = lazy(() => import("./components/DesktopOnlyScreen").then(m => ({ default: m.DesktopOnlyScreen })));
const Navigation = lazy(() => import("./components/Navigation").then(m => ({ default: m.Navigation })));
const WelcomeAnimation = lazy(() => import("./components/WelcomeAnimation").then(m => ({ default: m.WelcomeAnimation })));
const AdminWelcomeAnimation = lazy(() => import("./components/AdminWelcomeAnimation").then(m => ({ default: m.AdminWelcomeAnimation })));

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
  institutionType: "school" | "college";
}

interface AdminData {
  email: string;
  password: string;
  displayName?: string;
}

function AppContent() {
  const [userData, setUserData] = useState<UserData | null>(
    null,
  );
  const [adminData, setAdminData] = useState<AdminData | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const [showAdminWelcomeAnimation, setShowAdminWelcomeAnimation] = useState(false);
  
  // Mobile detection hook
  const isMobile = useIsMobile(1024);
  
  // Language context to reset on logout
  const { setLanguage } = useLanguage();

  // Memoize animation complete handlers to prevent infinite loops
  const handleAnimationComplete = React.useCallback(() => {
    setShowWelcomeAnimation(false);
  }, []);

  const handleAdminAnimationComplete = React.useCallback(() => {
    setShowAdminWelcomeAnimation(false);
  }, []);

  const handleLogin = (data: UserData) => {
    setUserData(data);
    setIsLoggedIn(true);
    setIsAdminLoggedIn(false);
    // Set first login to true on initial login, false on subsequent navigation
    setIsFirstLogin(true);
    // Show welcome animation on login
    setShowWelcomeAnimation(true);
  };

  const handleAdminLogin = (data: AdminData) => {
    // Check if user is on mobile - if so, don't allow admin login
    if (isMobile) {
      // Don't proceed with admin login on mobile
      return;
    }
    setAdminData(data);
    setIsAdminLoggedIn(true);
    setIsLoggedIn(false);
    setIsFirstLogin(true);
    // Show admin welcome animation on login
    setShowAdminWelcomeAnimation(true);
  };

  const handleAdminLogout = () => {
    setAdminData(null);
    setIsAdminLoggedIn(false);
    setIsFirstLogin(true);
    // Force light mode on logout
    document.documentElement.classList.remove("dark");
    // Reset language to English
    setLanguage('en');
  };

  const handleLogout = () => {
    setUserData(null);
    setAdminData(null);
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsFirstLogin(true); // Reset for next login
    setShowWelcomeAnimation(false); // Reset animation state
    setShowAdminWelcomeAnimation(false); // Reset admin animation state
    // Force light mode on logout
    document.documentElement.classList.remove("dark");
    // Reset language to English
    setLanguage('en');
  };

  // Track navigation to mark subsequent visits as "Welcome back"
  React.useEffect(() => {
    if (isLoggedIn && isFirstLogin) {
      const timer = setTimeout(() => {
        setIsFirstLogin(false);
      }, 5000); // After 5 seconds, subsequent navigation will show "Welcome back"

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isFirstLogin]);

  return (
    <AlertProvider>
      <CommunicationProvider>
        <Router>
          <Toaster position="top-right" richColors />
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          }>
            {!isLoggedIn && !isAdminLoggedIn ? (
              <LoginPage
                onLogin={handleLogin}
                onAdminLogin={handleAdminLogin}
              />
            ) : showWelcomeAnimation && userData ? (
              <WelcomeAnimation
                studentName={userData.studentName}
                schoolName={userData.schoolName}
                onComplete={handleAnimationComplete}
              />
            ) : showAdminWelcomeAnimation && adminData ? (
              <AdminWelcomeAnimation
                adminEmail={adminData.email}
                onComplete={handleAdminAnimationComplete}
              />
            ) : (
              <div className="min-h-screen bg-background text-foreground">
                {/* Show Navigation only for regular users, not admin */}
                {isLoggedIn && !isAdminLoggedIn && (
                  <Navigation
                    userData={userData}
                    onLogout={handleLogout}
                    isFirstLogin={isFirstLogin}
                  />
                )}

                {/* Admin Dashboard - Direct access for admin users (Desktop only) */}
                {isAdminLoggedIn ? (
                  isMobile ? (
                    <DesktopOnlyScreen onBack={handleAdminLogout} />
                  ) : (
                    <AdminDashboard
                      adminData={adminData}
                      onLogout={handleLogout}
                    />
                  )
                ) : (
                  /* Regular user routes */
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <LandingPage userData={userData} />
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <Dashboard userData={userData} />
                      }
                    />
                    <Route
                      path="/modules"
                      element={
                        <ModulesPage userData={userData} />
                      }
                    />
                    <Route
                      path="/vr-training"
                      element={<VRTrainingPage />}
                    />
                    {/* Block admin access for regular users */}
                    <Route
                      path="/admin"
                      element={<Navigate to="/" replace />}
                    />
                    <Route
                      path="/preview_page.html"
                      element={<Navigate to="/" replace />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
                    />
                  </Routes>
                )}
              </div>
            )}
          </Suspense>
          </Router>
        </CommunicationProvider>
      </AlertProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}