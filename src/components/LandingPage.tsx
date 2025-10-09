import image_eb676453f7fa58e46cc7a87afbf8720a41cd2d30 from 'figma:asset/eb676453f7fa58e46cc7a87afbf8720a41cd2d30.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  Headphones, 
  AlertTriangle,
  Users,
  Target,
  Globe
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { RecentIncidents } from './RecentIncidents';
import { FAQSection } from './FAQSection';

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
}

interface LandingPageProps {
  userData: UserData | null;
}

export function LandingPage({ userData }: LandingPageProps) {
  const { t } = useLanguage();
  
  // Generate dynamic greeting messages
  const greetings = [
    `Keep going, ${userData?.studentName || 'Student'}! You're almost there 🚀`,
    `Stay safe, stay smart ${userData?.studentName || 'Student'} 🌍`,
    `Ready to level up your safety skills, ${userData?.studentName || 'Student'}? 💪`,
    `Building a safer tomorrow, one step at a time! ${userData?.studentName ? 'Welcome back, ' + userData.studentName : 'Welcome'} ✨`,
    `Your safety journey continues, ${userData?.studentName || 'Student'}! 🛡️`
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-indigo-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          {/* Indian-inspired decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large mandala pattern - positioned behind the image area */}
            <div className="absolute top-5 right-5 sm:top-10 sm:right-10 w-32 h-32 sm:w-60 sm:h-60 lg:w-80 lg:h-80 opacity-25">
              <div className="w-full h-full rounded-full border-3 border-orange-300 border-dashed animate-spin-slow"></div>
              <div className="absolute top-6 left-6 w-68 h-68 rounded-full border-2 border-white/60 border-dotted animate-pulse"></div>
              <div className="absolute top-12 left-12 w-56 h-56 rounded-full border border-orange-200/80"></div>
              <div className="absolute top-18 left-18 w-44 h-44 rounded-full border border-white/40"></div>
            </div>
            
            {/* Paisley-inspired curved elements - positioned at bottom left */}
            <div className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 opacity-30">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400/50 to-transparent rounded-full transform rotate-45 animate-pulse"></div>
              <div className="absolute top-2 left-4 w-24 h-24 bg-gradient-to-tr from-white/40 to-transparent rounded-full transform -rotate-12"></div>
              <div className="absolute top-4 left-6 w-16 h-16 bg-gradient-to-bl from-orange-300/40 to-transparent rounded-full transform rotate-30"></div>
            </div>
            
            {/* Traditional diamond pattern - positioned away from text */}
            <div className="absolute top-20 left-4 opacity-20">
              <div className="grid grid-cols-3 gap-2">
                <div className="w-4 h-4 bg-orange-300 transform rotate-45 animate-pulse"></div>
                <div className="w-4 h-4 bg-white/70 transform rotate-45 animate-pulse delay-300"></div>
                <div className="w-4 h-4 bg-orange-300 transform rotate-45 animate-pulse delay-600"></div>
                <div className="w-4 h-4 bg-white/70 transform rotate-45 animate-pulse delay-150"></div>
                <div className="w-4 h-4 bg-orange-300 transform rotate-45 animate-pulse delay-450"></div>
                <div className="w-4 h-4 bg-white/70 transform rotate-45 animate-pulse delay-750"></div>
                <div className="w-4 h-4 bg-orange-300 transform rotate-45 animate-pulse delay-300"></div>
                <div className="w-4 h-4 bg-white/70 transform rotate-45 animate-pulse delay-600"></div>
                <div className="w-4 h-4 bg-orange-300 transform rotate-45 animate-pulse delay-900"></div>
              </div>
            </div>
            
            {/* Lotus-inspired design - positioned at top center */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-20">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-white/30 rounded-full transform scale-x-50 rotate-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-white/30 rounded-full transform scale-x-50 rotate-30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-white/30 rounded-full transform scale-x-50 rotate-60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-white/30 rounded-full transform scale-x-50 rotate-90"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-white/30 rounded-full transform scale-x-50 rotate-120"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-400/60 to-white/30 rounded-full transform scale-x-50 rotate-150"></div>
              </div>
            </div>
            
            {/* Enhanced tricolor stripe */}
            <div className="absolute bottom-0 left-0 right-0 h-4 opacity-40">
              <div className="h-full bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
            </div>
            
            {/* Additional geometric patterns */}
            <div className="absolute bottom-20 right-4 opacity-25">
              <div className="w-16 h-16 border-2 border-orange-300 transform rotate-45"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border border-white/60 transform rotate-45"></div>
              <div className="absolute top-4 left-4 w-8 h-8 bg-orange-300/50 transform rotate-45"></div>
            </div>
            
            {/* Sacred geometry patterns */}
            <div className="absolute top-1/2 left-2 opacity-18">
              <div className="w-6 h-6 bg-white/60 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -left-1 w-8 h-8 border border-orange-300/60 rounded-full"></div>
              <div className="absolute -top-2 -left-2 w-10 h-10 border border-white/40 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              {userData && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 break-words">
                    Welcome back, {userData.studentName} 👋
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base lg:text-lg break-words">{userData.schoolName}</p>
                  <p className="text-white/60 text-xs sm:text-sm mt-2 break-words">{randomGreeting}</p>
                </div>
              )}
              
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent break-words">
                  DPRES
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 break-words">
                  {t('landing.hero.title')}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 break-words">
                  {t('landing.hero.subtitle')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link to="/vr-training" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all">
                    <Headphones className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">{t('nav.vr')}</span>
                  </Button>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl transition-all">
                    <LayoutDashboard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">{t('nav.dashboard')}</span>
                  </Button>
                </Link>
                <Link to="/modules" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                    <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">{t('nav.modules')}</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjB0cmFpbmluZyUyMGRyaWxsJTIwc2Nob29sJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU3ODM0MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Disaster preparedness education"
                className="rounded-lg shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 break-words">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto break-words">
              {t('landing.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-base sm:text-lg break-words dark:text-white">{t('landing.features.realtime')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base break-words dark:text-gray-300">
                  {t('landing.features.realtimeDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-base sm:text-lg break-words dark:text-white">{t('landing.features.training')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base break-words dark:text-gray-300">
                  {t('landing.features.trainingDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-base sm:text-lg break-words dark:text-white">{t('landing.features.vr')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base break-words dark:text-gray-300">
                  {t('landing.features.vrDesc')}
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-base sm:text-lg break-words dark:text-white">{t('landing.features.progress')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base break-words dark:text-gray-300">
                  {t('landing.features.progressDesc')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Disasters & Case Studies Section */}
      <RecentIncidents />

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">1,250+</div>
              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 break-words">{t('landing.stats.institutions')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 break-words">Currently enrolled in DPRES</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">45,000+</div>
              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 break-words">{t('landing.stats.students')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 break-words">Across all modules and VR sessions</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 break-words">{t('landing.stats.satisfaction')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 break-words">Average institutional readiness</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 break-words">
            Ready to Enhance Your Institution's Disaster Preparedness?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 break-words">
            Join thousands of educational institutions already using DPRES to build safer, more prepared communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-gray-100">
                <span className="text-sm sm:text-base">{t('landing.hero.getStarted')}</span>
              </Button>
            </Link>
            <Link to="/modules" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-gray-100">
                <span className="text-sm sm:text-base">Explore {t('nav.modules')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}