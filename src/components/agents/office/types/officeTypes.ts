
import { LucideIcon } from 'lucide-react';

export interface DivisionData {
  id: string;
  name: string;
  color: string;
  icon: any;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  agents: number;
  tasks: number;
  decoration: Array<{
    type: string;
    x: number;
    y: number;
  }>;
}

export interface Division {
  id: string;
  name: string;
  icon: LucideIcon;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  zIndex?: number;
}

export interface WorkstationData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  type: string;
}

export interface DecorativeElement {
  type: string;
  x: number;
  y: number;
  size: number | string;
}

export interface HologramData {
  type: string;
  x: number;
  y: number;
  size: number | string;
}

export interface AgentData {
  id: number;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'paused' | 'error';
  icon: any;
  division: string;
  position: {
    x: number;
    y: number;
  };
  route: Array<{
    division: string;
    x: number;
    y: number;
  }>;
  mood?: AgentMood;
  workload?: number; // 0-100 percentage
  zIndex?: number;
  performanceData?: number[]; // Performance history data for charts
  efficiency?: number; // Efficiency percentage
  currentTask?: {
    type: 'reading' | 'analyzing' | 'experimenting' | 'emailing' | 'writing' | 'searching' | 'coding';
    description: string;
  };
}

export type AgentMood = 
  | 'optimal' 
  | 'focused'
  | 'learning'
  | 'overwhelmed'
  | 'underutilized'
  | 'frustrated'
  | 'confused';

export interface DivisionPosition {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface DivisionDecorationData {
  type: string;
  x: number;
  y: number;
  divisionId?: string;
}

// For division style types
export interface DivisionStyle {
  bg: string;
  border: string;
  shadow: string;
  text: string;
  glow: string;
  pattern: string;
}

// Workflow types
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  progress: number; // 0-100
  divisionId: string;
  steps: WorkflowStep[];
  createdAt: string;
  updatedAt: string;
  assignedAgentIds: number[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  order: number;
  dependsOn?: string[]; // IDs of steps that must be completed before this one
  assignedAgentIds?: number[];
  estimatedHours?: number;
  actualHours?: number;
}

export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'completed' | 'failed';

// Z-index layers for proper stacking
export enum ZIndexLayers {
  BACKGROUND = 5,
  GRID = 10,
  WORKSTATION = 20,
  DIVISION = 30,
  DIVISION_HOVERED = 35,
  DIVISION_SELECTED = 40,
  DIVISION_DRAGGING = 45,
  DECORATION = 46, 
  AGENT = 50,
  AGENT_SELECTED = 55,
  DATA_PATH = 60,
  NOTIFICATION = 70,
  UI_CONTROLS = 100
}
