// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App'; // Make sure your styles.css is in the src/ directory
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);