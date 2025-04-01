
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

export interface WorkstationData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  type: string;
}

export interface DecorationData {
  type: string;
  x: number;
  y: number;
  size: string;
}

export interface HologramData {
  type: string;
  x: number;
  y: number;
  size: string;
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
}
