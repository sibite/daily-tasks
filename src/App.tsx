import React from 'react';
import './App.scss';
import './colors.scss';
import Navigation from './components/Layout/Navigation';
import Today from './components/Today/Day';
import TasksContextProvider from './store/TasksContextProvider';

const App: React.FC = () => (
  <TasksContextProvider>
    <Navigation />
    <Today />
  </TasksContextProvider>
);
export default App;
