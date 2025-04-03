
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle, Award, ArrowRight, Search, Filter, Star, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassMorphism } from '@/components/ui/GlassMorphism';

const CoursesList: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  
  const courses = [
    {
      id: 1,
      title: 'Introduction to AI Agencies',
      description: 'Learn the fundamentals of AI-powered business automation and how to set up your first agency.',
      level: 'beginner',
      duration: '3 hours',
      modules: 7,
      image: 'https://images.unsplash.com/photo-1677442340913-7058d395ec12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: true,
      students: 1245,
      rating: 4.8,
      category: 'basics'
    },
    {
      id: 2,
      title: 'Advanced Workflow Automation',
      description: 'Take your automation to the next level with complex workflows and integrations.',
      level: 'intermediate',
      duration: '5 hours',
      modules: 12,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false,
      students: 842,
      rating: 4.6,
      category: 'automation'
    },
    {
      id: 3,
      title: 'AI Agent Development',
      description: 'Create and customize your own AI agents to handle specific business tasks.',
      level: 'advanced',
      duration: '8 hours',
      modules: 15,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: true,
      students: 937,
      rating: 4.9,
      category: 'development'
    },
    {
      id: 4,
      title: 'Knowledge Base Design & Management',
      description: 'Build and maintain an effective knowledge base for your organization.',
      level: 'intermediate',
      duration: '4 hours',
      modules: 9,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false,
      students: 624,
      rating: 4.5,
      category: 'management'
    },
    {
      id: 5,
      title: 'Business Analytics with FlowState',
      description: 'Leverage AI-powered analytics to gain meaningful business insights.',
      level: 'intermediate',
      duration: '6 hours',
      modules: 10,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false,
      students: 753,
      rating: 4.7,
      category: 'analytics'
    },
    {
      id: 6,
      title: 'Enterprise AI Strategy',
      description: 'Develop a comprehensive AI strategy for large organizations.',
      level: 'advanced',
      duration: '10 hours',
      modules: 18,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false,
      students: 489,
      rating: 4.8,
      category: 'strategy'
    }
  ];
  
  const levelColors = {
    beginner: {
      bg: 'bg-green-500/20',
      text: 'text-green-300',
      border: 'border-green-500/40',
      glow: 'hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]'
    },
    intermediate: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-300',
      border: 'border-blue-500/40',
      glow: 'hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]'
    },
    advanced: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-300',
      border: 'border-purple-500/40',
      glow: 'hover:shadow-[0_0_10px_rgba(139,92,246,0.5)]'
    }
  };
  
  const filteredCourses = filter === 'all' 
    ? courses 
    : filter === 'popular' 
      ? courses.filter(course => course.popular)
      : courses.filter(course => course.level === filter);
  
  return (
    <div className="space-y-6">
      {/* Featured Course */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-xl p-6 mb-8 overflow-hidden relative"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/80 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Master AI Academy" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute bottom-3 left-3 z-10">
              <Badge variant="outline" className="bg-flow-accent/20 text-flow-accent hover:bg-flow-accent/30 backdrop-blur-sm">Premium Course</Badge>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-amber-400" />
              <h3 className="text-xl font-semibold neon-text-blue">Master AI Academy</h3>
            </div>
            
            <p className="text-flow-foreground/80 mb-4">
              The complete AI agency management course bundle. Access all premium courses, workshops, and certifications.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs bg-flow-background/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span>40+ Courses</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-flow-background/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <Clock className="h-3 w-3 text-blue-400" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-flow-background/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <Users className="h-3 w-3 text-amber-400" />
                <span>3,500+ Students</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-flow-background/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="h-3 w-3 text-amber-400" />
                <span>4.9 Rating</span>
              </div>
            </div>
            
            <Button className="bg-indigo-500 hover:bg-indigo-600 neon-border-blue">
              Explore Bundle
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </motion.div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-flow-foreground/50" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full bg-flow-muted/30 border border-flow-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-flow-accent focus:border-flow-accent transition-colors"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-flow-accent hover:bg-flow-accent/90' : ''}
          >
            All
          </Button>
          <Button
            variant={filter === 'popular' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('popular')}
            className={filter === 'popular' ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            Popular
          </Button>
          <Button
            variant={filter === 'beginner' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('beginner')}
            className={filter === 'beginner' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            Beginner
          </Button>
          <Button
            variant={filter === 'intermediate' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('intermediate')}
            className={filter === 'intermediate' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            Intermediate
          </Button>
          <Button
            variant={filter === 'advanced' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('advanced')}
            className={filter === 'advanced' ? 'bg-purple-500 hover:bg-purple-600' : ''}
          >
            Advanced
          </Button>
        </div>
      </div>
      
      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`overflow-hidden transition-all duration-300 bg-flow-card/30 backdrop-blur-sm border-flow-border/50 hover:border-${course.level === 'beginner' ? 'green' : course.level === 'intermediate' ? 'blue' : 'purple'}-500/50 ${levelColors[course.level as keyof typeof levelColors].glow} h-full flex flex-col`}>
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-flow-background/80 to-transparent z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    // Fallback image if the original one fails to load
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                  }}
                />
                {course.popular && (
                  <div className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse-subtle">
                    Popular
                  </div>
                )}
                <div className="absolute top-3 left-3 z-20">
                  <Badge 
                    className={`text-xs ${levelColors[course.level as keyof typeof levelColors].bg} ${levelColors[course.level as keyof typeof levelColors].text} border ${levelColors[course.level as keyof typeof levelColors].border}`}
                  >
                    {course.level}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold mb-2 group-hover:text-flow-accent transition-colors">{course.title}</h3>
                <p className="text-sm text-flow-foreground/70 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-flow-foreground/70">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.modules} modules
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(course.rating) ? "text-amber-400" : "text-gray-400"}`} fill={i < Math.floor(course.rating) ? "#f59e0b" : "none"} />
                        ))}
                      </div>
                      <span className="text-xs text-flow-foreground/70">{course.rating}</span>
                    </div>
                    <div className="text-xs text-flow-foreground/70">
                      {course.students.toLocaleString()} students
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-flow-accent/50 text-flow-accent hover:bg-flow-accent/10 group"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Bottom CTA */}
      <GlassMorphism className="rounded-xl p-6 mt-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-30"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-2 neon-text">Ready to unlock your AI potential?</h3>
          <p className="text-flow-foreground/70 mb-4 max-w-2xl mx-auto">
            Join thousands of professionals mastering AI agency management. Start your learning journey today.
          </p>
          <Button size="lg" className="bg-flow-accent hover:bg-flow-accent/90 neon-border">
            Browse All Courses 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </GlassMorphism>
    </div>
  );
};

export default CoursesList;
