
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Index from '@/pages/Index';
import Office from '@/pages/Office'; 
import Workflows from '@/pages/Workflows';
import Knowledge from '@/pages/Knowledge';
import Analytics from '@/pages/Analytics';
import Tasks from '@/pages/Tasks';
import Courses from '@/pages/Courses';
import Business from '@/pages/Business';
import NotFound from '@/pages/NotFound';
import PageTransition from '@/components/ui/PageTransition';

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/office" element={<PageTransition><Office /></PageTransition>} /> 
        <Route path="/workflows" element={<PageTransition><Workflows /></PageTransition>} />
        <Route path="/tasks" element={<PageTransition><Tasks /></PageTransition>} />
        <Route path="/knowledge" element={<PageTransition><Knowledge /></PageTransition>} />
        <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
        <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
        <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/budget" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/erp" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/call-center" element={<PageTransition><Business /></PageTransition>} />
        <Route path="/inventory" element={<PageTransition><Business /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
