import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from './ui/accordion';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from './ui/dialog';
import { Label } from './ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  HelpCircle, 
  BookOpen, 
  PlayCircle, 
  Award, 
  Lock, 
  Headphones,
  Search,
  Send,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { toast } from 'sonner';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

export function FAQSection() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [queryType, setQueryType] = useState('');
  const [queryDescription, setQueryDescription] = useState('');

  const faqs: FAQ[] = [
    {
      id: 'faq-1',
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer'),
      icon: <HelpCircle className="h-5 w-5" />,
      category: t('faq.category.general')
    },
    {
      id: 'faq-2',
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer'),
      icon: <BookOpen className="h-5 w-5" />,
      category: t('faq.category.training')
    },
    {
      id: 'faq-3',
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer'),
      icon: <PlayCircle className="h-5 w-5" />,
      category: t('faq.category.training')
    },
    {
      id: 'faq-4',
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer'),
      icon: <Award className="h-5 w-5" />,
      category: t('faq.category.certificates')
    },
    {
      id: 'faq-5',
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer'),
      icon: <Lock className="h-5 w-5" />,
      category: t('faq.category.account')
    },
    {
      id: 'faq-6',
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer'),
      icon: <Headphones className="h-5 w-5" />,
      category: t('faq.category.support')
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitQuery = () => {
    if (!queryType || !queryDescription.trim()) {
      toast.error(t('faq.query.fillAllFields'));
      return;
    }

    // Simulate sending query to coordinator
    toast.success(t('faq.query.success'));
    
    // Reset form and close dialog
    setQueryType('');
    setQueryDescription('');
    setIsDialogOpen(false);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative Indian-inspired patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-600 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-orange-600 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-indigo-600 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full border-2 border-indigo-600 rotate-45"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700">
            {t('faq.badge')}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            {t('faq.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto break-words">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder={t('faq.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-5 sm:py-6 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* FAQ Accordion */}
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 sm:px-6 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <AccordionTrigger className="py-4 sm:py-5 hover:no-underline group">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 text-left w-full pr-2">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {faq.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words">
                        {faq.question}
                      </h3>
                      <span className="inline-block mt-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 sm:pb-5 pt-2">
                  <div className="pl-0 sm:pl-16 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">{t('faq.noResults')}</p>
          </div>
        )}

        {/* Help Footer */}
        <div className="mt-8 sm:mt-12 text-center bg-gradient-to-r from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 sm:p-8 border border-blue-100 dark:border-gray-700">
          <Headphones className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">
            {t('faq.helpTitle')}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 break-words mb-4">
            {t('faq.helpDescription')}
          </p>

          {/* Raise Query Button with Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                {t('faq.query.raiseQuery')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" aria-describedby="faq-query-description">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Send className="h-5 w-5 text-blue-600" />
                  {t('faq.query.title')}
                </DialogTitle>
                <DialogDescription id="faq-query-description" className="text-sm sm:text-base">
                  {t('faq.query.description')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Query Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="query-type">{t('faq.query.type')}</Label>
                  <Select value={queryType} onValueChange={setQueryType}>
                    <SelectTrigger id="query-type">
                      <SelectValue placeholder={t('faq.query.selectType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">{t('faq.query.technical')}</SelectItem>
                      <SelectItem value="account">{t('faq.query.account')}</SelectItem>
                      <SelectItem value="training">{t('faq.query.training')}</SelectItem>
                      <SelectItem value="certificate">{t('faq.query.certificate')}</SelectItem>
                      <SelectItem value="general">{t('faq.query.general')}</SelectItem>
                      <SelectItem value="other">{t('faq.query.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Query Description */}
                <div className="space-y-2">
                  <Label htmlFor="query-description">{t('faq.query.descriptionLabel')}</Label>
                  <Textarea
                    id="query-description"
                    placeholder={t('faq.query.descriptionPlaceholder')}
                    value={queryDescription}
                    onChange={(e) => setQueryDescription(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                    {t('faq.query.infoMessage')}
                  </p>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  onClick={handleSubmitQuery}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('faq.query.submit')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
