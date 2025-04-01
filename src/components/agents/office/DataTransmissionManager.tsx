
import React from 'react';
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
  return (
    <>
      {transmissions.map(transmission => (
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
