'use client'

import Link from "next/link"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import axiosInstance from '@/app/utils/axiosInstance';

import CircularProgress from '@mui/material/CircularProgress';

export default function page() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const router = useRouter();


  const [loading, setLoading] = useState(false);

  //isLogged for spinner
  const [isLogged, setIsLogged] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const response = await fetch("/api/signup", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json"
  //             },
  //             body: JSON.stringify(userData)
  //         });
  //         if (response.ok) {
  //             console.log("Sign up successful");
  //             // Optionally, redirect or show success message
  //         } else {
  //             console.error("Sign up failed");
  //             // Optionally, show error message
  //         }
  //     } catch (error) {
  //         console.error("Error signing up:", error);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userData.email)) {
      alert('Invalid email address');
      return;
    }

    if (userData.password === '') {
      alert('Password cannot be empty!');
      return;
    }

    try {
      setLoading(true);
      setIsLogged(true);
      const response = await axiosInstance.post('user/login', userData);
      console.log(response); // Log the response (e.g., token)

      // Set token expiration based on "Remember me" checkbox
      Cookies.set('token', response.data.token, {
        expires: 1,
      });

      //   setUser({ ...response.data.user, token: response.data.token });

      alert('Login Successful!');
      router.push('/pages/Admin_Dashboard');
    } catch (err) {
      setLoading(false);
      setIsLogged(true);
      alert('Failed: Please check the username and password');
      console.error('Error logging in:', err);
    }
  };


  // isLogged ? console.log("can't log") : console.log("can log");

  return (

    <div className="flex flex-row items-center justify-center w-screen h-screen bg-white">
      <div className=" flex flex-col gap-4 py-8 rounded-lg  shadow-lg">
        <h3 className="text-red-600 font-semibold text-3xl text-center">Login</h3>

        <form >
          <div className="mx-8 mb-2">
            <h3 className="text-black mb-1">Email</h3>
            <input type="text" name="email" value={userData.email} onChange={handleChange} placeholder="email" className="w-full border-2 border-slate-300 rounded-lg p-2 text-black"></input>
          </div>

          <div className="mx-8 mb-2">
            <h3 className="text-black mb-1">Password</h3>
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="password" className="w-full border-2 border-slate-300 rounded-lg p-2 text-black"></input>
          </div>


          {/* <Link href="../pages/Admin_Dashboard"> */}
          <div className="px-8 py-3 bg-blue-500 rounded-lg mx-8 text-center" role="button" onClick={handleSubmit}>
            Login
          </div>
          {/* </Link> */}
        </form>

      </div>
    </div>
  );
}