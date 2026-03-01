import React, { useState, useEffect } from 'react';
import { Package, Truck, Search, Eye } from 'lucide-react';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mocking listagem da API GET /api/admin/orders
        setTimeout(() => {
            setOrders([
                { id: 101, user: { name: 'João Silva', email: 'joao@example.com' }, subtotal: 300, shippingCost: 45.90, total: 345.90, status: 'PENDING', trackingCode: null, createdAt: new Date().toISOString() },
                { id: 102, user: { name: 'Maria Souza', email: 'maria@example.com' }, subtotal: 1200, shippingCost: 0, total: 1200.00, status: 'PAID', trackingCode: null, createdAt: new Date(Date.now() - 86400000).toISOString() },
                { id: 103, user: { name: 'Tech Store BR', email: 'tech@store.br' }, subtotal: 450, shippingCost: 0, total: 450.00, status: 'SHIPPED', trackingCode: 'DF-X7Y8Z9-BR', createdAt: new Date(Date.now() - 172800000).toISOString() },
            ]);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleDispatch = (orderId) => {
        // Simular a chamada ao backend: POST /api/admin/orders/:id/dispatch
        alert(`Chamada para despachar o pedido #${orderId} simulada. Backend vai retornar um Tracking Code.`);
        setOrders(orders.map(o => {
            if (o.id === orderId) {
                return { ...o, status: 'SHIPPED', trackingCode: 'DF-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-BR' };
            }
            return o;
        }));
    };

    if (isLoading) return <div className="p-8 text-gray-500 font-bold">Carregando pedidos...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F0F3FF] rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#3347FF]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-[#2B2B2B]">Gestão de Pedidos</h1>
                        <p className="text-gray-500 text-sm">Gerencie pagamentos e despache mercadorias.</p>
                    </div>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input type="text" placeholder="Buscar pedido..." className="bg-transparent text-sm w-full outline-none" />
                </div>
            </div>

            <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                            <th className="p-4 font-bold">Pedido / Data</th>
                            <th className="p-4 font-bold">Cliente</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold">Rastreio</th>
                            <th className="p-4 font-bold">Total</th>
                            <th className="p-4 font-bold text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <span className="block font-bold text-[#2B2B2B]">#{order.id}</span>
                                    <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</span>
                                </td>
                                <td className="p-4">
                                    <span className="block font-medium text-[#2B2B2B]">{order.user.name}</span>
                                    <span className="text-xs text-gray-500">{order.user.email}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full 
                                        ${order.status === 'PAID' ? 'bg-green-100 text-green-700' : ''}
                                        ${order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : ''}
                                        ${order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' : ''}
                                    `}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm font-medium text-gray-600">
                                    {order.trackingCode || <span className="italic text-gray-400">Pendente</span>}
                                </td>
                                <td className="p-4 font-extrabold text-[#2B2B2B]">
                                    R$ {order.total.toFixed(2)}
                                </td>
                                <td className="p-4 flex justify-center gap-2">
                                    {order.status === 'PAID' && (
                                        <button
                                            onClick={() => handleDispatch(order.id)}
                                            className="bg-[#2B2B2B] hover:bg-[#3347FF] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                                            title="Gerar Etiqueta e Despachar"
                                        >
                                            <Truck className="w-3 h-3" /> Despachar
                                        </button>
                                    )}
                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersAdmin;
