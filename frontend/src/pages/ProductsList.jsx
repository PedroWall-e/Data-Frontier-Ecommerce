import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { SlidersHorizontal, Search } from 'lucide-react';

const ProductsList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const searchTerm = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId') || '';
    const orderBy = searchParams.get('orderBy') || '';

    useEffect(() => {
        // Fetch Categories for Filter Sidebar
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/categories');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch Products based on Query Params
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);
                if (categoryId) params.append('categoryId', categoryId);
                if (orderBy) params.append('orderBy', orderBy);

                const response = await fetch(`http://localhost:3000/api/products?${params.toString()}`);
                if (!response.ok) throw new Error('Falha ao buscar produtos');

                const data = await response.json();
                // O NestJS pode retornar paginado { data: [], total: ... }
                setProducts(data.data || data || []);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm, categoryId, orderBy]);

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        // Ao mudar categoria/filtro resetar a paginação se houvesse, no nosso caso só atualiza a URL
        setSearchParams(newParams);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
            {/* Sidebar Filtros */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm md:sticky md:top-24">
                    <div className="flex items-center gap-2 font-extrabold text-[#2B2B2B] mb-6 text-lg">
                        <SlidersHorizontal className="w-5 h-5" /> Filtros
                    </div>

                    {/* Filtro de Categoria */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">Categorias</h3>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={!categoryId}
                                    onChange={() => handleFilterChange('categoryId', '')}
                                    className="accent-[#3347FF] w-4 h-4 cursor-pointer"
                                />
                                <span className={`font-medium transition-colors ${!categoryId ? 'text-[#3347FF] font-bold' : 'text-gray-600 group-hover:text-[#3347FF]'}`}>
                                    Todas as categorias
                                </span>
                            </label>
                            {categories.map(cat => (
                                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={categoryId === cat.id.toString()}
                                        onChange={() => handleFilterChange('categoryId', cat.id.toString())}
                                        className="accent-[#3347FF] w-4 h-4 cursor-pointer"
                                    />
                                    <span className={`font-medium transition-colors ${categoryId === cat.id.toString() ? 'text-[#3347FF] font-bold' : 'text-gray-600 group-hover:text-[#3347FF]'}`}>
                                        {cat.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filtro de Ordem */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">Ordernar Por</h3>
                        <select
                            value={orderBy}
                            onChange={(e) => handleFilterChange('orderBy', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-[#2B2B2B] text-sm rounded-xl focus:ring-[#3347FF] focus:border-[#3347FF] block p-3 outline-none font-bold cursor-pointer"
                        >
                            <option value="">Mais Relevantes</option>
                            <option value="price_asc">Menor Preço</option>
                            <option value="price_desc">Maior Preço</option>
                            <option value="newest">Lançamentos</option>
                        </select>
                    </div>
                </div>
            </aside>

            {/* Listagem de Produtos / Grid */}
            <div className="flex-1">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-3xl font-extrabold text-[#2B2B2B] leading-tight">
                        {searchTerm ? `Resultados para "${searchTerm}"` : 'Explorar Catálogo'}
                    </h1>
                    <span className="text-gray-500 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm">
                        {isLoading ? 'Buscando...' : `${products.length} produtos`}
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, idx) => <ProductSkeleton key={idx} />)
                    ) : products.length > 0 ? (
                        products.map(product => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <div className="col-span-full py-20 bg-white rounded-[2rem] border border-gray-100 text-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B]">Nenhum produto encontrado.</h3>
                            <p className="text-gray-500 mt-2 font-medium">Tente ajustar seus filtros de categoria ou o termo de busca.</p>
                            <button
                                onClick={() => setSearchParams(new URLSearchParams())}
                                className="mt-6 font-bold text-white bg-[#3347FF] px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Limpar todos os filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
