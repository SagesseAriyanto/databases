// App.jsx: Main app boilerplate. Handles page switching and layout.
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import { useState } from 'react';

export default function App() {
  // Simple state to switch between pages
  const [page, setPage] = useState('home');
  return (
    <>
      {/* Navbar with navigation buttons */}
      <Navbar onNavigate={setPage} />
      {/* Render the selected page */}
      {page === 'home' ? <Home /> : <About />}
      {/* Footer at the bottom */}
      <Footer />
    </>
  );
}
