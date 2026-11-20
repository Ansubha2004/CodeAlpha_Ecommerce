import React from "react";

function Home() {
  return (
    <section id="home"  className="relative my-40 flex flex-col items-center z-[1] box-border">
        <div className="max-w-6xl  mx-auto px-2 text-5xl font-bold text-slate-900 cursor-pointer">
          DISCOVER <span className="text-blue-600">AMAZING PRODUCTS</span>
        </div>
        <p className="text-slate-500 text-center max-w-2xl my-6 text-lg">Shop the latest trends and find everything you need with fast shipping and unbeatable prices</p>
     
    </section>
  );
}

export default Home;
