import useStore from "../../store";

import Layout from "../../components/layout";
import CartProduct from "../../components/cartProduct";

export default function Cart() {
  const cart = useStore((state) => state.cart);
  const removeProductFromCart = useStore(
    (state) => state.removeProductFromCart
  );

  const total = cart.reduce(
    (total, product) => (total += product.price * product.quantity),
    0
  );

  return (
    <Layout>
      <div className="text-gray-900">
        <h1 className="text-5xl  font-medium uppercase mb-20">
          {cart.length > 0 ? "Your Cart" : "Your cart is empty"}
        </h1>
        {cart.length > 0 && (
          <div className="product-container">
            <div className="hidden sm:grid grid-cols-12 border-b-2 pb-2">
              <p className="col-span-6 text-xl">Product</p>
              <p className="col-span-2 text-xl">Price</p>
              <p className="col-span-2 text-xl">Qty</p>
              <p className="col-span-2 text-xl">Total</p>
            </div>
            {cart.map((product) => (
              <CartProduct
                key={product.id}
                product={product}
                callback={() => removeProductFromCart(product)}
              />
            ))}
            <div className="mt-10 border-t-2 pt-2">
              <p className="text-3xl">Total: {total.toFixed(2)}$</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
