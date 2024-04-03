"use client"

import Link from "next/link"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/utils/axiosInstance';
export default function page (){

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const router = useRouter();

    const [loading, setLoading] = useState(false);

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
    
        const isEmptyField = Object.values(userData).some((value) => value === '');
    
        if (isEmptyField) {
          alert('Please fill in all fields.');
          return;
        }
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
          alert('Invalid email format');
          return;
        }
    
        // Validate password format (at least 1 uppercase letter, 1 number, and 6 characters minimum)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(userData.password)) {
          alert(
            'Password must contain at least 1 uppercase letter, 1 number, and be 6 characters minimum'
          );
          return;
        }
    
        // Validate password match
        // if (userData.password !== userData.confirmPassword) {
        //   alert('Passwords do not match');
        //   return;
        // }
    
        try {
          setLoading(true);
          const response = await axiosInstance.post('/user/signup', userData);
          console.log(response.data);
          router.push('/pages/Login');
          alert('Registration successful!');
        } catch (err) {
          setLoading(false);
          console.error('Error registering user:', err);
          alert('Failed to register. Please try again later.');
        }
      };



    return (
        <div className="flex flex-row items-center justify-center w-screen h-screen bg-white">
            <div className=" flex flex-col gap-4 py-8 rounded-lg  shadow-lg">
                <h3 className="text-red-600 font-semibold text-3xl text-center">Sign Up</h3>


            <form >
                <div className="mx-8 mb-2">
                    <h3 className="text-black mb-1">User</h3>
                    <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            placeholder="username"
                            className="w-full border-2 border-slate-300 rounded-lg p-2 text-black"
                    />
                </div>

                <div className="mx-8 mb-2">
                    <h3 className="text-black mb-1">Email</h3>
                    <input type="text" name="email" placeholder="email" value={userData.email} onChange={handleChange} className="w-full border-2 border-slate-300 rounded-lg p-2 text-black"></input>
                </div>

                <div className="mx-8 mb-2">
                    <h3 className="text-black mb-1">Password</h3>
                    <input type="password" name="password" placeholder="password" value={userData.password} onChange={handleChange} className="w-full border-2 border-slate-300 rounded-lg p-2 text-black"></input>
                </div>

                <div className="mx-8 mb-1 text-center">
                    <h3 className="text-black mb-1">Already sign up? <Link href="../pages/Login" className="text-blue-500">Log in</Link></h3>
                </div>

               


                
                    <div className="px-8 py-3 bg-blue-500 rounded-lg mx-8 text-center" role="button" onClick={handleSubmit}>
                        Sign Up
                    </div>
            
            </form>

            </div>
        </div>
    );
}