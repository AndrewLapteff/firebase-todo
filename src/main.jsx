import React from 'react';
import ReactDOM from 'react-dom/client';
import Normalize from 'react-normalize';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Normalize />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
