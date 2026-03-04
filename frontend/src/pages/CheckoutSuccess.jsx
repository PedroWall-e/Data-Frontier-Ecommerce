import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        // Stripe nos redireciona pra cá, significa que o checkout foi bem sucedido.
        // Esvaziamos o carrinho local do Zustand.
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-12 rounded-[2rem] shadow-xl border border-gray-100 text-center animate-in fade-in zoom-in duration-500">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>

                <h2 className="text-3xl font-extrabold text-[#2B2B2B] mb-4">
                    Compra Aprovada! 🎉
                </h2>

                <p className="text-gray-500 font-medium mb-8 text-lg">
                    Seu pagamento foi processado com sucesso. Estamos preparando seu pedido para envio.
                </p>

                {sessionId && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 text-sm">
                        <p className="text-gray-500 font-bold mb-1">ID da Transação Stripe:</p>
                        <p className="text-gray-700 font-mono truncate">{sessionId}</p>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <Link
                        to="/admin"
                        className="w-full flex items-center justify-center gap-2 bg-[#3347FF] hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
                    >
                        <Package className="w-5 h-5" />
                        Acompanhar Meu Pedido
                    </Link>

                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#3347FF] hover:text-[#3347FF] text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors"
                    >
                        Voltar para a Loja
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
