
import React from 'react';
import { MessageCircle, Terminal } from 'lucide-react';

interface OfficeControlsProps {
  translationFunction: (key: string) => string;
}

const OfficeControls: React.FC<OfficeControlsProps> = ({ translationFunction }) => {
  return (
    <>
      <div className="absolute top-2 left-2 p-1 bg-black/30 backdrop-blur-sm rounded text-xs z-30 text-white">
        Floor Plan v3.0
      </div>
      
      <div className="absolute bottom-3 right-2 p-1 bg-black/30 backdrop-blur-sm rounded text-xs z-30 text-white">
        FlowState Agency
      </div>
      
      <div className="flex justify-end items-center absolute bottom-3 left-2 z-30 space-x-2">
        <button 
          className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent('openCommunicationTerminal'))}
        >
          <MessageCircle className="h-3 w-3" />
          {translationFunction('openChat')}
        </button>
        
        <button 
          className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent('openCommandTerminal'))}
        >
          <Terminal className="h-3 w-3" />
          {translationFunction('terminal')}
        </button>
      </div>
    </>
  );
};

export default OfficeControls;
