
import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample data for charts
const performanceData = [
  { name: 'Jan', kb: 65, analytics: 72, operations: 58, strategy: 80 },
  { name: 'Feb', kb: 68, analytics: 75, operations: 62, strategy: 82 },
  { name: 'Mar', kb: 70, analytics: 71, operations: 65, strategy: 81 },
  { name: 'Apr', kb: 75, analytics: 82, operations: 68, strategy: 85 },
  { name: 'May', kb: 82, analytics: 88, operations: 70, strategy: 89 },
  { name: 'Jun', kb: 87, analytics: 85, operations: 75, strategy: 90 },
  { name: 'Jul', kb: 85, analytics: 90, operations: 78, strategy: 88 },
];

const taskCompletionData = [
  { name: 'Mon', completed: 258, assigned: 300 },
  { name: 'Tue', completed: 275, assigned: 320 },
  { name: 'Wed', completed: 290, assigned: 340 },
  { name: 'Thu', completed: 310, assigned: 380 },
  { name: 'Fri', completed: 330, assigned: 390 },
  { name: 'Sat', completed: 120, assigned: 150 },
  { name: 'Sun', completed: 90, assigned: 120 },
];

const divisionDistributionData = [
  { name: 'Knowledge Base', value: 28 },
  { name: 'Analytics', value: 25 },
  { name: 'Operations', value: 22 },
  { name: 'Strategy', value: 18 },
  { name: 'Research', value: 7 },
];

const COLORS = ['#6366f1', '#eab308', '#a855f7', '#3b82f6', '#22c55e'];

const AgencyMetrics: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlassMorphism intensity="low" className="border border-flow-border/30 col-span-full lg:col-span-2 rounded-xl p-4">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-flow-accent text-lg neon-text">
              {t('performanceOverview')}
            </CardTitle>
            <CardDescription className="text-flow-foreground/70">
              {t('agencyPerformance')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(23, 23, 35, 0.9)', borderColor: 'rgba(99, 102, 241, 0.4)', borderRadius: '6px' }} 
                  labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="kb" stroke="#6366f1" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="analytics" stroke="#eab308" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="operations" stroke="#a855f7" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="strategy" stroke="#3b82f6" activeDot={{ r: 8 }} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </GlassMorphism>

      <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-flow-accent text-lg neon-text">
              {t('agencyAchievements')}
            </CardTitle>
            <CardDescription className="text-flow-foreground/70">
              {t('divisionDistribution')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={divisionDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {divisionDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(23, 23, 35, 0.9)', borderColor: 'rgba(99, 102, 241, 0.4)', borderRadius: '6px' }} 
                  labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </GlassMorphism>

      <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4 lg:col-span-2">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-flow-accent text-lg neon-text">
              {t('taskCompletion')}
            </CardTitle>
            <CardDescription className="text-flow-foreground/70">
              {t('weeklyTaskOverview')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={taskCompletionData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(23, 23, 35, 0.9)', borderColor: 'rgba(99, 102, 241, 0.4)', borderRadius: '6px' }} 
                  labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="assigned" fill="rgba(99, 102, 241, 0.3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </GlassMorphism>

      <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4 col-span-full">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-flow-accent text-lg neon-text">
              {t('systemStatus')}
            </CardTitle>
            <CardDescription className="text-flow-foreground/70">
              {t('serverLoad')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorKb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(23, 23, 35, 0.9)', borderColor: 'rgba(99, 102, 241, 0.4)', borderRadius: '6px' }} 
                  labelStyle={{ color: 'rgba(255,255,255,0.9)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="kb" stroke="#6366f1" fillOpacity={1} fill="url(#colorKb)" />
                <Area type="monotone" dataKey="analytics" stroke="#eab308" fillOpacity={1} fill="url(#colorAnalytics)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </GlassMorphism>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
        <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-flow-accent mb-1">98.7%</div>
            <div className="text-xs text-flow-foreground/70">{t('uptime')}</div>
          </div>
        </GlassMorphism>

        <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-1">24</div>
            <div className="text-xs text-flow-foreground/70">{t('activeAgents')}</div>
          </div>
        </GlassMorphism>

        <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-1">87.2%</div>
            <div className="text-xs text-flow-foreground/70">{t('efficiency')}</div>
          </div>
        </GlassMorphism>

        <GlassMorphism intensity="low" className="border border-flow-border/30 rounded-xl p-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">583</div>
            <div className="text-xs text-flow-foreground/70">{t('tasksCompleted')}</div>
          </div>
        </GlassMorphism>
      </div>
    </div>
  );
};

export default AgencyMetrics;
