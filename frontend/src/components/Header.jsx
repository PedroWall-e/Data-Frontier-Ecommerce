import React, { useState } from 'react';
import { Search, User, ShoppingCart, Menu, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDataFrontier from './LogoDataFrontier';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import LoginModal from './LoginModal';

const Header = () => {
    const navigate = useNavigate();
    const totalItems = useCartStore((state) => state.getTotalItems());
    const { user, logout } = useAuthStore();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4">

                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 p-1 bg-white shadow-sm border border-gray-100 rounded-xl">
                        <LogoDataFrontier className="w-full h-full" />
                    </div>
                    <div className="hidden sm:block leading-none">
                        <span className="font-extrabold text-xl tracking-tight text-[#2B2B2B] block">data</span>
                        <span className="font-extrabold text-xl tracking-tight text-[#2B2B2B] block -mt-1">frontier<span className="text-[#3347FF]">.store</span></span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl hidden md:flex items-center bg-[#F0F2F5] rounded-full px-4 py-2 border border-transparent focus-within:border-[#3347FF] focus-within:bg-white focus-within:shadow-sm transition-all">
                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Pesquisar componentes, resinas, kits..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                        className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* Icons Right */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="md:hidden p-2 text-gray-600 hover:text-[#3347FF]">
                        <Search className="w-6 h-6" />
                    </button>

                    {user ? (
                        <div className="relative group p-2 text-gray-600 flex items-center gap-2 cursor-pointer">
                            <User className="w-6 h-6 text-[#3347FF]" />
                            <span className="hidden lg:block text-sm font-bold truncate max-w-[100px] text-[#2B2B2B]">{user.name.split(' ')[0]}</span>

                            {/* Dropdown de Logout (Aparece no Hover) */}
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl border border-gray-100 rounded-xl flex flex-col overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all transform origin-top translate-y-2 group-hover:translate-y-0">
                                {/* Se for ADMIN, pode mostrar um link pro painel */}
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin" className="px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 border-b border-gray-100 flex items-center">
                                        Painel Admin
                                    </Link>
                                )}
                                <button onClick={logout} className="px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 text-left transition-colors">
                                    Sair da conta
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsLoginOpen(true)} className="p-2 text-gray-600 hover:text-[#3347FF] flex items-center gap-2 transition-colors cursor-pointer">
                            <User className="w-6 h-6" />
                            <span className="hidden lg:block text-sm font-bold">Entrar</span>
                        </button>
                    )}

                    <Link to="/cart" className="p-2 text-gray-600 hover:text-[#3347FF] relative transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-[#3347FF] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white pointer-events-none">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <button className="md:hidden p-2 text-gray-600 hover:text-[#3347FF]">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Categorias Sub-nav */}
            <div className="bg-white hidden md:block">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center gap-8 overflow-x-auto whitespace-nowrap py-3">
                    {['Hardware IoT', 'Kits Robótica', 'Resinas & Filamentos', 'Modelos STL', 'Usinagem Customizada', 'Cursos Academy'].map((cat) => (
                        <a key={cat} href={`#${cat}`} className="text-sm font-bold text-gray-600 hover:text-[#3347FF] transition-colors">
                            {cat}
                        </a>
                    ))}
                    <a href="#ofertas" className="text-sm font-bold text-[#B2624F] hover:underline ml-auto flex items-center">
                        Ofertas Especiais <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                </div>
            </div>

            {/* Modal de Login */}
            {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
        </header>
    );
};

export default Header;
