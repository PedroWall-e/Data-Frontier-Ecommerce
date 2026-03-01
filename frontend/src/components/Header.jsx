import React from 'react';
import { Search, User, ShoppingCart, Menu, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoDataFrontier from './LogoDataFrontier';
import useCartStore from '../store/useCartStore';

const Header = () => {
    const totalItems = useCartStore((state) => state.getTotalItems());

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
                        className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* Icons Right */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="md:hidden p-2 text-gray-600 hover:text-[#3347FF]">
                        <Search className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-[#3347FF] flex items-center gap-2 transition-colors">
                        <User className="w-6 h-6" />
                        <span className="hidden lg:block text-sm font-bold">Entrar</span>
                    </button>
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
        </header>
    );
};

export default Header;
