
import React, { useState } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';
import Navigation from './components/Navigation';
import AirQuality from './components/AirQuality';
import Profile from './components/Profile';
import ChatPage from './components/ChatOverlay'; // Renamed import, file content updated
import { ViewState, BotStatus, Task, TaskStatus } from './types';
import { MOCK_TASKS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN);
  const [botStatus, setBotStatus] = useState<BotStatus>(BotStatus.IDLE);
  // Removed isChatOpen state as Chat is now a ViewState
  
  // Lift tasks state to manage status updates
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  // Handlers
  const handleLogin = () => {
    setCurrentView(ViewState.HOME);
  };

  const handleLogout = () => {
    setCurrentView(ViewState.LOGIN);
  };

  const handleStartNav = () => {
    setBotStatus(BotStatus.NAVIGATING);
    setCurrentView(ViewState.MAP);
  };

  const handleNavigationComplete = () => {
    // Find the currently ACTIVE task and change it to IN_PROGRESS
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.status === TaskStatus.ACTIVE) {
        return { ...task, status: TaskStatus.IN_PROGRESS };
      }
      return task;
    }));
  };

  // View Router
  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home tasks={tasks} onNavigate={handleStartNav} />;
      case ViewState.MAP:
        return (
          <Navigation 
            botStatus={botStatus} 
            setBotStatus={setBotStatus} 
            onNavigationComplete={handleNavigationComplete}
          />
        );
      case ViewState.AIR:
        return <AirQuality />;
      case ViewState.PROFILE:
        return <Profile onLogout={handleLogout} />;
      case ViewState.CHAT:
        return <ChatPage onBack={() => setCurrentView(ViewState.HOME)} />;
      default:
        return <Home tasks={tasks} onNavigate={handleStartNav} />;
    }
  };

  if (currentView === ViewState.LOGIN) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      setView={setCurrentView}
      onOpenChat={() => setCurrentView(ViewState.CHAT)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
