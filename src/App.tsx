import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import HeatmapTracker from './components/HeatmapTracker';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/heatmap" element={<HeatmapTracker />} />
      </Routes>
    </Router>
  );
};

export default App;