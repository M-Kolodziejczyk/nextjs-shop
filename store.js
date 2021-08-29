import create from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  cart: [],
  addedProduct: {
    id: "",
  },

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
          addedProduct: {
            id: product.id,
          },
        };
      } else {
        return {
          cart: [...state.cart, product],
          addedProduct: {
            id: product.id,
          },
        };
      }
    }),
  removeProductFromCart: (product) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
    })),
  clearAddedProduct: () =>
    set(() => ({
      addedProduct: {},
    })),
});

const useStore = create(devtools(store));

export default useStore;
