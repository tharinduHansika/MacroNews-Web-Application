'use client';

import { useState, useEffect } from 'react';
import Dashboard from "../../components/Admin_Dashboard/Dashboard/page";
import Add_News from "../../components/Admin_Dashboard/Add_News/page";
import News_Filter from "../../components/Admin_Dashboard/News_Filter/page";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/utils/axiosInstance';

// -----------------------dashbord---------------------

export default function Home() {
  const [displayComponent, setDisplayComponent] = useState('Dashboard');
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleClick = (componentName) => {
    setDisplayComponent(componentName);
    setActiveItem(componentName);
  };

  const verifyToken = async (token) => {
    try {
      const response = await axiosInstance.post(
        'user/verify',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('verified');
      }
    } catch (error) {
      console.log('authentication error : ' + error.message);
      router.push('/');
    }
  };

  useEffect(() => {
    try {
      const token = Cookies.get('token');
      if (token !== undefined) {
        verifyToken(token);
      } else {
        router.push('pages/login');
      }
    } catch (error) {
      alert('validaton error : ' + error.message);
      router.push('pages/login');
    }
  }, []);

  function clearTokenAndNavigateToRoot() {
    // Clear the token cookie
    Cookies.remove('token');

    router.push('/');
  }

  return (
    <main className="flex flex-col items-center justify-between bg-slate-200 ">

      <div className="bg-slate-100 w-full min-h-screen grid grid-cols-6 grid-rows-1 gap-8">
        <div className="h-screen bg-white p-3 pt-32">
          <div className={`mt-2 hover:bg-slate-200 hover:border-l-4 border-red-500 hover:shadow-md w-full h-12 py-3 pl-6 ${activeItem === 'Dashboard' ? 'border-l-4 border-red-500 bg-slate-100' : ''}`} role="button" onClick={() => handleClick('Dashboard')}>
            <h3 className="text-slate-700">Dashboard</h3>
          </div>
          <div className={`mt-2 hover:bg-slate-200 hover:border-l-4 border-red-500 hover:shadow-md w-full h-12 py-3 pl-6 ${activeItem === 'Add News' ? 'border-l-4 border-red-500 bg-slate-100' : ''}`} role="button" onClick={() => handleClick('Add News')}>
            <h3 className="text-slate-700">Add News</h3>
          </div>
          <div className={`mt-2 hover:bg-slate-200 hover:border-l-4 border-red-500 hover:shadow-md w-full h-12 py-3 pl-6 ${activeItem === 'News Filter' ? 'border-l-4 border-red-500 bg-slate-100' : ''}`} role="button" onClick={() => handleClick('News Filter')}>
            <h3 className="text-slate-700">News Filter</h3 >
          </div>


          <div className={`mt-2 hover:bg-slate-200 hover:border-l-4 border-red-500 hover:shadow-md w-full h-12 p-3 px-6 `} role="button" onClick={clearTokenAndNavigateToRoot}>
            <h3 className="text-slate-700">Log out</h3>
          </div>


        </div>
        <div className="col-span-5 h-screen">

          <div className="bg-red-500 w-full h-32 flex flex-col items-center justify-center" style={{ backgroundImage: `url('/images/Banner2.png')` }}>
            <h3 className="text-2xl font-semibold text-center">Admin Dashboard</h3>
            <img
              src="/images/bannerLogo.png"
              className="w-auto lg:h-2/5 object-cover object-center z-10 h-4"
            />
          </div>

          {/* --------------------------Dashbord-------------------- */}
          {/* <Dashboard></Dashboard> */}

          {/* --------------------------Add News--------------------- */}
          {/* <Add_News></Add_News> */}

          {/* --------------------------News Filter------------------ */}
          {/* <News_Filter></News_Filter> */}


          {displayComponent === 'Dashboard' && <Dashboard />}
          {displayComponent === 'Add News' && <Add_News />}
          {displayComponent === 'News Filter' && <News_Filter />}

        </div>
      </div>
    </main>
  );
}

