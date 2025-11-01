import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Smartphone, 
  Play, 
  Users, 
  Clock, 
  Zap,
  Shield,
  Flame,
  Mountain,
  Waves,
  Wind,
  Eye,
  Settings,
  Box,
  Headphones,
  QrCode
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function VRTrainingPage() {
  const { t } = useLanguage();
  const [showQRCode, setShowQRCode] = useState(false);

  const vrScenarios = [
    {
      id: 1,
      title: t('vr.earthquakeResponse'),
      description: t('vr.earthquakeDesc'),
      duration: t('vr.duration15to20'),
      difficulty: 'beginner',
      participants: 156,
      icon: Mountain,
      color: 'from-red-500 to-red-600',
      status: 'available'
    },
    {
      id: 2,
      title: t('vr.fireEmergency'),
      description: t('vr.fireDesc'),
      duration: t('vr.duration12to18'),
      difficulty: 'intermediate',
      participants: 203,
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      status: 'available'
    },
    {
      id: 3,
      title: t('vr.floodResponse'),
      description: t('vr.floodDesc'),
      duration: t('vr.duration20to25'),
      difficulty: 'advanced',
      participants: 89,
      icon: Waves,
      color: 'from-blue-500 to-blue-600',
      status: 'coming-soon'
    },
    {
      id: 4,
      title: t('vr.cyclonePreparedness'),
      description: t('vr.cycloneDesc'),
      duration: t('vr.duration18to22'),
      difficulty: 'advanced',
      participants: 67,
      icon: Wind,
      color: 'from-gray-500 to-gray-600',
      status: 'coming-soon'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background py-4 sm:py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground dark:text-foreground mb-2 break-words leading-tight">{t('vr.title')}</h1>
          <p className="text-muted-foreground dark:text-muted-foreground break-words">{t('vr.subtitle')}</p>
        </div>

        {/* Mobile VR Setup Instructions */}
        <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground dark:text-card-foreground">
              <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="break-words">{t('vr.gettingStarted')}</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground dark:text-muted-foreground break-words">
              {t('vr.setupDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2 text-card-foreground dark:text-card-foreground break-words">{t('vr.smartphone')}</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.smartphoneDesc')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Box className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2 text-card-foreground dark:text-card-foreground break-words">{t('vr.cardboardViewer')}</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.cardboardDesc')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Headphones className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2 text-card-foreground dark:text-card-foreground break-words">{t('vr.headphones')}</h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.headphonesDesc')}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                onClick={() => setShowQRCode(!showQRCode)}
              >
                <QrCode className="h-4 w-4 mr-2" />
                {t('vr.downloadApp')}
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                {t('vr.setupGuide')}
              </Button>
            </div>
            {showQRCode && (
              <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg border text-center">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 mx-auto mb-4 rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-500" />
                </div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">{t('vr.qrCodeDesc')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* VR Scenarios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {vrScenarios.map((scenario) => {
            const IconComponent = scenario.icon;
            return (
              <Card key={scenario.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden bg-card dark:bg-card">
                <div className={`h-24 sm:h-32 bg-gradient-to-br ${scenario.color} relative`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 text-white">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    {scenario.status === 'coming-soon' ? (
                      <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                        {t('vr.comingSoon')}
                      </Badge>
                    ) : (
                      <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                        <Play className="h-3 w-3 mr-1" />
                        {t('vr.available')}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold break-words">{scenario.title}</h3>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <p className="text-muted-foreground dark:text-muted-foreground mb-4 text-sm sm:text-base break-words">{scenario.description}</p>
                  
                  <div className="flex items-center justify-between mb-4 gap-2 sm:gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span className="break-words">{scenario.duration}</span>
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                        <span>{scenario.participants}</span>
                      </span>
                    </div>
                    <Badge className={`${getDifficultyColor(scenario.difficulty)} flex-shrink-0 text-xs`}>
                      {t(`vr.${scenario.difficulty}`)}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full text-sm sm:text-base" 
                    disabled={scenario.status === 'coming-soon'}
                    variant={scenario.status === 'coming-soon' ? 'outline' : 'default'}
                  >
                    {scenario.status === 'coming-soon' ? (
                      <>
                        <Clock className="h-4 w-4 mr-2" />
                        {t('vr.comingSoon')}
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        {t('vr.startTraining')}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* VR Training Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="bg-card dark:bg-card">
            <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">515</div>
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.totalSessions')}</div>
            </CardContent>
          </Card>
          <Card className="bg-card dark:bg-card">
            <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">94%</div>
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.completionRate')}</div>
            </CardContent>
          </Card>
          <Card className="bg-card dark:bg-card">
            <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1 sm:mb-2">{t('vr.avgTime')}</div>
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.avgSessionTime')}</div>
            </CardContent>
          </Card>
          <Card className="bg-card dark:bg-card">
            <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">4.8/5</div>
              <div className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground break-words">{t('vr.userRating')}</div>
            </CardContent>
          </Card>
        </div>

        {/* VR Preview */}
        <Card className="bg-card dark:bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground dark:text-card-foreground">
              <Eye className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              <span className="break-words">{t('vr.trainingPreview')}</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground dark:text-muted-foreground break-words">
              {t('vr.previewDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 h-32 sm:h-48 md:h-64">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1592814612565-4961b68b82f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTc4MzM0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt={t('vr.trainingEnvironmentAlt')}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                  <Play className="h-4 w-4 sm:h-6 sm:w-6 mr-2" />
                  <span className="text-sm sm:text-base">{t('vr.previewEnvironment')}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}