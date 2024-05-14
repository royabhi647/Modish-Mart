import React, { useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../assest/logo.png";
import logo from "../assest/Ecommerce-Logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/Features/UserSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.userSlice.currentUser);
  // console.log("userData", userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRedux({}));
    toast("Logout successfully");
  };

  // console.log(process.env.REACT_APP_ADMIN_EMAIL);
  const cartItems = useSelector((state) => state.productSlice.cartItems);
  // console.log("cartItems", cartItems);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} alt="" className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap:7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/64eef06195629d49402d9a7c"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative cursor-pointer">
            <Link to="cart">
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItems.length}
              </div>
            </Link>
          </div>
          <div
            className="text-slate-600"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="text-3xl cursor-pointer h-10 w-10 rounded-full overflow-hidden drop-shadow-md flex items-center">
              {userData.image ? (
                <img src={userData.image} alt="" className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <diV className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newProduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New Product
                  </Link>
                )}

                {userData.image || userData.firstName ? (
                  <p className="cursor-pointer px-2" onClick={handleLogout}>
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/64eef06195629d49402d9a7c"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </diV>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
