
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type ActionType = 'reassign' | 'optimize' | 'diagnose' | 'report' | 'tune' | 'simulate';

export interface ActionPrompt {
  id: string;
  title: string;
  description: string;
  actionType: ActionType;
  severity: 'low' | 'medium' | 'high';
  entityType: 'system' | 'division' | 'agent';
  entityId?: string;
  entityName?: string;
  actions: {
    confirm: string;
    decline: string;
    moreInfo?: string;
  };
  metrics?: {
    before: number;
    after: number;
    unit: string;
  };
}

export const useConversationalFlow = () => {
  const [activeContext, setActiveContext] = useState<'global' | 'division' | 'agent'>('global');
  const [contextEntity, setContextEntity] = useState<{id: string; name: string; type: string} | null>(null);
  const [pendingPrompts, setPendingPrompts] = useState<ActionPrompt[]>([]);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const [hasUnreadInsights, setHasUnreadInsights] = useState(false);
  const { toast } = useToast();
  
  // Simulate receiving insights from the system
  useEffect(() => {
    const insightTimer = setTimeout(() => {
      if (Math.random() > 0.7 && pendingPrompts.length < 3) {
        const newPrompt = generateRandomPrompt();
        setPendingPrompts(prev => [...prev, newPrompt]);
        setHasUnreadInsights(true);
        
        // Notify user of new insight
        toast({
          title: "New AI Insight",
          description: newPrompt.title,
          duration: 5000,
        });
      }
    }, 45000); // Every 45 seconds
    
    return () => clearTimeout(insightTimer);
  }, [pendingPrompts, toast]);

  // Generate contextual command suggestions based on active context
  useEffect(() => {
    const suggestions = generateContextualSuggestions(activeContext, contextEntity);
    setActiveSuggestions(suggestions);
  }, [activeContext, contextEntity]);
  
  // Method to handle switching context
  const switchContext = (type: 'global' | 'division' | 'agent', entity?: {id: string; name: string; type: string}) => {
    setActiveContext(type);
    setContextEntity(entity || null);
    
    // Generate new suggestions based on context
    const suggestions = generateContextualSuggestions(type, entity || null);
    setActiveSuggestions(suggestions);
    
    return {
      message: entity 
        ? `You are now in the context of ${entity.name} ${entity.type}. How can I assist you?` 
        : 'Switched to global context. How can I help you with system-wide operations?'
    };
  };
  
  // Handle action prompts
  const handlePromptAction = (promptId: string, action: 'confirm' | 'decline' | 'moreInfo') => {
    const prompt = pendingPrompts.find(p => p.id === promptId);
    if (!prompt) return null;
    
    // Remove this prompt from pending
    setPendingPrompts(prev => prev.filter(p => p.id !== promptId));
    
    if (action === 'confirm') {
      // Simulate executing the action
      return {
        type: 'system',
        message: `Executing ${prompt.actionType} on ${prompt.entityName || 'system'}. This will improve performance by approximately ${prompt.metrics?.after - prompt.metrics?.before}${prompt.metrics?.unit}.`,
        actionTaken: prompt.actionType,
        entityType: prompt.entityType,
        entityId: prompt.entityId
      };
    } else if (action === 'decline') {
      return {
        type: 'system',
        message: `${prompt.actionType} action on ${prompt.entityName || 'system'} has been declined.`,
        actionTaken: null
      };
    } else {
      // More info requested
      return {
        type: 'system',
        message: generateDetailedInfo(prompt),
        actionTaken: null
      };
    }
  };
  
  // Process conversation input with context awareness
  const processConversationalInput = (input: string) => {
    // Check if input is targeting a specific entity
    if (input.toLowerCase().startsWith('focus on') || input.toLowerCase().startsWith('switch to')) {
      const entityMatch = input.match(/focus on|switch to\s+(\w+)\s+(\w+)/i);
      if (entityMatch) {
        const entityType = entityMatch[2].toLowerCase();
        const entityName = entityMatch[1];
        
        if (entityType === 'division' || entityType === 'agent') {
          return switchContext(
            entityType as 'division' | 'agent', 
            { id: entityName.toLowerCase(), name: entityName, type: entityType }
          );
        }
      }
    }
    
    // Check if input is requesting to view AI insights
    if (input.toLowerCase().includes('show insights') || input.toLowerCase().includes('ai insights')) {
      if (pendingPrompts.length > 0) {
        setHasUnreadInsights(false);
        return {
          type: 'system',
          message: `You have ${pendingPrompts.length} pending insights. I'll show them to you.`,
          showInsights: true,
          insights: pendingPrompts
        };
      } else {
        return {
          type: 'system',
          message: 'There are no pending AI insights at the moment. I'll notify you when new insights are available.'
        };
      }
    }
    
    // Handle context-specific queries
    if (activeContext !== 'global' && contextEntity) {
      if (input.toLowerCase().includes('performance') || input.toLowerCase().includes('status')) {
        return {
          type: 'system',
          message: generateContextSpecificStatus(activeContext, contextEntity)
        };
      }
    }
    
    // Handle affirmative responses to suggestions
    if (/^yes|proceed|go ahead|confirm|approve|execute$/i.test(input.trim())) {
      if (pendingPrompts.length > 0) {
        const prompt = pendingPrompts[0]; // Take the first pending prompt
        return handlePromptAction(prompt.id, 'confirm');
      }
    }
    
    // Fall back to general conversation
    return processGeneralConversation(input, activeContext, contextEntity);
  };
  
  const markInsightsAsRead = () => {
    setHasUnreadInsights(false);
  };
  
  return {
    activeContext,
    contextEntity,
    pendingPrompts,
    activeSuggestions,
    hasUnreadInsights,
    switchContext,
    handlePromptAction,
    processConversationalInput,
    markInsightsAsRead
  };
};

// Helper functions
const generateRandomPrompt = (): ActionPrompt => {
  const actionTypes: ActionType[] = ['reassign', 'optimize', 'diagnose', 'report', 'tune', 'simulate'];
  const entities = [
    { type: 'division', name: 'Analytics' },
    { type: 'division', name: 'Operations' },
    { type: 'division', name: 'Strategy' },
    { type: 'agent', name: 'Knowledge Engineer' },
    { type: 'agent', name: 'Data Architect' },
    { type: 'agent', name: 'Strategic Planner' }
  ];
  
  const randomAction = actionTypes[Math.floor(Math.random() * actionTypes.length)];
  const randomEntity = entities[Math.floor(Math.random() * entities.length)];
  const randomSeverity = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
  
  const currentMetric = Math.floor(Math.random() * 50) + 40; // 40-90
  const improvedMetric = Math.min(100, currentMetric + Math.floor(Math.random() * 15) + 5); // 5-20% improvement
  
  const titles = {
    reassign: `Task reassignment needed for ${randomEntity.name}`,
    optimize: `Optimization opportunity for ${randomEntity.name}`,
    diagnose: `Performance issue detected in ${randomEntity.name}`,
    report: `Anomaly detected in ${randomEntity.name} metrics`,
    tune: `Tuning recommended for ${randomEntity.name}`,
    simulate: `Simulation suggests improvements for ${randomEntity.name}`
  };
  
  const descriptions = {
    reassign: `${randomEntity.name} has a high task load that could be balanced for better efficiency.`,
    optimize: `${randomEntity.name} resource allocation could be improved by 15%.`,
    diagnose: `${randomEntity.name} is showing signs of inefficiency in recent operations.`,
    report: `${randomEntity.name} metrics have deviated from expected performance levels.`,
    tune: `${randomEntity.name} parameters need adjustment for optimal performance.`,
    simulate: `A simulation predicts improved outcomes with adjusted parameters for ${randomEntity.name}.`
  };
  
  return {
    id: `prompt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: titles[randomAction],
    description: descriptions[randomAction],
    actionType: randomAction,
    severity: randomSeverity as 'low' | 'medium' | 'high',
    entityType: randomEntity.type as 'division' | 'agent',
    entityId: randomEntity.name.toLowerCase().replace(' ', '-'),
    entityName: randomEntity.name,
    actions: {
      confirm: `Execute ${randomAction}`,
      decline: 'Dismiss',
      moreInfo: 'Show details'
    },
    metrics: {
      before: currentMetric,
      after: improvedMetric,
      unit: '%'
    }
  };
};

const generateContextualSuggestions = (
  context: 'global' | 'division' | 'agent',
  entity: {id: string; name: string; type: string} | null
): string[] => {
  if (context === 'global') {
    return [
      'Show system status',
      'Display active agents',
      'Generate performance report',
      'Show AI insights',
      'Optimize resource allocation'
    ];
  } else if (context === 'division' && entity) {
    return [
      `Show ${entity.name} performance metrics`,
      `List agents in ${entity.name}`,
      `Analyze ${entity.name} task distribution`,
      `Optimize ${entity.name} workflow`,
      `Simulate resource reallocation for ${entity.name}`
    ];
  } else if (context === 'agent' && entity) {
    return [
      `Show ${entity.name}'s current tasks`,
      `Analyze ${entity.name}'s performance`,
      `Tune ${entity.name}'s parameters`,
      `View ${entity.name}'s history`,
      `Reassign tasks from ${entity.name}`
    ];
  }
  
  return [];
};

const generateDetailedInfo = (prompt: ActionPrompt): string => {
  // Create more detailed information about the prompt
  let details = `Detailed Analysis for ${prompt.entityName}:\n\n`;
  
  if (prompt.actionType === 'reassign') {
    details += `Task load is currently at ${prompt.metrics?.before}${prompt.metrics?.unit}, which is ${prompt.severity === 'high' ? 'critically high' : prompt.severity === 'medium' ? 'concerning' : 'slightly elevated'}.\n\n`;
    details += `Recommended action will redistribute tasks to maintain optimal efficiency and is projected to improve overall performance to ${prompt.metrics?.after}${prompt.metrics?.unit}.\n\n`;
    details += `This action has been successful in similar scenarios 87% of the time.`;
  } else if (prompt.actionType === 'optimize') {
    details += `Current resource utilization efficiency: ${prompt.metrics?.before}${prompt.metrics?.unit}.\n\n`;
    details += `Optimization algorithm has identified redundancies and inefficient allocation patterns.\n\n`;
    details += `Projected efficiency after optimization: ${prompt.metrics?.after}${prompt.metrics?.unit}, resulting in approximately 12% cost reduction.`;
  } else if (prompt.actionType === 'diagnose') {
    details += `Performance metrics show a ${prompt.metrics?.before}${prompt.metrics?.unit} rate, below the expected threshold of ${prompt.metrics?.after}${prompt.metrics?.unit}.\n\n`;
    details += `Diagnostic routine will identify bottlenecks and suggest specific improvements.\n\n`;
    details += `Average resolution time for similar issues: 3.5 hours.`;
  } else {
    details += `Current performance: ${prompt.metrics?.before}${prompt.metrics?.unit}\n`;
    details += `Projected performance after action: ${prompt.metrics?.after}${prompt.metrics?.unit}\n`;
    details += `This represents a ${Math.round(((prompt.metrics?.after || 0) - (prompt.metrics?.before || 0)) / (prompt.metrics?.before || 1) * 100)}% improvement in overall efficiency.`;
  }
  
  return details;
};

const generateContextSpecificStatus = (
  context: 'division' | 'agent',
  entity: {id: string; name: string; type: string}
): string => {
  if (context === 'division') {
    return `${entity.name} Division Status:
- Operational efficiency: ${70 + Math.floor(Math.random() * 25)}%
- Active agents: ${3 + Math.floor(Math.random() * 4)}
- Tasks in progress: ${8 + Math.floor(Math.random() * 12)}
- Completion rate: ${85 + Math.floor(Math.random() * 15)}%
- Recent anomalies: ${Math.random() > 0.7 ? 'Yes (1)' : 'None detected'}

Would you like to see a detailed performance breakdown or take any specific actions?`;
  } else {
    return `${entity.name} Status:
- Operational status: ${Math.random() > 0.2 ? 'Active' : 'Idle'}
- Current load: ${Math.floor(Math.random() * 100)}%
- Response efficiency: ${70 + Math.floor(Math.random() * 30)}%
- Assigned tasks: ${1 + Math.floor(Math.random() * 5)}
- Last updated: ${Math.floor(Math.random() * 60)} minutes ago

Would you like to tune parameters, reassign tasks, or run a diagnostic?`;
  }
};

const processGeneralConversation = (
  input: string, 
  activeContext: 'global' | 'division' | 'agent',
  contextEntity: {id: string; name: string; type: string} | null
) => {
  // Process general conversation based on input keywords
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('status') || lowerInput.includes('health')) {
    return {
      type: 'system',
      message: 'System health is currently at 96%. All critical systems are operational. There are 3 minor anomalies that have been detected and are being monitored.'
    };
  }
  
  if (lowerInput.includes('agent') && lowerInput.includes('list')) {
    return {
      type: 'system',
      message: 'Active Agents:\n- Knowledge Engineer (87% efficiency)\n- Data Architect (93% efficiency)\n- Strategic Planner (79% efficiency)\n- Content Curator (82% efficiency)\n\nWould you like to focus on a specific agent?'
    };
  }
  
  if (lowerInput.includes('division') && lowerInput.includes('list')) {
    return {
      type: 'system',
      message: 'Active Divisions:\n- Analytics (90% operational efficiency)\n- Operations (85% operational efficiency)\n- Strategy (93% operational efficiency)\n- Knowledge Base (88% operational efficiency)\n\nWould you like to focus on a specific division?'
    };
  }
  
  if (lowerInput.includes('help') || lowerInput.includes('command')) {
    return {
      type: 'system',
      message: 'Available Commands:\n- "Show insights" - View pending AI insights\n- "Switch to [division/agent] [name]" - Change context\n- "Show system status" - View overall system health\n- "List agents/divisions" - See all active entities\n- "Reset context" - Return to global system view'
    };
  }
  
  // Context-aware default response
  if (activeContext !== 'global' && contextEntity) {
    return {
      type: 'system',
      message: `You're currently focused on ${contextEntity.name} ${contextEntity.type}. You can ask about its performance, status, or take specific actions related to it. Type "help" for available commands.`
    };
  }
  
  return {
    type: 'system',
    message: 'I understand you\'re asking about something, but I\'m not sure how to help with that specific query. You can try commands like "show system status", "list agents", or "show AI insights".'
  };
};
