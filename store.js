import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  cart: [],
  addProductToCart: (product) =>
    set((state) => {
      let item = state.cart.findIndex((item) => item.id === product.id);
      if (item > -1) {
        return {
          cart: state.cart.map((productItem) =>
            productItem.id === product.id
              ? {
                  ...productItem,
                  quantity: productItem.quantity + product.quantity,
                }
              : productItem
          ),
        };
      } else {
        return { cart: [...state.cart, product] };
      }
    }),
  removeProductFromCart: (product) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
    })),
});

const useStore = create(devtools(store));

export default useStore;
