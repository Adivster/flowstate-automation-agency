
import React from 'react';

interface OfficeControlsProps {
  translationFunction: (key: string) => string;
}

const OfficeControls: React.FC<OfficeControlsProps> = ({ translationFunction }) => {
  return (
    <>
      <div className="absolute top-2 left-2 p-1 bg-black/30 backdrop-blur-sm rounded text-xs z-30 text-white">
        Floor Plan v3.1
      </div>
      
      <div className="absolute bottom-3 right-2 p-1 bg-black/30 backdrop-blur-sm rounded text-xs z-30 text-white">
        FlowState Agency
      </div>
    </>
  );
};

export default OfficeControls;
