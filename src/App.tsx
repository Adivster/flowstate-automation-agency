
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Index from '@/pages/Index';
import Agents from '@/pages/Agents';
import TasksAndFlows from '@/pages/TasksAndFlows';
import Knowledge from '@/pages/Knowledge';
import Insights from '@/pages/Insights';
import Courses from '@/pages/Courses';
import Performance from '@/pages/Performance';
import NotFound from '@/pages/NotFound';
import PageTransition from '@/components/ui/PageTransition';
import CommunicationTerminal from '@/components/communication/CommunicationTerminal';

function App() {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/agents" element={<PageTransition><Agents /></PageTransition>} /> 
          <Route path="/tasks-flows" element={<PageTransition><TasksAndFlows /></PageTransition>} />
          <Route path="/knowledge" element={<PageTransition><Knowledge /></PageTransition>} />
          <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
          <Route path="/insights" element={<PageTransition><Insights /></PageTransition>} />
          <Route path="/performance" element={<PageTransition><Performance /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      
      {/* Fixed position communication terminal */}
      <div className="fixed bottom-4 left-4 z-50">
        <CommunicationTerminal />
      </div>
    </>
  );
}

export default App;
