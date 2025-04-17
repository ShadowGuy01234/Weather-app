// src/App.js
import React from 'react';
import AboutUs from './components/aboutus'; // Import the AboutUs component
import './App.css'; // You might have global styles here

const App = () => {
    return (
        <div>
            {/* Other components of your weather app can go here */}
            <AboutUs /> {/* Render the AboutUs component */}
            {/* More components */}
        </div>
    );
};

export default App;