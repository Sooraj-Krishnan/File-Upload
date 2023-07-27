// src/App.tsx
import React from 'react';
import { BrowserRouter as Router,Route, Routes,} from 'react-router-dom';
import NavBar from './components/NavBar';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;



