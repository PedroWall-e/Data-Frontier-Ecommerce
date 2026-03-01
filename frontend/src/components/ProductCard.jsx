import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const Icon = product.icon || ShoppingCart; // Mock mitigation

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`"${product.name}" adicionado à sacola!`, {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold'
            },
        });
    };

    return (
        <div className="bg-white rounded-[2rem] p-4 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full">
            <div className="relative w-full h-48 rounded-2xl mb-4 flex items-center justify-center transition-colors overflow-hidden" style={{ backgroundColor: product.bgColor }}>
                <Icon className="w-16 h-16 opacity-80 group-hover:scale-110 transition-transform duration-500" style={{ color: product.color }} />
                {/* Badge simulado */}
                {product.rating === 5.0 && (
                    <span className="absolute top-3 left-3 bg-[#3347FF] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Top Rate</span>
                )}
            </div>

            <div className="px-2 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{product.category}</span>
                <h3 className="text-lg font-bold text-[#2B2B2B] leading-tight mb-2 flex-1">{product.name}</h3>

                <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-600">{product.rating}</span>
                </div>

                <div className="flex items-end justify-between mt-auto">
                    <span className="text-xl font-extrabold text-[#3347FF]">{product.price}</span>
                </div>

                <button onClick={handleAddToCart} className="w-full mt-4 bg-[#F0F2F5] hover:bg-[#3347FF] hover:text-white text-[#2B2B2B] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                    <ShoppingCart className="w-5 h-5 pointer-events-none" /> Adicionar
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
