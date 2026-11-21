import React, { useState, useEffect } from "react";
import Productcard from "../components/productcard.jsx";
import axios from "axios";

function Home({ selectedCategory, searchProduct }) {
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const result = await axios.get(
          `${url}/productapi/getproduct/${selectedCategory}?search=${searchProduct.trim()}`,
        );
        setProducts(result.data.data);
      } catch (error) {
        console.error("Error Fetching product data", error);
      }
    };
    fetchproducts();
  }, [selectedCategory, searchProduct, url]);

  return (
    <section
      id="home"
      className="relative mt-40 flex flex-col justify-center items-center z-[1] box-border"
    >
      <div className="max-w-6xl  mx-auto px-2 text-5xl font-bold text-slate-900 cursor-pointer">
        DISCOVER <span className="text-blue-600">AMAZING PRODUCTS</span>
      </div>
      <p className="text-slate-500 text-center max-w-2xl my-6 text-lg">
        Shop the latest trends and find everything you need with fast shipping
        and unbeatable prices
      </p>
      <div className="w-[90%] my-6 grid grid-cols-5 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Productcard
              key={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              category={product.category}
            />
          ))
        ) : (
          <div className="col-span-5 w-full flex flex-col items-center justify-center py-16">
            <h2 className="text-2xl font-semibold text-slate-800">
              No Products Found!
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Try searching with a different keyword or selecting another
              category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
