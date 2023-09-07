import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommonCard from "./CommonCard";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
  const allProduct = useSelector((state) => state.productSlice.productList);
  const categoryList = [...new Set(allProduct.map((el) => el.category))];
  //   console.log(categoryList);

  // filter data display
  const [activeFilter, setActiveFilter] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(allProduct);
  }, [allProduct]);

  const handleFilterProduct = (category) => {
    setActiveFilter(category);
    const filter = allProduct.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                isActive={el.toLowerCase() == activeFilter.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CommonCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el) => (
              <CommonCard loading="Loading..." />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
