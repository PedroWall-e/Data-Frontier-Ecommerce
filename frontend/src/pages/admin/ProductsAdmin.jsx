import React, { useState, useEffect } from 'react';
import { Package, Search, Edit, Trash2, Plus } from 'lucide-react';

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch de produtos públicos para o Admin (na versão avançada teria endpoint específico com filtros extras)
                const response = await fetch('http://localhost:3000/api/products');
                if (response.ok) {
                    const json = await response.json();
                    setProducts(json.data || json);
                } else {
                    console.error('Falha ao buscar produtos');
                }
            } catch (error) {
                console.error('Erro na rede:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) return <div className="p-8 text-gray-500 font-bold">Carregando catálogo...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#F0F3FF] rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#3347FF]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-[#2B2B2B]">Gestão de Produtos</h1>
                        <p className="text-gray-500 text-sm">{products.length} itens encontrados no catálogo.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex flex-1 items-center bg-gray-100 rounded-full px-4 py-2 md:w-64">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input type="text" placeholder="Buscar produto..." className="bg-transparent text-sm w-full outline-none" />
                    </div>
                    <button className="bg-[#3347FF] hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> Novo
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                <th className="p-4 font-bold">Produto</th>
                                <th className="p-4 font-bold">Categoria</th>
                                <th className="p-4 font-bold">Preço Base</th>
                                <th className="p-4 font-bold text-center">Status</th>
                                <th className="p-4 font-bold text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => {
                                const basePrice = p.skus?.length > 0 ? Number(p.skus[0].price) : 0;
                                return (
                                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-extrabold text-[#2B2B2B]">{p.name}</span>
                                                <span className="text-xs text-gray-500">{p.slug}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                                {p.category?.name || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4 font-extrabold text-[#2B2B2B]">
                                            R$ {basePrice.toFixed(2)}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {p.isActive ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-500 hover:text-[#3347FF] hover:bg-blue-50 rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <div className="p-8 text-center text-gray-500 font-bold">
                            Nenhum produto cadastrado no banco de dados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsAdmin;
