import React, { useState, useEffect } from 'react';
import { Package, Search, Edit, Trash2, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/useAuthStore';

const CATEGORIES = [
    { id: 1, name: 'Hardware IoT' },
    { id: 2, name: 'Kits Robótica' },
    { id: 3, name: 'Resinas & Filamentos' },
    { id: 4, name: 'Modelos STL' },
    { id: 5, name: 'Usinagem Customizada' },
];

const INITIAL_FORM = { name: '', slug: '', description: '', basePrice: '', categoryId: '' };

const ProductsAdmin = () => {
    const token = useAuthStore(state => state.token);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/products');
            if (response.ok) {
                const json = await response.json();
                setProducts(json.data || json);
            }
        } catch (error) {
            console.error('Erro na rede:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            // Auto-gerar slug a partir do nome
            ...(name === 'name' ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') } : {}),
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!form.name || !form.slug || !form.categoryId) {
            toast.error('Preencha Nome, Slug e Categoria.');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    name: form.name,
                    slug: form.slug,
                    description: form.description,
                    basePrice: parseFloat(form.basePrice) || 0,
                    categoryId: parseInt(form.categoryId),
                }),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Erro ao criar produto.');
            }
            const newProduct = await response.json();
            setProducts(prev => [newProduct, ...prev]);
            setIsModalOpen(false);
            setForm(INITIAL_FORM);
            toast.success(`Produto "${newProduct.name}" criado com sucesso!`);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (productId, productName) => {
        if (!window.confirm(`Tem certeza que deseja remover "${productName}"? Esta ação desativará o produto.`)) return;
        try {
            const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Falha ao remover produto.');
            setProducts(prev => prev.filter(p => p.id !== productId));
            toast.success(`Produto "${productName}" removido.`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className="p-8 text-gray-500 font-bold">Carregando catálogo...</div>;

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
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
                        <input
                            type="text"
                            placeholder="Buscar produto..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="bg-transparent text-sm w-full outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#3347FF] hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Novo
                    </button>
                </div>
            </div>

            {/* Tabela */}
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
                            {filtered.map(p => {
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
                                            <button
                                                onClick={() => handleDelete(p.id, p.name)}
                                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-gray-500 font-bold">
                            {searchTerm ? `Nenhum produto encontrado para "${searchTerm}".` : 'Nenhum produto cadastrado.'}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Criação */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 relative shadow-2xl">
                        <button
                            onClick={() => { setIsModalOpen(false); setForm(INITIAL_FORM); }}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-extrabold text-[#2B2B2B] mb-6">Novo Produto</h2>

                        <form onSubmit={handleCreate} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nome *</label>
                                <input name="name" value={form.name} onChange={handleInput} required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3347FF]"
                                    placeholder="Ex: Arduino Mega 2560" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Slug *</label>
                                <input name="slug" value={form.slug} onChange={handleInput} required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-[#3347FF]"
                                    placeholder="arduino-mega-2560" />
                                <p className="text-xs text-gray-400 mt-1">Gerado automaticamente. Editável manualmente.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
                                <textarea name="description" value={form.description} onChange={handleInput} rows={3}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3347FF] resize-none"
                                    placeholder="Descrição curta do produto..." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Preço Base (R$)</label>
                                    <input name="basePrice" value={form.basePrice} onChange={handleInput} type="number" step="0.01" min="0"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3347FF]"
                                        placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Categoria *</label>
                                    <select name="categoryId" value={form.categoryId} onChange={handleInput} required
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3347FF] bg-white cursor-pointer"
                                    >
                                        <option value="">Selecionar...</option>
                                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#3347FF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl mt-2 flex justify-center items-center gap-2 transition-all disabled:opacity-70 cursor-pointer"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Criar Produto'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsAdmin;
