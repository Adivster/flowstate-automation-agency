
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
  size: number;
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
  zIndex?: number;
}

export interface DivisionPosition {
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

// Z-index layers for proper stacking
export enum ZIndexLayers {
  BACKGROUND = 5,
  GRID = 10,
  WORKSTATION = 20,
  DIVISION = 30,
  DIVISION_HOVERED = 35,
  DIVISION_SELECTED = 40,
  DECORATION = 45, 
  AGENT = 50,
  AGENT_SELECTED = 55,
  DATA_PATH = 60,
  NOTIFICATION = 70,
  UI_CONTROLS = 100
}
