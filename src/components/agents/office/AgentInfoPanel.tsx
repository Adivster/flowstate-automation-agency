
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Code,
  Copy,
  FileText,
  Link,
  RefreshCw,
  Share2,
  User2,
  Zap,
  BrainCircuit,
  GitBranch,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ListChecks,
  BarChart2,
  SlidersHorizontal,
  LucideIcon,
  LayoutDashboard,
  ListOrdered,
  Wrench,
  Lightbulb
} from 'lucide-react';
import { LineChart } from '@/components/ui/chart';

const AgentInfoPanel = () => {
  // Sample data for the agent info panel
  const agent = {
    id: "agent-1",
    name: "Alex Data",
    avatar: "/placeholder.svg",
    role: "Data Analysis Specialist",
    status: "active",
    efficiency: 87,
    tasks: {
      completed: 42,
      inProgress: 3,
      total: 48
    },
    workstationId: "ws-analytics-3",
    division: "analytics",
    uptime: "3d 7h 23m",
    specialty: "Pattern Recognition",
    skills: ["Data Mining", "Statistical Analysis", "Visualization", "ML Models"],
    currentTask: "Analyzing Q2 Performance Metrics",
    recentActivities: [
      { type: "task", description: "Completed trend analysis for Q1 data", time: "2h ago" },
      { type: "collaboration", description: "Shared insights with Strategic Planning team", time: "4h ago" },
      { type: "system", description: "Optimized data processing algorithm", time: "yesterday" },
      { type: "learning", description: "Acquired new skills in advanced forecasting", time: "2d ago" },
    ],
    performanceMetrics: [
      { metric: "Accuracy", value: 92, change: 3.5, trend: "up" },
      { metric: "Speed", value: 83, change: -1.2, trend: "down" },
      { metric: "Resource Efficiency", value: 78, change: 5.7, trend: "up" },
      { metric: "Learning Rate", value: 95, change: 2.1, trend: "up" },
    ],
    collaborationData: [
      { name: "Jan", value: 12 },
      { name: "Feb", value: 15 },
      { name: "Mar", value: 18 },
      { name: "Apr", value: 20 },
      { name: "May", value: 23 },
      { name: "Jun", value: 19 }
    ]
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <span className="text-green-500 flex items-center"><ArrowRight className="w-3 h-3 rotate-[-45deg]" /></span>;
      case "down":
        return <span className="text-red-500 flex items-center"><ArrowRight className="w-3 h-3 rotate-45deg]" /></span>;
      default:
        return <span className="text-gray-500 flex items-center"><ArrowRight className="w-3 h-3 rotate-0deg]" /></span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "idle":
        return "bg-amber-500";
      case "paused":
        return "bg-purple-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task":
        return <ListChecks className="w-4 h-4 text-blue-500" />;
      case "collaboration":
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case "system":
        return <Wrench className="w-4 h-4 text-purple-500" />;
      case "learning":
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-flow-background/95 border-l border-flow-border shadow-lg backdrop-blur-md overflow-y-auto z-50 custom-scrollbar animate-slide-in-right">
      <div className="p-4">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BrainCircuit className="w-5 h-5 text-flow-accent mr-2" />
            <h2 className="text-lg font-semibold">Agent Details</h2>
          </div>
          <Button variant="ghost" size="icon" className="text-flow-foreground/70 hover:text-flow-foreground">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Agent Identity Card */}
        <Card className="mb-4 bg-flow-card border-flow-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-14 w-14 border-2 border-flow-accent">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="bg-flow-accent/10 text-flow-accent">AD</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">{agent.name}</h3>
                  <div className="flex items-center">
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)} mr-1.5`}></span>
                    <span className="text-xs text-flow-foreground/70 capitalize">{agent.status}</span>
                  </div>
                </div>
                <p className="text-sm text-flow-foreground/70">{agent.role}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs bg-flow-accent/10 border-flow-accent/40 text-flow-accent">
                    {agent.division.charAt(0).toUpperCase() + agent.division.slice(1)}
                  </Badge>
                  <span className="text-xs text-flow-foreground/50 ml-2">ID: {agent.id}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Card className="bg-flow-card border-flow-border">
            <CardContent className="p-3">
              <div className="flex flex-col">
                <span className="text-xs text-flow-foreground/70 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  Tasks Completed
                </span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-semibold">{agent.tasks.completed}</span>
                  <span className="text-xs text-flow-foreground/50">
                    of {agent.tasks.total} ({Math.round((agent.tasks.completed / agent.tasks.total) * 100)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-flow-card border-flow-border">
            <CardContent className="p-3">
              <div className="flex flex-col">
                <span className="text-xs text-flow-foreground/70 flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-purple-500" />
                  Uptime
                </span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-semibold">{agent.uptime.split(' ')[0]}<span className="text-sm">d</span></span>
                  <span className="text-xs text-flow-foreground/50">{agent.uptime.substring(agent.uptime.indexOf(' ') + 1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Efficiency Meter */}
        <Card className="mb-4 bg-flow-card border-flow-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Efficiency Rating</span>
              <span className="text-sm font-semibold">{agent.efficiency}%</span>
            </div>
            <Progress value={agent.efficiency} className="h-2" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-flow-foreground/50">Target: 85%</span>
              <span className="text-xs text-green-500">+3.2% from last week</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Current Task */}
        <Card className="mb-4 bg-flow-card border-flow-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Task</span>
              <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-400/30">In Progress</Badge>
            </div>
            <p className="text-sm mb-2">{agent.currentTask}</p>
            <div className="flex justify-between text-xs text-flow-foreground/70">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Started 4h ago
              </span>
              <span className="flex items-center">
                <BarChart2 className="h-3 w-3 mr-1" />
                65% complete
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Additional Info */}
        <div className="border-b border-flow-border mb-4">
          <div className="flex space-x-4">
            <button className="pb-2 text-sm font-medium border-b-2 border-flow-accent text-flow-accent">Performance</button>
            <button className="pb-2 text-sm font-medium text-flow-foreground/70">Skills</button>
            <button className="pb-2 text-sm font-medium text-flow-foreground/70">History</button>
            <button className="pb-2 text-sm font-medium text-flow-foreground/70">Settings</button>
          </div>
        </div>
        
        {/* Performance Section */}
        <div>
          <h4 className="text-sm font-medium mb-3">Performance Metrics</h4>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {agent.performanceMetrics.map((metric, index) => (
              <Card key={index} className="bg-flow-card border-flow-border">
                <CardContent className="p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-flow-foreground/70">{metric.metric}</span>
                    <div className="flex items-end justify-between">
                      <span className="text-xl font-semibold">{metric.value}%</span>
                      <span className={`text-xs flex items-center ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {getTrendIcon(metric.trend)}
                        {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Collaboration Chart */}
          <Card className="mb-4 bg-flow-card border-flow-border">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Collaboration Activity</CardTitle>
              <CardDescription className="text-xs text-flow-foreground/70">Interactions with other agents</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <LineChart 
                data={agent.collaborationData}
                lineColor="#8b5cf6"
                height={120}
                showArea={true}
                areaOpacity={0.2}
                referenceLineY={null}
                referenceLineLabel=""
                domain={null}
                onClick={() => {}}
              />
            </CardContent>
          </Card>
          
          {/* Recent Activities */}
          <h4 className="text-sm font-medium mb-3">Recent Activities</h4>
          <Card className="bg-flow-card border-flow-border">
            <CardContent className="p-0">
              <div className="divide-y divide-flow-border">
                {agent.recentActivities.map((activity, index) => (
                  <div key={index} className="p-3 flex items-start">
                    <div className="mt-0.5 mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{activity.description}</p>
                      <span className="text-xs text-flow-foreground/50">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Skills Section */}
          <h4 className="text-sm font-medium mt-4 mb-3">Skills & Specialties</h4>
          <Card className="bg-flow-card border-flow-border mb-6">
            <CardContent className="p-4">
              <div className="mb-3">
                <span className="text-xs text-flow-foreground/70">Primary Specialty</span>
                <div className="flex items-center mt-1">
                  <BrainCircuit className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="font-medium">{agent.specialty}</span>
                </div>
              </div>
              <Separator className="my-3 bg-flow-border/50" />
              <div>
                <span className="text-xs text-flow-foreground/70 mb-2 block">Skill Set</span>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-flow-background border border-flow-border">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 mb-6">
            <Button variant="default" className="flex-1 text-sm h-9">
              <MessageSquare className="w-4 h-4 mr-2" /> Contact
            </Button>
            <Button variant="outline" className="flex-1 text-sm h-9">
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Configure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentInfoPanel;
