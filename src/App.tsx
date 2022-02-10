import React from 'react';
import './App.scss';
import './colors.scss';
import Navigation from './components/Layout/Navigation';
import Today from './components/Today/Today';

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Today />
    </>
  );
};
export default App;
