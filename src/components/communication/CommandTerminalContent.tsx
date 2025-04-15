
import React, { useRef, useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { CommandHistoryItem } from './types/conversationTypes';
import AIControlPanel from './AIControlPanel';
import { ControlAction, SystemMetric } from './types/conversationTypes';

interface CommandTerminalContentProps {
  commandHistory: CommandHistoryItem[];
  command: string;
  setCommand: (cmd: string) => void;
  handleCommand: (e: React.FormEvent) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearTerminal: () => void;
}

const CommandTerminalContent: React.FC<CommandTerminalContentProps> = ({
  commandHistory,
  command,
  setCommand,
  handleCommand,
  handleKeyPress,
  clearTerminal
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isControlPanelExpanded, setIsControlPanelExpanded] = useState(true);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Generate system metrics for command terminal
  const generateSystemMetrics = (): SystemMetric[] => {
    return [
      {
        id: 'metric-1',
        label: 'CPU Load',
        value: 42,
        previousValue: 38, 
        unit: '%',
        trend: 'up',
        status: 'normal'
      },
      {
        id: 'metric-2',
        label: 'Memory Usage',
        value: 68,
        previousValue: 65,
        unit: '%', 
        trend: 'up',
        status: 'normal'
      },
      {
        id: 'metric-3',
        label: 'Network I/O',
        value: 12.4,
        previousValue: 10.8,
        unit: 'MB/s',
        trend: 'up',
        status: 'normal'
      },
      {
        id: 'metric-4',
        label: 'Disk Usage',
        value: 54,
        previousValue: 53.9,
        unit: '%',
        trend: 'up',
        status: 'normal'
      }
    ];
  };

  // Generate quick actions for command terminal
  const generateQuickActions = (): ControlAction[] => {
    return [
      {
        id: 'cmd-action-1',
        label: 'Clear Terminal',
        icon: 'refresh',
        action: 'optimize',
        severity: 'low',
      },
      {
        id: 'cmd-action-2',
        label: 'System Status',
        icon: 'chart',
        action: 'diagnose',
        severity: 'low',
      },
      {
        id: 'cmd-action-3',
        label: 'List Agents',
        icon: 'users',
        action: 'report',
        severity: 'low',
      },
      {
        id: 'cmd-action-4',
        label: 'List Divisions',
        icon: 'chart',
        action: 'report',
        severity: 'low',
      }
    ];
  };

  const handleExecuteAction = (actionId: string) => {
    if (actionId === 'cmd-action-1') {
      clearTerminal();
    } else if (actionId === 'cmd-action-2') {
      setCommand('status');
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
      }, 100);
    } else if (actionId === 'cmd-action-3') {
      setCommand('list agents');
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
      }, 100);
    } else if (actionId === 'cmd-action-4') {
      setCommand('list divisions');
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
      }, 100);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col h-full">
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-3 text-sm font-mono custom-scrollbar scan-lines bg-black/60 backdrop-blur-lg"
        >
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'input' && (
                <div className="flex">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  <span className="text-indigo-100">{entry.content}</span>
                </div>
              )}
              
              {entry.type === 'output' && (
                <div className="text-cyan-300 pl-4 whitespace-pre-wrap">{entry.content}</div>
              )}
              
              {entry.type === 'error' && (
                <div className="text-red-400 pl-4">{entry.content}</div>
              )}
              
              {entry.type === 'system' && (
                <div className="text-amber-300 italic">{entry.content}</div>
              )}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleCommand} className="p-2 border-t border-indigo-500/30 bg-black/70">
          <div className="flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-indigo-100"
              placeholder="Type command..."
              aria-label="Command input"
            />
          </div>
        </form>
      </div>

      {/* AI Control Panel - Now positioned on the right side for command terminal too */}
      <div className="w-64 border-l border-indigo-500/30 bg-gray-900/80 backdrop-blur-md">
        <AIControlPanel
          activeContext="global"
          contextEntity={null}
          quickActions={generateQuickActions()}
          systemMetrics={generateSystemMetrics()}
          onExecuteAction={handleExecuteAction}
          isExpanded={isControlPanelExpanded}
          setIsExpanded={setIsControlPanelExpanded}
        />
      </div>
    </div>
  );
};

export default CommandTerminalContent;
