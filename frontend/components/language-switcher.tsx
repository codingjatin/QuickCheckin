'use client';

import { Button } from '@/components/ui/button';
import { useI18nStore, Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18nStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white border border-border"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'FR' : 'EN'}</span>
    </Button>
  );
}