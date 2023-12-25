import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUploader from './components/FirstComponent'; // Import your ImageUploader component
import SecondComponent from './components/SecondComponent'; // Import your SecondComponent

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageUploader />} />
        <Route path="/first" element={<SecondComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
