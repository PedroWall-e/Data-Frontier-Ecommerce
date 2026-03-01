import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, quantity = 1, selectedSku = null) => {
                set((state) => {
                    // Try to find if item already in cart
                    const skuId = selectedSku ? selectedSku.id : (product.skus && product.skus.length > 0 ? product.skus[0].id : null);

                    const existIndex = state.items.findIndex(
                        (i) => i.productId === product.id && (i.sku ? i.sku.id === skuId : true)
                    );

                    let newItems = [...state.items];

                    const price = selectedSku ? selectedSku.price : (product.skus && product.skus.length > 0 ? product.skus[0].price : 0);
                    const finalSku = selectedSku || (product.skus && product.skus.length > 0 ? product.skus[0] : null);

                    if (existIndex !== -1) {
                        newItems[existIndex].quantity += quantity;
                    } else {
                        newItems.push({
                            id: Math.random().toString(36).substr(2, 9), // temp linear id
                            productId: product.id,
                            product: product,
                            sku: finalSku,
                            quantity,
                            price: price
                        });
                    }
                    return { items: newItems };
                });
            },

            removeFromCart: (itemId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.id !== itemId)
                }));
            },

            updateQuantity: (itemId, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === itemId ? { ...i, quantity } : i
                    )
                }));
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
            }
        }),
        {
            name: 'data-frontier-cart', // name of the item in localStorage (must be unique)
        }
    )
);

export default useCartStore;
