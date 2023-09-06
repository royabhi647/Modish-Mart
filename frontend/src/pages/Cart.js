import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const cartItems = useSelector((state) => state.productSlice.cartItems);
  console.log("cartItems", cartItems);
  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      <div className="">
        {/* display card items */}
        <div className="">
          {cartItems.map((el) => {
            return (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            );
          })}
        </div>

        {/* total cart items */}
        <div className=""></div>
      </div>
    </div>
  );
};

export default Cart;
