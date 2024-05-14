import { Outlet } from "react-router-dom";
import  { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import { useEffect } from "react";
import { setDataProduct } from "./redux/Features/ProductSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
      const resData = await res.json();
      // console.log("resData", resData);
      dispatch(setDataProduct(resData));
    })();
  }, [dispatch]);
  return (
    <div>
      <Toaster />
      <Header />
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
