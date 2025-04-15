
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Office from '@/pages/Office'; // Changed from Agents
import Workflows from '@/pages/Workflows';
import Knowledge from '@/pages/Knowledge';
import Analytics from '@/pages/Analytics';
import Tasks from '@/pages/Tasks';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/office" element={<Office />} /> // Changed from "/agents"
      <Route path="/workflows" element={<Workflows />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/knowledge" element={<Knowledge />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
