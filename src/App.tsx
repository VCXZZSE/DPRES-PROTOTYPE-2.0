import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { AlertProvider } from "./components/shared/AlertContext";
import { CommunicationProvider } from "./components/shared/CommunicationContext";
import { useIsMobile } from "./components/hooks/useIsMobile";
import { Toaster } from "./components/ui/sonner";
import { authService } from "./services/api";

const LoginPage = lazy(() => import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const LandingPage = lazy(() => import("./pages/LandingPage").then((m) => ({ default: m.LandingPage })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const ModulesPage = lazy(() => import("./pages/ModulesPage").then((m) => ({ default: m.ModulesPage })));
const VRTrainingPage = lazy(() => import("./pages/VRTrainingPage").then((m) => ({ default: m.VRTrainingPage })));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard })));
const InstitutionAdminDashboard = lazy(() => import("./pages/InstitutionAdminDashboard").then((m) => ({ default: m.InstitutionAdminDashboard })));
const DesktopOnlyScreen = lazy(() => import("./pages/DesktopOnlyScreen").then((m) => ({ default: m.DesktopOnlyScreen })));
const WelcomeAnimation = lazy(() => import("./pages/WelcomeAnimation").then((m) => ({ default: m.WelcomeAnimation })));
const AdminWelcomeAnimation = lazy(() => import("./pages/AdminWelcomeAnimation").then((m) => ({ default: m.AdminWelcomeAnimation })));
const LearningInterface = lazy(() => import("./components/features/LearningInterface").then((m) => ({ default: m.LearningInterface })));
const CommunityHub = lazy(() => import("./components/features/CommunityHub").then((m) => ({ default: m.CommunityHub })));

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

interface InstitutionAdminData {
  institutionId: string;
  adminName: string;
  role: string;
}

function AppContent() {
  const [userData, setUserData] = useState<UserData | null>(
    null,
  );
  const [adminData, setAdminData] = useState<AdminData | null>(
    null,
  );
  const [institutionAdminData, setInstitutionAdminData] = useState<InstitutionAdminData | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isInstitutionAdminLoggedIn, setIsInstitutionAdminLoggedIn] = useState(false);
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

  const loadingScreen = (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-sm text-muted-foreground">Loading...</div>
    </div>
  );

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
    authService.clearToken();
    // Check if user is on mobile - if so, don't allow admin login
    if (isMobile) {
      // Don't proceed with admin login on mobile
      return;
    }
    setAdminData(data);
    setIsAdminLoggedIn(true);
    setIsLoggedIn(false);
    setIsInstitutionAdminLoggedIn(false);
    setIsFirstLogin(true);
    // Show admin welcome animation on login
    setShowAdminWelcomeAnimation(true);
  };

  const handleInstitutionAdminLogin = (data: InstitutionAdminData) => {
    authService.clearToken();
    // Check if user is on mobile - if so, don't allow institution admin login
    if (isMobile) {
      // Don't proceed with institution admin login on mobile
      return;
    }
    setInstitutionAdminData(data);
    setIsInstitutionAdminLoggedIn(true);
    setIsAdminLoggedIn(false);
    setIsLoggedIn(false);
    setIsFirstLogin(true);
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
    authService.clearToken();
    setUserData(null);
    setAdminData(null);
    setInstitutionAdminData(null);
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    setIsInstitutionAdminLoggedIn(false);
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

  React.useEffect(() => {
    let isMounted = true;

    const restoreStudentSession = async () => {
      const token = authService.getToken();
      if (!token) {
        if (isMounted) {
          setIsAuthChecking(false);
        }
        return;
      }

      try {
        const me = await authService.getMe(token);
        if (!isMounted) {
          return;
        }

        setUserData({
          schoolName: "Connected Institution",
          schoolCode: String(me.institution_id),
          studentName: me.full_name,
          age: "",
          institutionType: "college",
        });
        setIsLoggedIn(true);
        setIsAdminLoggedIn(false);
        setIsInstitutionAdminLoggedIn(false);
        setShowWelcomeAnimation(false);
        setShowAdminWelcomeAnimation(false);
        setIsFirstLogin(false);
      } catch {
        authService.clearToken();
      } finally {
        if (isMounted) {
          setIsAuthChecking(false);
        }
      }
    };

    restoreStudentSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuthChecking) {
    return loadingScreen;
  }

  return (
    <AlertProvider>
      <CommunicationProvider>
        <Router>
          <Toaster position="top-right" richColors />
          <Suspense fallback={loadingScreen}>
            {!isLoggedIn && !isAdminLoggedIn && !isInstitutionAdminLoggedIn ? (
              <LoginPage
                onLogin={handleLogin}
                onAdminLogin={handleAdminLogin}
                onInstitutionAdminLogin={handleInstitutionAdminLogin}
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
                {isLoggedIn && !isAdminLoggedIn && !isInstitutionAdminLoggedIn && (
                  <header role="banner">
                    <Navigation
                      userData={userData}
                      onLogout={handleLogout}
                      isFirstLogin={isFirstLogin}
                    />
                  </header>
                )}

                {/* Institution Admin Dashboard */}
                {isInstitutionAdminLoggedIn ? (
                  <main id="main-content" role="main">
                    <InstitutionAdminDashboard
                      adminData={institutionAdminData}
                      onLogout={handleLogout}
                    />
                  </main>
                ) : /* SDMA Admin Dashboard - Direct access for admin users (Desktop only) */
                isAdminLoggedIn ? (
                  isMobile ? (
                    <main id="main-content" role="main">
                      <DesktopOnlyScreen onBack={handleAdminLogout} />
                    </main>
                  ) : (
                    <main id="main-content" role="main">
                      <AdminDashboard
                        adminData={adminData}
                        onLogout={handleLogout}
                      />
                    </main>
                  )
                ) : (
                  /* Regular user routes */
                  <main id="main-content" role="main">
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
                        path="/modules/:moduleId"
                        element={
                          <LearningInterface userData={userData} />
                        }
                      />
                      <Route
                        path="/vr-training"
                        element={<VRTrainingPage />}
                      />
                      <Route
                        path="/community"
                        element={<CommunityHub userData={userData} />}
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
                  </main>
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
      {/* Skip to main content link for keyboard accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <AppContent />
    </LanguageProvider>
  );
}