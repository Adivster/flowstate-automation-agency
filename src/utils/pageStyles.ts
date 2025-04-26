
import { type VariantProps } from "class-variance-authority";

export type PageVariant = 'tasks' | 'insights' | 'analytics' | 'knowledge' | 'agents' | 'office' | 'courses' | 'default' | 'dashboard' | 'workflows' | 'business';

interface PageStyle {
  gradient: string;
  border: string;
  glow: string;
  accent: string;
  icon: string;
}

export const getPageStyles = (variant: PageVariant = 'default'): PageStyle => {
  switch (variant) {
    case 'tasks':
      return {
        gradient: 'from-indigo-950/50 to-purple-900/30',
        border: 'border-indigo-500/30',
        glow: 'shadow-indigo-500/20',
        accent: 'bg-indigo-500/20 border-indigo-500/30 hover:bg-indigo-500/30 text-indigo-400',
        icon: 'text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]'
      };
    case 'insights':
      return {
        gradient: 'from-cyan-950/50 to-blue-900/30',
        border: 'border-cyan-500/30',
        glow: 'shadow-cyan-500/20',
        accent: 'bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-500/30 text-cyan-400',
        icon: 'text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]'
      };
    case 'analytics':
      return {
        gradient: 'from-purple-950/50 to-fuchsia-900/30',
        border: 'border-purple-500/30',
        glow: 'shadow-purple-500/20',
        accent: 'bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 text-purple-400',
        icon: 'text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]'
      };
    case 'knowledge':
      return {
        gradient: 'from-amber-950/50 to-yellow-900/30',
        border: 'border-amber-500/30',
        glow: 'shadow-amber-500/20',
        accent: 'bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30 text-amber-400',
        icon: 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]'
      };
    case 'agents':
      return {
        gradient: 'from-emerald-950/50 to-green-900/30',
        border: 'border-emerald-500/30',
        glow: 'shadow-emerald-500/20',
        accent: 'bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-400',
        icon: 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]'
      };
    case 'office':
      return {
        gradient: 'from-pink-950/50 to-rose-900/30',
        border: 'border-pink-500/30',
        glow: 'shadow-pink-500/20',
        accent: 'bg-pink-500/20 border-pink-500/30 hover:bg-pink-500/30 text-pink-400',
        icon: 'text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]'
      };
    case 'courses':
      return {
        gradient: 'from-orange-950/50 to-red-900/30',
        border: 'border-orange-500/30',
        glow: 'shadow-orange-500/20',
        accent: 'bg-orange-500/20 border-orange-500/30 hover:bg-orange-500/30 text-orange-400',
        icon: 'text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]'
      };
    case 'dashboard':
      return {
        gradient: 'from-blue-950/50 to-violet-900/30',
        border: 'border-blue-500/30',
        glow: 'shadow-blue-500/20',
        accent: 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30 text-blue-400',
        icon: 'text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]'
      };
    case 'workflows':
      return {
        gradient: 'from-orange-950/50 to-red-900/30',
        border: 'border-orange-500/30',
        glow: 'shadow-orange-500/20',
        accent: 'bg-orange-500/20 border-orange-500/30 hover:bg-orange-500/30 text-orange-400',
        icon: 'text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]'
      };
    case 'business':
      return {
        gradient: 'from-amber-950/50 to-yellow-900/30',
        border: 'border-amber-500/30',
        glow: 'shadow-amber-500/20',
        accent: 'bg-amber-500/20 border-amber-500/30 hover:bg-amber-500/30 text-amber-400',
        icon: 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]'
      };
    default:
      return {
        gradient: 'from-gray-950/50 to-slate-900/30',
        border: 'border-gray-500/30',
        glow: 'shadow-gray-500/20',
        accent: 'bg-gray-500/20 border-gray-500/30 hover:bg-gray-500/30 text-gray-400',
        icon: 'text-gray-400 drop-shadow-[0_0_15px_rgba(107,114,128,0.5)]'
      };
  }
};
