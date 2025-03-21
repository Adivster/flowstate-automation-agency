
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User, Award, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const CoursesList: React.FC = () => {
  const { t } = useLanguage();
  
  const courses = [
    {
      id: 1,
      title: 'Introduction to AI Agencies',
      description: 'Learn the fundamentals of AI-powered business automation and how to set up your first agency.',
      level: 'beginner',
      duration: '3 hours',
      modules: 7,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: true
    },
    {
      id: 2,
      title: 'Advanced Workflow Automation',
      description: 'Take your automation to the next level with complex workflows and integrations.',
      level: 'intermediate',
      duration: '5 hours',
      modules: 12,
      image: 'https://images.unsplash.com/photo-1648203847710-88eba909902f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false
    },
    {
      id: 3,
      title: 'AI Agent Development',
      description: 'Create and customize your own AI agents to handle specific business tasks.',
      level: 'advanced',
      duration: '8 hours',
      modules: 15,
      image: 'https://images.unsplash.com/photo-1677442340913-7058d395ec12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: true
    },
    {
      id: 4,
      title: 'Knowledge Base Design & Management',
      description: 'Build and maintain an effective knowledge base for your organization.',
      level: 'intermediate',
      duration: '4 hours',
      modules: 9,
      image: 'https://images.unsplash.com/photo-1677442333574-e52e6529bcc4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false
    },
    {
      id: 5,
      title: 'Business Analytics with FlowState',
      description: 'Leverage AI-powered analytics to gain meaningful business insights.',
      level: 'intermediate',
      duration: '6 hours',
      modules: 10,
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false
    },
    {
      id: 6,
      title: 'Enterprise AI Strategy',
      description: 'Develop a comprehensive AI strategy for large organizations.',
      level: 'advanced',
      duration: '10 hours',
      modules: 18,
      image: 'https://images.unsplash.com/photo-1677442335684-e6258be07152?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: false
    }
  ];
  
  const levelColors = {
    beginner: 'bg-green-500/20 text-green-300',
    intermediate: 'bg-blue-500/20 text-blue-300',
    advanced: 'bg-purple-500/20 text-purple-300'
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-lg">
            <Award className="h-8 w-8 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Pro Academy</h3>
            <p className="text-flow-foreground/70 mb-4">
              Master AI agency management with expert-led courses. Unlock your full potential with our comprehensive training.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">20+ Courses</Badge>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">Certification</Badge>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20">Live Workshops</Badge>
            </div>
          </div>
          <Button className="bg-indigo-500 hover:bg-indigo-600 whitespace-nowrap">
            View All Courses
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:border-flow-accent/50 h-full flex flex-col">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {course.popular && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-flow-foreground/70 mb-4">{course.description}</p>
                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-2 text-xs text-flow-foreground/70">
                    <Badge className={`text-xs ${levelColors[course.level as keyof typeof levelColors]}`}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.modules} modules
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-flow-accent/50 text-flow-accent hover:bg-flow-accent/10"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button className="bg-indigo-500 hover:bg-indigo-600">
          View All Courses
        </Button>
      </div>
    </div>
  );
};

export default CoursesList;
