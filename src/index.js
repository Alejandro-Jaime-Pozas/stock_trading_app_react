// index.js is the equivalent to python __init__ file
// import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// this is getting the index.html file from public folder somehow
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // React.StrictMode gives you the warnings/lint msgs in node terminal
    <React.StrictMode>
      {/* not sure what BrowserRouter does exactly..think it permits the Link functionality for easier user experience when navigating site */}
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </React.StrictMode>
);
