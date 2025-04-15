import { ActionPrompt } from "../useConversationalFlow";

export interface BaseConversationResponse {
  type: 'system';
  message: string;
}

export interface ActionResponse extends BaseConversationResponse {
  actionTaken?: string;
  entityType?: string;
  entityId?: string;
}

export interface InsightResponse extends BaseConversationResponse {
  showInsights: boolean;
  insights: ActionPrompt[];
}

export interface ContextSwitchResponse {
  message: string;
}

export type ConversationResponse = ActionResponse | InsightResponse | BaseConversationResponse | ContextSwitchResponse;

export type CommandHistoryItem = {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp?: Date;
};

// Control panel types
export interface ControlAction {
  id: string;
  label: string;
  icon?: string;
  action: 'optimize' | 'diagnose' | 'reassign' | 'tune' | 'simulate' | 'report';
  entityType?: string;
  entityId?: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface SystemMetric {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
}
