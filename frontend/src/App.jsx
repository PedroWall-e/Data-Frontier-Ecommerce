import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <Router>
      <div className="min-h-screen font-sans bg-[#F9F8F6] text-[#2B2B2B]">
        {/* HEADER SUPERIOR (Avisos) */}
        <div className="bg-[#2B2B2B] text-white text-xs font-bold text-center py-2 px-4 tracking-wider">
          FRETE GRÁTIS PARA COMPRAS ACIMA DE R$ 299,00
        </div>

        <Header cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}