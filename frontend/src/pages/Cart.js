import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import EmptyState from "../assest/LoadingState.gif";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.productSlice.cartItems);
  // console.log("cartItems", cartItems);

  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = cartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0);

  const user = useSelector((state) => state.userSlice.currentUser);
  // console.log("user", user);

  const navigate = useNavigate();

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/checkout-payment`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cartItems),
        }
      );
      if (res.statusCode === 500) return;
      const data = await res.json();
      // console.log("data", data);

      toast("Redirect to payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("You haven't logged in");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      {cartItems.length > 0 ? (
        <div className="my-4 flex gap-3">
          {/* display card items */}
          <div className="w-full max-w-3xl">
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
          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span>
                {totalPrice}
              </p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-400 w-full text-lg font-bold py-2 text-white border-none rounded"
              onClick={handlePayment}
            >
              Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center flex-col">
          <img src={EmptyState} className="w-full max-w-sm" />
          <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
