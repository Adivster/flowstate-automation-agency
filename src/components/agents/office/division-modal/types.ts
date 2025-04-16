
import { type LucideIcon } from 'lucide-react';

export interface ColorOption {
  name: string;
  bg: string;
  border: string;
  text: string;
  primary: string;
  secondary: string;
}

export interface DivisionFormState {
  name: string;
  description: string;
  iconKey: keyof typeof import('lucide-react');
  color: string;
}

export interface NewDivisionData {
  id: string;
  name: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
