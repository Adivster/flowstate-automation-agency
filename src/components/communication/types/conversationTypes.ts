
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
