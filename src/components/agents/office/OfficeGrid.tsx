
import React from 'react';
import { Button } from '@/components/ui/button';

export const OfficeGrid: React.FC = () => {
  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-4">Office Layout Grid</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder grid items */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div 
            key={item} 
            className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 flex justify-between items-center"
          >
            <span>Grid Section {item}</span>
            <Button variant="outline" size="sm">View</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
