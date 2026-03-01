import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut } from 'lucide-react';
import LogoDataFrontier from '../../components/LogoDataFrontier';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Mock de logout - limparia o token JWT aqui
        navigate('/');
    };

    const navItems = [
        { path: '.', name: 'Dashboard', icon: LayoutDashboard },
        { path: 'orders', name: 'Pedidos', icon: ShoppingBag },
        { path: 'products', name: 'Produtos', icon: Package },
        { path: 'users', name: 'Clientes', icon: Users },
        { path: 'settings', name: 'Configurações', icon: Settings },
    ];

    return (
        <div className="min-h-screen flex bg-[#F0F2F5] text-[#2B2B2B] font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-100 cursor-pointer" onClick={() => navigate('/')}>
                    <LogoDataFrontier className="w-8 h-8 mr-2" />
                    <span className="font-extrabold text-lg tracking-tight">AdminPanel</span>
                </div>

                <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '.'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                                    ? 'bg-[#3347FF] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#3347FF]'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair do Painel
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Admin Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-extrabold text-[#2B2B2B]">Painel de Controle</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FFE3D6] rounded-full flex items-center justify-center font-bold text-[#B2624F]">
                            AD
                        </div>
                        <span className="font-bold text-sm hidden sm:block">Admin</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
