import React, { useState } from 'react';
import { Trash2, TrendingUp, AlertCircle, CheckCircle, Package } from 'lucide-react';

const Cart = () => {
    // Mock de itens do carrinho
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Placa Arduino Uno R3 Compatível",
            price: 54.90,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80",
        },
        {
            id: 2,
            name: "Resina 3D Lavável em Água - Cinza",
            price: 189.90,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
        }
    ]);

    const [zipCode, setZipCode] = useState('');
    const [shippingResult, setShippingResult] = useState(null);
    const [isLoadingShipping, setIsLoadingShipping] = useState(false);
    const [error, setError] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const calculateShipping = async () => {
        if (zipCode.replace(/\D/g, '').length !== 8) {
            setError('Digite um CEP válido com 8 dígitos.');
            return;
        }

        setError('');
        setIsLoadingShipping(true);

        try {
            // Em produção, isso viria das variáveis de ambiente
            const API_URL = 'http://localhost:3000/api';
            const response = await fetch(`${API_URL}/shipping/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zipCode, weightKg: 1.5 })
            });

            if (!response.ok) throw new Error('Falha ao calcular o frete');

            const data = await response.json();
            setShippingResult(data);
        } catch (err) {
            setError(err.message || 'Erro ao consultar o CEP.');
            setShippingResult(null);
        } finally {
            setIsLoadingShipping(false);
        }
    };

    const updateQuantity = (id, delta) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const isFreeShipping = subtotal >= 299;
    const finalShippingCost = isFreeShipping ? 0 : (shippingResult?.price || 0);
    const orderTotal = subtotal + finalShippingCost;

    return (
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col lg:flex-row gap-8 min-h-[60vh]">
            {/* LISTA DE PRODUTOS */}
            <div className="flex-1 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <h1 className="text-3xl font-extrabold text-[#2B2B2B] mb-8 border-b pb-4">
                    Meu Carrinho
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h2 className="text-xl font-bold text-gray-700">Seu carrinho está vazio.</h2>
                        <a href="/" className="inline-block mt-4 text-[#3347FF] font-bold hover:underline">
                            Continuar Comprando
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 items-center border border-gray-100 p-4 rounded-xl">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#2B2B2B] leading-tight">{item.name}</h3>
                                    <p className="text-[#3347FF] font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 font-bold hover:text-black">-</button>
                                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 font-bold hover:text-black">+</button>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* RESUMO DO PEDIDO E CÁLCULO DE FRETE */}
            <div className="w-full lg:w-96 flex flex-col gap-6">

                {/* CALCULAR FRETE */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-[#2B2B2B] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#B2624F]" /> Calcular Entrega
                    </h3>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            placeholder="Seu CEP (00000-000)"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#3347FF]"
                        />
                        <button
                            onClick={calculateShipping}
                            disabled={isLoadingShipping || cartItems.length === 0}
                            className="bg-[#2B2B2B] hover:bg-black text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50"
                        >
                            {isLoadingShipping ? '...' : 'OK'}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-xs font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}

                    {shippingResult && !error && (
                        <div className={`mt-4 p-3 rounded-xl border ${isFreeShipping ? 'bg-green-50 border-green-200' : 'bg-[#F0F3FF] border-[#3347FF]/20'}`}>
                            {isFreeShipping ? (
                                <div>
                                    <p className="text-green-700 text-sm font-bold flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" /> Frete Grátis Aplicado!
                                    </p>
                                    <p className="text-green-600 text-xs mt-1">Prazo: {shippingResult.deliveryDays} dias úteis</p>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[#2B2B2B] text-sm font-bold">{shippingResult.carrier}</p>
                                        <p className="text-gray-500 text-xs">Até {shippingResult.deliveryDays} dias úteis</p>
                                    </div>
                                    <span className="font-bold text-[#3347FF]">R$ {shippingResult.price.toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* RESUMO TOTAL */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-4">
                    <h3 className="text-xl font-extrabold text-[#2B2B2B] mb-2">Resumo do Pedido</h3>

                    <div className="flex justify-between text-gray-600 font-medium pb-2 border-b border-gray-100">
                        <span>Subtotal ({cartItems.length} itens)</span>
                        <span>R$ {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600 font-medium pb-4 border-b border-gray-100">
                        <span>Frete</span>
                        {shippingResult ? (
                            isFreeShipping ? <span className="text-green-600 font-bold">Grátis</span> : <span>R$ {finalShippingCost.toFixed(2)}</span>
                        ) : (
                            <span className="text-sm italic">A calcular</span>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold text-[#2B2B2B]">TOTAL</span>
                        <span className="text-2xl font-extrabold text-[#3347FF]">R$ {orderTotal.toFixed(2)}</span>
                    </div>

                    <button
                        disabled={cartItems.length === 0}
                        className="w-full bg-[#3347FF] hover:bg-blue-700 text-white py-4 rounded-full font-bold text-lg mt-4 shadow-md transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        Fechar Pedido
                    </button>

                    {isFreeShipping && (
                        <p className="text-center text-xs text-green-600 font-bold mt-2">
                            Você economizou frete nesta compra! 🎉
                        </p>
                    )}
                </div>

            </div>
        </main>
    );
};

export default Cart;
