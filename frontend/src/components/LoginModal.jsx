import React, { useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciais inválidas. Verifique seu e-mail e senha.');
            }

            const data = await response.json();

            // O backend NestJS por padrão retorna { access_token, user }
            if (data.access_token && data.user) {
                login(data.access_token, data.user);
                toast.success(`Bem-vindo, ${data.user.name}!`);
                onClose();
            } else {
                throw new Error('Resposta inválida do servidor.');
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-3xl font-extrabold text-[#2B2B2B] mb-2">Entrar</h2>
                <p className="text-gray-500 font-medium mb-8">Acesse sua conta para gerenciar pedidos e ofertas.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#3347FF] focus:bg-white transition-all font-medium"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#3347FF] focus:bg-white transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#3347FF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl mt-2 flex justify-center items-center gap-2 transition-all disabled:opacity-70 cursor-pointer"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Entrar na Conta'}
                    </button>

                    <div className="text-center mt-2">
                        <span className="text-sm font-medium text-gray-500">Não tem uma conta? <a href="#" className="text-[#3347FF] font-bold hover:underline">Registre-se</a></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
