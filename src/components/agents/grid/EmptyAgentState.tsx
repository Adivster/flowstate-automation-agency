
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyAgentStateProps {
  clearFilters: () => void;
}

const EmptyAgentState: React.FC<EmptyAgentStateProps> = ({ clearFilters }) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-12">
      <div className="text-flow-muted-foreground text-sm">{t('noAgentsFound')}</div>
      <Button 
        variant="link" 
        onClick={clearFilters}
        className="mt-2 text-flow-accent"
      >
        {t('clearSearch')}
      </Button>
    </div>
  );
};

export default EmptyAgentState;
