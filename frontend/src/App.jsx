
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Persons from './Persons'; // Your CRUD component
import Chat from './chat';       // Your new AI component

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        
        {/* Navigation Bar */}
        <nav style={{ display: 'flex', gap: '20px', paddingBottom: '20px', marginBottom: '30px', borderBottom: '2px solid #eee' }}>
          <Link to="/" style={{ textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
            👥 Manage Persons
          </Link>
          <Link to="/chat" style={{ textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', color: '#0056b3' }}>
            ✨ AI Chat
          </Link>
        </nav>

        {/* Page Content Routes */}
        <Routes>
          {/* When the URL is exactly '/', show the Persons component */}
          <Route path="/" element={<Persons />} />
          
          {/* When the URL is '/chat', show the Chat component */}
          <Route path="/chat" element={<Chat />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;