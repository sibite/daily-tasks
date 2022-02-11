import React from 'react';
import './App.scss';
import Today from './components/Day/Day';
import Navigation from './components/Layout/Navigation';
import DaysContextProvider from './store/DaysContextProvider';
import TasksContextProvider from './store/TasksContextProvider';
import './styles/colors.scss';

const App: React.FC = () => (
  <TasksContextProvider>
    <DaysContextProvider>
      <Navigation />
      <Today />
    </DaysContextProvider>
  </TasksContextProvider>
);
export default App;
