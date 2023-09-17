import { useSelector } from "react-redux";
import CommonCard from "../components/CommonCard";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useRef } from "react";
import AllProduct from "../components/AllProduct";

const Home = () => {
  const allProduct = useSelector((state) => state.productSlice.productList);
  // console.log("allProduct", allProduct);
  const homeProductCardList = allProduct.slice(1, 5);
  const homeProductCardListVegetables = allProduct.filter(
    (el) => el.category === "vegetable",
    []
  );
  // console.log("homeProductCardListVegetables", homeProductCardListVegetables);

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="P-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCU9VPqnT07U0kzDQVF4L5gpvgo_h_LAau2Q&usqp=CAU"
              alt=""
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-red-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam,
            expedita voluptas saepe, possimus natus ducimus eveniet commodi,
            modi debitis amet quam itaque nulla! Laborum laboriosam architecto
            officiis expedita esse aspernatur.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCardList[0]
            ? homeProductCardList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index} loading={"Loading..."} />;
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCardListVegetables[0]
            ? homeProductCardListVegetables.map((el) => {
                return (
                  <CommonCard
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CommonCard loading="Loading..." key={index} />
              ))}
        </div>
      </div>
      <AllProduct heading={"Your Product"} />
    </div>
  );
};

export default Home;
