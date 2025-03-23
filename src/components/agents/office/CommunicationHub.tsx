
import React from 'react';
import { MessageCircle } from 'lucide-react';

const CommunicationHub: React.FC = () => {
  return (
    <div className="absolute right-[15%] top-[15%] w-8 h-8 rounded-full bg-indigo-900 border border-indigo-500/70 flex items-center justify-center z-20">
      <MessageCircle className="w-4 h-4 text-indigo-400" />
      <div className="absolute inset-0 rounded-full border border-indigo-400 animate-ping opacity-50"></div>
    </div>
  );
};

export default CommunicationHub;
