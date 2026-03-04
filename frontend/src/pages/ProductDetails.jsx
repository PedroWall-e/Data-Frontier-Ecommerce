import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, Box } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart);

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSku, setSelectedSku] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/products/${slug}`);
                if (!response.ok) {
                    throw new Error('Produto não encontrado');
                }
                const data = await response.json();
                setProduct(data);
                if (data.skus && data.skus.length > 0) {
                    setSelectedSku(data.skus[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!product || !selectedSku) return;

        addToCart(product, 1, selectedSku);
        toast.success(`"${product.name}" adicionado à sacola!`, {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
            },
        });
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 animate-pulse flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded-3xl"></div>
                <div className="w-full md:w-1/2 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-24 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-14 bg-gray-200 rounded w-full mt-8"></div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center">
                <h2 className="text-3xl font-extrabold text-[#2B2B2B] mb-4">Ops! {error || 'Produto não encontrado'}</h2>
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center text-[#3347FF] hover:underline font-bold"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a loja
                </button>
            </div>
        );
    }

    const priceRaw = selectedSku ? selectedSku.price : (product.price || 0);
    const priceFormatted = `R$ ${Number(priceRaw).toFixed(2).replace('.', ',')}`;

    const oldPriceRaw = selectedSku ? selectedSku.comparePrice : null;
    const oldPriceFormatted = oldPriceRaw ? `R$ ${Number(oldPriceRaw).toFixed(2).replace('.', ',')}` : null;

    const categoryName = product.category?.name || 'Catálogo';

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-16">
            <button
                onClick={() => navigate(-1)}
                className="mb-8 inline-flex items-center text-gray-500 hover:text-[#3347FF] transition-colors font-semibold"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
            </button>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">

                {/* Product Image Area */}
                <div className="w-full md:w-1/2">
                    <div className="bg-[#F0F3FF] w-full aspect-square rounded-[2rem] flex items-center justify-center p-8 relative">
                        <Box className="w-48 h-48 text-[#3347FF] opacity-80" />
                        {(product.rating === 5.0 || product.isFeatured) && (
                            <span className="absolute top-6 left-6 bg-[#3347FF] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                Top Rate
                            </span>
                        )}
                    </div>
                    {/* Small Thumbnails Mock */}
                    <div className="flex gap-4 mt-4">
                        {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className={`w-20 h-20 rounded-xl bg-gray-100 border-2 flex items-center justify-center cursor-pointer hover:border-[#3347FF] transition-colors ${idx === 0 ? 'border-[#3347FF]' : 'border-transparent'}`}>
                                <Box className="w-8 h-8 text-gray-400" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details Area */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-widest text-[#3347FF] mb-2">{categoryName}</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#2B2B2B] leading-tight mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-5 h-5 fill-current" />
                            ))}
                        </div>
                        <span className="text-gray-600 font-bold ml-2">4.9</span>
                        <span className="text-gray-400 text-sm ml-1">(128 avaliações)</span>
                    </div>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        {product.description || product.shortDesc || 'Sem descrição.'}
                    </p>

                    <div className="mb-8">
                        <div className="flex items-end gap-4 mb-2">
                            <span className="text-4xl font-extrabold text-[#2B2B2B]">{priceFormatted}</span>
                            {oldPriceFormatted && (
                                <span className="text-lg text-gray-400 font-bold line-through mb-1">{oldPriceFormatted}</span>
                            )}
                        </div>
                    </div>

                    {/* Variações (SKUs) */}
                    {product.skus && product.skus.length > 0 && (
                        <div className="mb-8">
                            <h3 className="font-bold text-[#2B2B2B] mb-3">Opções Disponíveis:</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.skus.map((sku) => {
                                    // Pega os atributos, fallback para o sku se nao tiver
                                    const skuName = sku.attributes
                                        ? Object.values(sku.attributes).join(' - ')
                                        : sku.sku;

                                    const isSelected = selectedSku?.id === sku.id;
                                    const isOutOfStock = sku.stock <= 0;

                                    return (
                                        <button
                                            key={sku.id}
                                            onClick={() => setSelectedSku(sku)}
                                            disabled={isOutOfStock}
                                            className={`
                                                px-5 py-3 rounded-xl font-bold border-2 transition-all
                                                ${isSelected ? 'border-[#3347FF] bg-[#F0F3FF] text-[#3347FF]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}
                                                ${isOutOfStock ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400 border-gray-100' : ''}
                                            `}
                                        >
                                            {skuName}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedSku || selectedSku.stock <= 0}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-3 transition-colors ${selectedSku && selectedSku.stock > 0
                                ? 'bg-[#3347FF] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {(!selectedSku || selectedSku.stock > 0) ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
                    </button>

                    {/* Features and guarantees */}
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F0F3FF] text-[#3347FF] rounded-lg flex items-center justify-center">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-[#2B2B2B]">Frete Expresso</span>
                                <span className="text-xs text-gray-500">Para todo o Brasil</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F0F3FF] text-[#3347FF] rounded-lg flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-[#2B2B2B]">Garantia Oficial</span>
                                <span className="text-xs text-gray-500">1 ano de cobertura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
