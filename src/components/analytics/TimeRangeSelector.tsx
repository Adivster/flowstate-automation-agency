
import React from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TimeRangeSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center bg-flow-background/30 border border-flow-border/30 p-1.5 rounded-lg gap-2">
      <CalendarDays className="h-4 w-4 text-flow-foreground/70" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="border-0 bg-transparent w-[150px] h-8 focus:ring-0 p-0">
          <SelectValue placeholder="Select a time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="quarter">Last quarter</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeRangeSelector;
