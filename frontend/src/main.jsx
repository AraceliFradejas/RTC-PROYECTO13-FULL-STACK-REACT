import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App.jsx';
import { AuthProvider } from './features/auth/AuthProvider.jsx';
import './styles/style.css';
import './styles/components.css';
import './styles/cinematic.css';
import './styles/editorial.css';
import './styles/interactions.css';
createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter></React.StrictMode>,
);
