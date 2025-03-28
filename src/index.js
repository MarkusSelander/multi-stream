import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Valgfritt, om du vil ha en egen css-fil

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
