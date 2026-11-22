import React,{useState} from "react";
import { Mail, LockKeyhole } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Login({refreshUser}) {

  const [formdata,setformdata]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate();
  const url = import.meta.env.VITE_API_URL;


  const handlechange=(e)=>{
    const {name,value}=e.target;
    const shallowcopy={...formdata};
    shallowcopy[name]=value;
    setformdata(shallowcopy);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email,password}=formdata;
    if(!email || !password)
    {
      console.log("Fill all parameters");
      return 
    }
    try{
      const result = await axios.post(`${url}/authapi/login`,formdata,{ withCredentials: true,});
      if (result.data.success) {
        

        setformdata({
          name: "",
          email: "",
          password: "",
        });
        await refreshUser();
        navigate("/");
        alert("Login successful!");
      } 

    }
    catch(error)
    {
      console.error("Login Error:", error);
      alert("Login error!!")
    }
  };

  return (
    <section
      id="login"
      className="relative mt-30 flex justify-center items-center px-4 py-10 z-[1] box-border"
    >
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-10">
        <div className="text-center mb-9">
          <h1 className="text-3xl font-bold text-blue-950">
            Login to ShopxEase
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Welcome back! Please login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
            <Mail size={21} className="text-slate-800 shrink-0" />

            <input
              type="email"
              name="email"
              onChange={handlechange}
              value={formdata.email}
              placeholder="Email Address"
              required
              className="w-full outline-none border-none px-4 text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
            <LockKeyhole size={21} className="text-slate-800 shrink-0" />

            <input
            name="password"
            value={formdata.password}
              type="password"
              onChange={handlechange}
              placeholder="Password"
              required
              className="w-full outline-none border-none px-4 text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold text-lg py-3 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
