
import { useState, useEffect } from 'react';
import { getInsightsData } from './data/insightsData';
import { Insight } from './InsightCard';
import { useToast } from '@/hooks/use-toast';

export const useInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);
  const [filteredInsights, setFilteredInsights] = useState<Insight[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching insights
    setLoading(true);
    const fetchedInsights = getInsightsData();
    setInsights(fetchedInsights);
    setFilteredInsights(fetchedInsights);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = insights;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(insight => insight.type === filterType);
    }
    
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(insight => insight.severity === filterSeverity);
    }
    
    setFilteredInsights(filtered);
  }, [filterType, filterSeverity, insights]);

  const toggleExpand = (id: number) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  const handleApplyRecommendation = (insightId: number, recommendationIndex: number) => {
    const insight = insights.find(i => i.id === insightId);
    if (insight && insight.recommendations && insight.recommendations[recommendationIndex]) {
      toast({
        title: "Applying recommendation",
        description: insight.recommendations[recommendationIndex],
        duration: 3000
      });
    }
  };

  return {
    insights: filteredInsights,
    loading,
    expandedInsight,
    filterType,
    filterSeverity,
    toggleExpand,
    setFilterType,
    setFilterSeverity,
    handleApplyRecommendation
  };
};
