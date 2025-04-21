
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OfficeZoomControlsProps {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetZoom: () => void;
  isDark: boolean;
}

const OfficeZoomControls = ({
  handleZoomIn,
  handleZoomOut,
  handleResetZoom,
  isDark
}: OfficeZoomControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "p-1 h-8 w-8 rounded-full",
          isDark 
            ? "bg-gray-800/70 border-gray-700 hover:bg-gray-700" 
            : "bg-white/70 border-gray-200 hover:bg-gray-50"
        )}
        onClick={handleZoomOut}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 12h14" />
        </svg>
        <span className="sr-only">Zoom Out</span>
      </Button>
      
      <Button 
        variant="outline"
        size="sm" 
        className={cn(
          "p-1 h-8 w-8 rounded-full",
          isDark 
            ? "bg-gray-800/70 border-gray-700 hover:bg-gray-700" 
            : "bg-white/70 border-gray-200 hover:bg-gray-50"
        )}
        onClick={handleResetZoom}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M21 21a9 9 0 0 0-9-9 9 9 0 0 0-9 9" />
          <path d="M12 12V3" />
        </svg>
        <span className="sr-only">Reset Zoom</span>
      </Button>
      
      <Button 
        variant="outline"
        size="sm" 
        className={cn(
          "p-1 h-8 w-8 rounded-full",
          isDark 
            ? "bg-gray-800/70 border-gray-700 hover:bg-gray-700" 
            : "bg-white/70 border-gray-200 hover:bg-gray-50"
        )}
        onClick={handleZoomIn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <span className="sr-only">Zoom In</span>
      </Button>
    </div>
  );
};

export default OfficeZoomControls;
