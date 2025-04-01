
import React, { useState, useEffect } from 'react';
import DataTransmissionPath from './DataTransmissionPath';

export interface DataTransmission {
  id: string | number;
  start: { x: number | string; y: number | string };
  end: { x: number | string; y: number | string };
  color: string;
  temporary?: boolean;
  pulseSpeed?: number;
}

interface DataTransmissionManagerProps {
  transmissions: DataTransmission[];
}

const DataTransmissionManager: React.FC<DataTransmissionManagerProps> = ({ transmissions }) => {
  const [activeTransmissions, setActiveTransmissions] = useState<DataTransmission[]>([]);
  
  useEffect(() => {
    setActiveTransmissions(transmissions);
    
    // Clean up temporary transmissions after their duration
    const temporaryTransmissions = transmissions.filter(t => t.temporary);
    if (temporaryTransmissions.length > 0) {
      const timers = temporaryTransmissions.map(transmission => {
        return setTimeout(() => {
          setActiveTransmissions(prev => 
            prev.filter(t => t.id !== transmission.id)
          );
        }, 4000);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [transmissions]);

  return (
    <>
      {activeTransmissions.map(transmission => (
        <DataTransmissionPath 
          key={transmission.id}
          start={transmission.start}
          end={transmission.end}
          color={transmission.color}
          pulseSpeed={transmission.pulseSpeed || 3 + Math.random() * 3}
        />
      ))}
    </>
  );
};

export default DataTransmissionManager;
