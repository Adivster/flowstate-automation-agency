
import { useState, useEffect } from 'react';

export interface WorkflowInsight {
  workflowId: string;
  message: string;
  type: 'optimization' | 'warning' | 'success' | 'opportunity';
  improvement: string;
  impact: number;
  action?: {
    label: string;
    type: 'apply' | 'learn' | 'configure';
  };
}

export const useWorkflowAIInsights = (workflowId: string) => {
  const [insights, setInsights] = useState<WorkflowInsight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      // For now, we'll simulate AI insights
      setTimeout(() => {
        // More positive/opportunity-focused insights
        const mockInsights: WorkflowInsight[] = [
          {
            workflowId,
            type: 'opportunity',
            message: 'Parallelizing steps 3-5 could improve throughput by 40%',
            improvement: 'Apply parallel processing',
            impact: 40,
            action: {
              label: 'Apply Optimization',
              type: 'apply'
            }
          },
          {
            workflowId,
            type: 'optimization',
            message: 'Adding caching would reduce API load by 25%',
            improvement: 'Implement caching layer',
            impact: 25,
            action: {
              label: 'Learn More',
              type: 'learn'
            }
          },
          {
            workflowId,
            type: 'success',
            message: 'Workflow efficiency increased by 15% after recent changes',
            improvement: 'Continue monitoring performance',
            impact: 15,
            action: {
              label: 'View Details',
              type: 'learn'
            }
          }
        ];
        
        // Add more context-specific insights based on workflow ID
        if (workflowId === '1') {
          mockInsights.push({
            workflowId,
            type: 'opportunity',
            message: 'Similar workflows are seeing 30% better results with ML preprocessing',
            improvement: 'Add ML preprocessing step',
            impact: 30,
            action: {
              label: 'Configure ML',
              type: 'configure'
            }
          });
        } else if (workflowId === '2') {
          mockInsights.push({
            workflowId,
            type: 'optimization',
            message: 'This workflow could benefit from scheduled pre-warming',
            improvement: 'Set up scheduled triggers',
            impact: 22,
            action: {
              label: 'Configure Schedule',
              type: 'configure'
            }
          });
        } else if (workflowId === '6') {
          mockInsights.push({
            workflowId,
            type: 'warning',
            message: 'OCR processing could be optimized with better image preprocessing',
            improvement: 'Add image preprocessing step',
            impact: 35,
            action: {
              label: 'Fix Now',
              type: 'apply'
            }
          });
        }
        
        setInsights(mockInsights);
        setLoading(false);
      }, 500);
    };

    if (workflowId) {
      fetchInsights();
    } else {
      setInsights([]);
    }
  }, [workflowId]);

  return { insights, loading };
};
