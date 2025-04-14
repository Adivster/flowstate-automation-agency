
import React from 'react';
import { Card } from '@/components/ui/card';
import { CircleCheck, CirclePause, CircleAlert, Calendar, Clock, ClipboardList } from 'lucide-react';
import { Chart } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

interface TaskSummaryProps {
  taskCounts: {
    total: number;
    inProgress: number;
    completed: number;
    paused: number;
    failed: number;
    dueToday: number;
  }
}

const TaskSummary: React.FC<TaskSummaryProps> = ({ taskCounts }) => {
  // Calculate percentage for progress bars
  const completionRate = taskCounts.total > 0 
    ? Math.round((taskCounts.completed / taskCounts.total) * 100) 
    : 0;
  
  // Data for small donut chart
  const statusData = [
    { name: 'In Progress', value: taskCounts.inProgress, color: '#3b82f6' },
    { name: 'Completed', value: taskCounts.completed, color: '#10b981' },
    { name: 'Paused', value: taskCounts.paused, color: '#f59e0b' },
    { name: 'Failed', value: taskCounts.failed, color: '#ef4444' },
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-5 border-flow-border/30 bg-flow-card/30 backdrop-blur-md hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-flow-foreground/80">Task Completion</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-semibold">{completionRate}%</h3>
              <p className="text-xs text-flow-foreground/60">{taskCounts.completed}/{taskCounts.total}</p>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <CircleCheck className="h-6 w-6 text-green-500" />
          </div>
        </div>
        
        <Progress 
          value={completionRate}
          indicatorColor="#10b981" 
          className="h-2 mt-4"
        />
      </Card>
      
      <Card className="p-5 border-flow-border/30 bg-flow-card/30 backdrop-blur-md hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-flow-foreground/80">In Progress</p>
            <h3 className="text-2xl font-semibold">{taskCounts.inProgress}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-flow-foreground/60">Active Tasks</span>
              <span className="text-flow-foreground/70 font-medium">{Math.round((taskCounts.inProgress / taskCounts.total) * 100)}%</span>
            </div>
            <Progress 
              value={taskCounts.inProgress / taskCounts.total * 100}
              indicatorColor="#3b82f6" 
              className="h-2"
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-5 border-flow-border/30 bg-flow-card/30 backdrop-blur-md hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-flow-foreground/80">Status Overview</p>
            <h3 className="text-2xl font-semibold">{taskCounts.total}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-purple-500" />
          </div>
        </div>
        
        <div className="h-16 mt-2">
          {taskCounts.total > 0 ? (
            <Chart
              data={statusData}
              type="pie"
              height={60}
              donut={true}
              outerRadius={30}
              showLabel={false}
              showLegend={false}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-flow-foreground/50">
              No tasks yet
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-5 border-flow-border/30 bg-flow-card/30 backdrop-blur-md hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-flow-foreground/80">Due Today</p>
            <h3 className="text-2xl font-semibold">{taskCounts.dueToday}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-amber-500" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-flow-foreground/60">Needs Attention</span>
              <span className="text-flow-foreground/70 font-medium">{taskCounts.failed}</span>
            </div>
            <div className="bg-flow-border/20 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full"
                style={{ width: `${(taskCounts.failed / taskCounts.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskSummary;
