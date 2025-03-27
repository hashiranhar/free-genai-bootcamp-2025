import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new ReactDOM API
import App from './App';
import './styles/global.css'; // Import global styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(<App />); // Render the App component