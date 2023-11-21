import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AuthProvider } from './Utils/auth';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';

const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement) throw new Error('Failed to find the root element');
//added error handling

Modal.setAppElement('#root');
//fixes warning in console

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// reportWebVitals();
