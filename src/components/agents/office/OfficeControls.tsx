
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface OfficeControlsProps {
  translationFunction: (key: string) => string;
}

const OfficeControls: React.FC<OfficeControlsProps> = ({ translationFunction }) => {
  return (
    <>
      <div className="absolute top-2 left-2 p-1 bg-gray-300/50 dark:bg-gray-700/50 backdrop-blur-sm rounded text-xs z-30">
        Floor Plan v3.0
      </div>
      
      <div className="absolute bottom-3 right-2 p-1 bg-gray-300/50 dark:bg-gray-700/50 backdrop-blur-sm rounded text-xs z-30">
        FlowState Agency
      </div>
      
      <div className="flex justify-end items-center absolute bottom-3 left-2 z-30">
        <button 
          className="text-xs flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent('openCommunicationTerminal'))}
        >
          <MessageCircle className="h-3 w-3" />
          {translationFunction('openChat')}
        </button>
      </div>
    </>
  );
};

export default OfficeControls;
