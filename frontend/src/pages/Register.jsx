import React, { useState } from "react";
import { User, Mail, LockKeyhole, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register({refreshUser}) {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    const shallowcopy = { ...formdata };
    shallowcopy[name] = value;
    setformdata(shallowcopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formdata;
    if (!name || !email || !password) {
      console.log("Fill all the parameters!!");
      return;
    }

    if (password.length < 8) {
      alert("Set a password of minimum 8 characters");
      return;
    }

    try {
      const result = await axios.post(`${url}/authapi/register`, formdata, {
        withCredentials: true,
      });
      if (result.data.success) {
        

        setformdata({
          name: "",
          email: "",
          password: "",
        });
        await refreshUser();
        navigate("/");
        alert("Registration successful!");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("registraion failed!!")
    }
  };

  return (
    <section
      id="Register"
      className="relative mt-25 flex justify-center items-center px-4 py-10 z-[1] box-border"
    >
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-10">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold text-blue-950">
            Create an Account
          </h1>

          <p className="text-gray-600 mt-3 text-lg">Join ShopxEase today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
            <User size={21} className="text-slate-800 shrink-0" />

            <input
              type="text"
              onChange={handlechange}
              name="name"
              value={formdata.name}
              placeholder="Full Name"
              required
              className="w-full outline-none border-none px-4 text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
            <Mail size={21} className="text-slate-800 shrink-0" />

            <input
              type="email"
              onChange={handlechange}
              name="email"
              value={formdata.email}
              placeholder="Email Address"
              required
              className="w-full outline-none border-none px-4 text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
            <LockKeyhole size={21} className="text-slate-800 shrink-0" />

            <input
              type="password"
              onChange={handlechange}
              value={formdata.password}
              placeholder="Password"
              required
              name="password"
              className="w-full outline-none border-none px-4 text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 hover:bg-blue-900 text-white font-semibold text-lg py-3 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
