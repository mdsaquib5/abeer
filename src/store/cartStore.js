import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, size, quantity = 1) => set((state) => {
        const existingIndex = state.items.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );
        if (existingIndex > -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex].quantity += quantity;
          return { items: updatedItems };
        }
        return { items: [...state.items, { product, size, quantity }] };
      }),
      removeFromCart: (productId, size) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.product.id === productId && item.size === size)
        )
      })),
      updateQuantity: (productId, size, quantity) => set((state) => {
        if (quantity <= 0) {
          return {
            items: state.items.filter(
              (item) => !(item.product.id === productId && item.size === size)
            )
          };
        }
        return {
          items: state.items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          )
        };
      }),
      clearCart: () => set({ items: [] }),
      getCartSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'abeer-cart-storage',
    }
  )
);
