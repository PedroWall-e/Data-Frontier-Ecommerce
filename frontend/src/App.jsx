import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';

const StoreLayout = ({ cartCount }) => (
  <>
    <div className="bg-[#2B2B2B] text-white text-xs font-bold text-center py-2 px-4 tracking-wider">
      FRETE GRÁTIS PARA COMPRAS ACIMA DE R$ 299,00
    </div>
    <Header cartCount={cartCount} />
    <Outlet />
    <Footer />
  </>
);

export default function App() {
  const [cartCount, setCartCount] = useState(2);

  return (
    <Router>
      <div className="min-h-screen font-sans bg-[#F9F8F6] text-[#2B2B2B]">
        <Routes>
          {/* Rotas da Loja (Públicas) */}
          <Route element={<StoreLayout cartCount={cartCount} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Rotas de Admin (Painel Interno) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}