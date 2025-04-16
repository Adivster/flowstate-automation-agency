
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Save, Download, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { OfficeGrid } from './OfficeGrid';  // Ensure this import is correct
import { SolarpunkWindow } from '@/components/ui/design-system/SolarpunkWindow';
import NewDivisionModal from './division-modal/NewDivisionModal';

interface OfficeControlsProps {
  onAddDivision: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onImport: () => void;
}

export const OfficeControls: React.FC<OfficeControlsProps> = ({
  onAddDivision,
  onSave,
  onLoad,
  onExport,
  onImport
}) => {
  const { toast } = useToast()
  const [isNewDivisionModalOpen, setIsNewDivisionModalOpen] = useState(false);

  const handleCreateDivision = useCallback((data) => {
    toast({
      title: "Division Created",
      description: `${data.name} division has been created successfully.`,
    })
  }, [toast]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="border rounded-md p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Office Controls</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={onSave} variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={onLoad} variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Load
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Division Management</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsNewDivisionModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Division
          </Button>
        </div>
      </div>

      <div className="border rounded-md p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Import / Export</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={onExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={onImport} variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      <Separator />

      <OfficeGrid />

      {/* New Division Modal */}
      <SolarpunkWindow
        open={isNewDivisionModalOpen}
        onClose={() => setIsNewDivisionModalOpen(false)}
        title="Create New Division"
        description="Define a new division within the office."
      >
        <NewDivisionModal
          onClose={() => setIsNewDivisionModalOpen(false)}
          onCreateDivision={handleCreateDivision}
        />
      </SolarpunkWindow>
    </div>
  );
};
