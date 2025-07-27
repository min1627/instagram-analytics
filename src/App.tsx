import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProfilePage from './pages/ProfilePage';
import CrawlingRequestPage from './pages/CrawlingRequestPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/request" element={<CrawlingRequestPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
