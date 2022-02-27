import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import Day from './components/Day/Day';
import Navigation from './components/Layout/Navigation';
import store from './store';
import './styles/colors.scss';

const App: React.FC = () => (
  <Provider store={store}>
    <Navigation />
    <Day />
  </Provider>
);
export default App;
