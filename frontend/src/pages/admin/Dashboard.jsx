import React, { useState, useEffect } from 'react';
import { Users, ShoppingCart, DollarSign, PackageCheck, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
        recentOrders: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Na integração real, devemos buscar usando JWT token admin
    // Por enquanto, faremos mock para exibir os quadros de forma robusta e bonita
    useEffect(() => {
        // Simulando resposta da API: /api/admin/dashboard
        setTimeout(() => {
            setMetrics({
                totalUsers: 1450,
                totalOrders: 328,
                pendingOrders: 12,
                totalRevenue: 145890.50,
                recentOrders: [
                    { id: 101, user: { name: 'João Silva' }, total: 345.90, status: 'PENDING', createdAt: new Date().toISOString() },
                    { id: 102, user: { name: 'Maria Souza' }, total: 1200.00, status: 'PAID', createdAt: new Date().toISOString() },
                    { id: 103, user: { name: 'Tech Store BR' }, total: 450.00, status: 'SHIPPED', createdAt: new Date().toISOString() },
                ]
            });
            setIsLoading(false);
        }, 1000);
    }, []);

    const statCards = [
        { title: 'Faturamento Total', value: `R$ ${metrics.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Pedidos', value: metrics.totalOrders, icon: ShoppingCart, color: 'text-[#3347FF]', bg: 'bg-[#F0F3FF]' },
        { title: 'Clientes Ativos', value: metrics.totalUsers, icon: Users, color: 'text-[#B2624F]', bg: 'bg-[#FFE3D6]' },
        { title: 'Pedidos Pendentes', value: metrics.pendingOrders, icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    if (isLoading) {
        return <div className="flex h-full items-center justify-center font-bold text-gray-500">Carregando métricas...</div>;
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Cards Topo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500">{stat.title}</p>
                            <h3 className="text-2xl font-extrabold text-[#2B2B2B]">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de Pedidos Recentes */}
                <div className="lg:col-span-2 bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-extrabold text-[#2B2B2B]">Pedidos Recentes</h2>
                        <a href="/admin/orders" className="text-sm font-bold text-[#3347FF] hover:underline">Ver todos</a>
                    </div>
                    <div className="overflow-x-auto flex-1 p-2">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-500 text-sm">
                                    <th className="p-4 font-bold border-b border-gray-50">#ID</th>
                                    <th className="p-4 font-bold border-b border-gray-50">Cliente</th>
                                    <th className="p-4 font-bold border-b border-gray-50">Data</th>
                                    <th className="p-4 font-bold border-b border-gray-50">Status</th>
                                    <th className="p-4 font-bold border-b border-gray-50">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.recentOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                                        <td className="p-4 font-bold text-[#2B2B2B]">#{order.id}</td>
                                        <td className="p-4 text-gray-700 font-medium">{order.user.name}</td>
                                        <td className="p-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full 
                                                ${order.status === 'PAID' ? 'bg-green-100 text-green-700' : ''}
                                                ${order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : ''}
                                                ${order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' : ''}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-extrabold text-[#2B2B2B]">R$ {order.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bloco Lateral de Alertas/Ações */}
                <div className="bg-[#2B2B2B] rounded-[1.5rem] p-8 text-white flex flex-col justify-center items-start shadow-lg">
                    <PackageCheck className="w-12 h-12 text-[#FFE3D6] mb-6" />
                    <h3 className="text-2xl font-extrabold mb-3">Gestão de Etiquetas</h3>
                    <p className="text-gray-300 font-medium mb-8">
                        Você possui <strong className="text-white">{metrics.pendingOrders} pedidos pendentes</strong> aguardando emissão de etiqueta de frete.
                    </p>
                    <button className="bg-[#3347FF] hover:bg-blue-700 w-full py-4 rounded-xl font-bold transition-transform hover:-translate-y-1">
                        Despachar Pedidos
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
