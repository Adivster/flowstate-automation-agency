
import { 
  AlertCircle, 
  TrendingUp, 
  Zap,
  Gauge,
  Activity,
  BrainCircuit
} from 'lucide-react';
import { Insight } from '../InsightCard';

export const getInsightsData = (): Insight[] => {
  return [
    {
      id: 1,
      type: 'anomaly',
      title: 'Workflow bottleneck detected',
      description: 'Compliance division has 32% increased processing time in the last 24 hours.',
      icon: AlertCircle,
      action: '/analytics/workflow-optimization',
      actionText: 'Investigate',
      severity: 'high',
      confidence: 92,
      additionalInfo: 'This correlates with recent document volume increase deployed on Tuesday.',
      recommendations: [
        'Temporarily allocate 3 additional agents to compliance',
        'Prioritize high-value documents in the queue',
        'Implement parallel processing for standard reviews'
      ],
      metrics: {
        current: 3.2,
        previous: 2.4,
        change: 32.5,
        historicalAvg: 2.3
      }
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Response time optimization',
      description: 'Response time improved 24% since last AI tuning operation.',
      icon: Gauge,
      action: '/system/performance',
      actionText: 'View Details',
      severity: 'medium',
      confidence: 87,
      additionalInfo: 'Further improvements possible with additional prompt engineering.',
      predictionData: [
        { name: 'Mon', actual: 240, predicted: 240 },
        { name: 'Tue', actual: 210, predicted: 220 },
        { name: 'Wed', actual: 190, predicted: 200 },
        { name: 'Thu', actual: 170, predicted: 180 },
        { name: 'Fri', actual: null, predicted: 160 },
      ]
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Knowledge Base indexing needed',
      description: '218 new documents need indexing to improve search accuracy.',
      icon: BrainCircuit,
      action: '/knowledge',
      actionText: 'Start Indexing',
      severity: 'medium',
      confidence: 89,
      additionalInfo: 'Agents would be 34% more accurate with properly indexed knowledge base.',
      recommendations: [
        'Run automated indexing on recent documents',
        'Update taxonomy with new industry terms',
        'Apply classification algorithms to untagged documents'
      ]
    },
    {
      id: 4,
      type: 'insight',
      title: 'Agent collaboration opportunity',
      description: 'Pairing research and content agents would improve output quality by 32%.',
      icon: Zap,
      action: '/agents/pairings',
      actionText: 'Setup Pairing',
      severity: 'low',
      confidence: 94,
      additionalInfo: 'This pairing showed superior results in 7 out of 8 test scenarios.',
      recommendations: [
        'Create workflow template for combined agent tasks',
        'Schedule sync intervals between research and content phases',
        'Add feedback loop to improve content context retention'
      ]
    },
    {
      id: 5,
      type: 'anomaly',
      title: 'Traffic spike detected',
      description: 'API traffic increased by 47% over expected patterns in the last 4 hours.',
      icon: Activity,
      action: '/analytics/traffic',
      actionText: 'Investigate Traffic',
      severity: 'medium',
      confidence: 86,
      additionalInfo: 'This spike correlates with the recent product launch. Consider scaling resources.',
      recommendations: [
        'Temporarily increase processing capacity',
        'Implement rate limiting for non-critical endpoints',
        'Monitor for potential security concerns'
      ],
      metrics: {
        current: 1470,
        previous: 1000,
        change: 47,
        historicalAvg: 980
      }
    }
  ];
};

export default getInsightsData;
