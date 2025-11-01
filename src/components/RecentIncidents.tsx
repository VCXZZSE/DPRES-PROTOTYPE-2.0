import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Users, Shield, AlertTriangle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function RecentIncidents() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 break-words">
            {t('landing.disasters.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto break-words">
            {t('landing.disasters.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Cyclone Fani 2019 - Odisha */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 bg-white flex flex-col h-full">
            <div className="aspect-[16/10] relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1723551909082-866e0e48afb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsb25lJTIwZGlzYXN0ZXIlMjBmbG9vZGluZyUyMGRhbWFnZXxlbnwxfHx8fDE3NTg4NjkyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cyclone Fani impact on schools"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                <AlertTriangle className="inline w-4 h-4 mr-2" />
                {t('landing.disasters.cycloneEmergency')}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('landing.disasters.cycloneFani')}</h3>
                <p className="text-gray-200">{t('landing.disasters.cycloneFaniDesc')}</p>
              </div>
            </div>
            <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                  <Users className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">2,847</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsAffected')}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">2,785</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsEvacuated')}</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-1">
                {t('landing.disasters.cycloneFaniText')}
              </p>
              <a href="https://en.wikipedia.org/wiki/Cyclone_Fani" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('landing.disasters.learnMore')}
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Punjab Floods 2023 */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 bg-white flex flex-col h-full">
            <div className="aspect-[16/10] relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1660458074355-89e4281dd62d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGZsb29kJTIwbW9uc29vbiUyMGRpc2FzdGVyfGVufDF8fHx8MTc1ODg2OTI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Punjab floods affecting schools"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                <AlertTriangle className="inline w-4 h-4 mr-2" />
                {t('landing.disasters.floodEmergency')}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('landing.disasters.punjabFloods')}</h3>
                <p className="text-gray-200">{t('landing.disasters.punjabFloodsDesc')}</p>
              </div>
            </div>
            <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,234</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsAffected')}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">1,220</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsRelocated')}</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-1">
                {t('landing.disasters.punjabFloodsText')}
              </p>
              <a href="https://en.wikipedia.org/wiki/2023_North_India_floods" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('landing.disasters.learnMore')}
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Gujarat Earthquake 2001 */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 bg-white flex flex-col h-full">
            <div className="aspect-[16/10] relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1582617012849-36e9c476245a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwZGlzYXN0ZXIlMjByZXNjdWV8ZW58MXx8fHwxNzU4ODY5MjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gujarat earthquake school rescue"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                <AlertTriangle className="inline w-4 h-4 mr-2" />
                {t('landing.disasters.majorEarthquake')}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('landing.disasters.gujarateEarthquake')}</h3>
                <p className="text-gray-200">{t('landing.disasters.gujarateEarthquakeDesc')}</p>
              </div>
            </div>
            <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                  <Users className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5,986</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsAffected')}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">4,567</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsRescued')}</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-1">
                {t('landing.disasters.gujarateEarthquakeText')}
              </p>
              <a href="https://en.wikipedia.org/wiki/2001_Gujarat_earthquake" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('landing.disasters.learnMore')}
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Indian Ocean Tsunami 2004 */}
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700 bg-white flex flex-col h-full">
            <div className="aspect-[16/10] relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c3VuYW1pJTIwZGlzYXN0ZXIlMjBjb2FzdGFsJTIwZGFtYWdlfGVufDF8fHx8MTc1ODg4NDQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tamil Nadu tsunami 2004 coastal flooding damage"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                <AlertTriangle className="inline w-4 h-4 mr-2" />
                {t('landing.disasters.tsunamiEmergency')}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('landing.disasters.indianOceanTsunami')}</h3>
                <p className="text-gray-200">{t('landing.disasters.indianOceanTsunamiDesc')}</p>
              </div>
            </div>
            <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3,456</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsAffected')}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">2,890</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('landing.disasters.studentsEvacuated')}</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-1">
                {t('landing.disasters.indianOceanTsunamiText')}
              </p>
              <a href="https://en.wikipedia.org/wiki/2004_Indian_Ocean_earthquake_and_tsunami" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('landing.disasters.learnMore')}
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('landing.disasters.buildPreparedness')}</h3>
            <p className="text-lg mb-6 opacity-90">{t('landing.disasters.joinInstitutions')}</p>
            <Link to="/modules" className="inline-block">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center text-center">
                <BookOpen className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="whitespace-normal leading-tight">{t('landing.disasters.startTraining')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}