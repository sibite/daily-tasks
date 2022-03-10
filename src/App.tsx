import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Navigation from './components/Layout/Navigation';
import CalendarPage from './pages/CalendarPage';
import DayPage from './pages/DayPage';
import store from './store';
import './styles/colors.scss';

const App: React.FC = () => (
  <Provider store={store}>
    <Navigation />
    <Routes>
      <Route path="/" element={<Navigate to="/day" />} />
      <Route path="/day" element={<DayPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  </Provider>
);
export default App;
