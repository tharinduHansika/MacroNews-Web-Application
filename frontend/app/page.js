"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import TextField from '@mui/material/TextField';
import Header_1 from "../app/components/Header_1/page";
import Header_2 from "../app/components/Header_2/page";
import Card_1 from "../app/components/News_Cars/Card_1/page";
import Card_2 from "../app/components/News_Cars/Card_2/page";
import Card_3 from "../app/components/News_Cars/Card_3/page";
import NewsLetter from "../app/components/News_Letter/page";
import Footer from "../app/components/Footer/page";
import axiosInstance from '@/app/utils/axiosInstance';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  // const card1Data = [
  //   {title: 'title1', category: 'category1', description: 'description1'},
  //   {title: 'title2', category: 'category2', description: 'description2'},
  //   {title: 'title3', category: 'category3', description: 'description3'},
  //   {title: 'title4', category: 'category4', description: 'description4'},
  //   {title: 'title5', category: 'category5', description: 'description15'},
  // ]

  const [card1Data, setCard1Data] = useState([]);
  const [latestData, setLatestData] = useState([]);

  // get all
  const fetchCardData = async () => {
    try {
      const response = await axiosInstance.get('news/all');
      setCard1Data(response.data); // Assuming response data is an array of objects
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  // latest
  const fetchLatest = async () => {
    try {
      const response = await axiosInstance.get('news/latest');
      setLatestData(response.data); // Assuming response data is an array of objects
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  // fetch all
  useEffect(() => {


    fetchCardData();
    fetchLatest()
  }, []);



  return (
    <main className="flex flex-col items-center justify-between bg-slate-200">
      <Header_1></Header_1>
      <div className="mt-14 w-full h-52 flex flex-row items-center justify-center bg-cover object-cover object-center" style={{ backgroundImage: `url('/images/Banner1.png')` }}>
        {/* <img
              src="/images/Banner1.png" 
              className="w-auto h-full object-cover object-center"
            /> */}

        <img
          src="/images/bannerLogo.png"
          className="w-auto lg:h-2/3 object-cover object-center z-10 h-20"
        />
      </div>
      <Header_2></Header_2>

      <div className="grid grid-rows-1 grid-cols lg:grid-cols-3 lg:grid-rows-2 h-auto w-full gap-4 py-4 px-0 2xl:px-80 xl:px-64 lg:px-32">

        {latestData.length > 0 ? <div className="lg:col-span-2 bg-gray-400 lg:row-span-2 h-96 lg:h-auto md:w-auto w-screen object-cover object-center" style={{ backgroundImage: `url(${latestData[0].image.data})`, backgroundSize: 'auto', backgroundPosition: 'center',backgroundRepeat: 'no-repeat', overflow: 'hidden' }}>
          <div className="ml-6">
            <Link href="/pages/News_Article">
              <div className="bg-red-700 py-2 px-3 w-28 mt-44 md:mt-56 lg:mt-72 mb-2" role="button">
                {latestData[0].status}
              </div>
            </Link>

            <h2 className="text-2xl mb-2 truncate-3-lines overflow-hidden text-white">{latestData[0].title}</h2>
            <div className="flex flex-row mb-2">
              <div className=" w-32 h-4 mr-0 flex flex-row">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-0" />
                <h6 className="text-xs">{latestData[0].date}</h6>
              </div>
              <div className=" w-32 h-4 mr-0 flex flex-row">
                <FontAwesomeIcon icon={faComment} className="mr-1 p-0" />
                <h6 className="text-xs">8 comments</h6>
              </div>
            </div>
            <div>
              <h1 className="truncate-3-lines overflow-hidden h-10 text-white text-sm">
                {/* Lorem ipsum dolor sit amet, consecteturadip isicing elit, sed do eiusmod tempor incididunt. */}
                {latestData[0].description}
              </h1>
            </div>
          </div>
        </div> : null}



        {latestData.length > 1 ? <div className="row-start-2 lg:col-start-3 lg:row-start-1 md:w-auto w-screen bg-gray-400 h-96 lg:h-56" style={{ backgroundImage: `url(${latestData[1].image.data})`, backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat', overflow: 'hidden'  }}>
          <div className="ml-6">
            <div className="bg-red-700 py-2 px-3 w-28 mt-44 md:mt-56 lg:mt-16 mb-2">
              {latestData[1].status}
            </div>
            <h2 className="text-2xl mb-2">{latestData[1].title}</h2>
            <div className="flex flex-row mb-2">
              <div className=" w-36 h-4 mr-0 flex flex-row">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-0" />
                <h6 className="text-xs">{latestData[1].date}</h6>
              </div>
              <div className=" w-36 h-3 mr-0 flex flex-row">
                <FontAwesomeIcon icon={faComment} className="mr-1 p-0" />
                <h6 className="text-xs">08 Comments</h6>
              </div>
              
              </div>
              <div>
                {/* <h1 className="truncate-3-lines overflow-hidden h-10 text-white text-sm">
                  {latestData[1].description}
                </h1> */}
            </div>
          </div>
        </div> : null}


        {latestData.length > 2 ? <div className="row-start-3 lg:col-start-3 lg:row-start-2 md:w-auto w-screen bg-gray-400 h-96 lg:h-56" style={{ backgroundImage: `url(${latestData[2].image.data})`, backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat', overflow: 'hidden' }}>
          <div className="ml-6">
            <div className="bg-red-700 py-2 px-3 w-28 mt-44 md:mt-56 lg:mt-16 mb-2">
              {latestData[2].status}
            </div>
            <h2 className="text-2xl mb-2"> {latestData[2].title}</h2>
            <div className="flex flex-row mb-2">
              <div className=" w-36 h-4 mr-0 flex flex-row">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-0" />
                <h6 className="text-xs"> {latestData[2].date}</h6>
              </div>
              <div className=" w-36 h-4 mr-0 flex flex-row">
                <FontAwesomeIcon icon={faComment} className="mr-1 p-0" />
                <h6 className="text-xs">08 Comments</h6>
              </div>
            </div>
            <div>
              {/* <h1 className="truncate-3-lines overflow-hidden h-10 text-white text-sm">
                {latestData[2].description}
              </h1> */}
            </div>
          </div>
        </div> : null}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-4 px-0 2xl:px-80 xl:px-64 lg:px-32">
        {latestData.map((item, index) => (
          <div key={index} className={`lg:col-span-1 lg:row-span-1 h-auto w-auto bg-fuchsia-400`}>
            <div className="ml-6">
              <Link href={`/pages/News_Article/${item._id}`}>
                <div className="bg-red-700 py-2 px-3 mt-2 mb-2" role="button">
                  News Box
                </div>
              </Link>
              <h2 className="text-2xl mb-2">{item.title}</h2>
              <div className="flex flex-row mb-2">
                <div className="w-32 h-4 mr-0 flex flex-row">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-0" />
                  <h6 className="text-xs">{item.date}</h6>
                </div>
                <div className="w-32 h-4 mr-0 flex flex-row">
                  <FontAwesomeIcon icon={faComment} className="mr-1 p-0" />
                  <h6 className="text-xs">{item.comments} Comments</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}



      <div className=" w-full mb-6 px-4 2xl:px-80 xl:px-64 lg:px-32">
        <h3 className="text-black bg-white p-2"><span className="text-red-700 ml-2">Breaking News:</span> Astronomy Binoculars A Great Alternative</h3>
      </div>

      <div className="flex flex-col w-full lg:flex-row h-auto gap-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
        <div className="lg:basis-2/3 2xl:basis-2/3 bg-white p-4">
          <div className="bg-slate-950 h-12 p-2 mb-4">
            <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
          </div>

          {/* <Card_1></Card_1>

          <Card_1></Card_1>

          <Card_1></Card_1>

          <Card_1></Card_1>

          <Card_1></Card_1>

          <Card_1></Card_1> */}


          <div>
            {card1Data.map((data, index) => (
              <Card_1 key={index} {...data} />
            ))}
          </div>

          {/* <div className="bg-slate-500 h-44 px-6">
          </div> */}
        </div>

        <div className="lg:basis-1/3 bg-white p-4">
          <div className="bg-slate-950 h-12 p-2 mb-4">
            <h3 className="text-white m-1 ml-2 mb-2">Breaking News</h3>
          </div>
          <div className="bg-white h-auto">
            <Card_2 {...latestData[0]}></Card_2>

            <div className="px-4">

              {latestData.map((data, index) => (
                <> <Card_3 key={index} {...data} />
                  <hr></hr></>

              ))}
              {/* <hr></hr>
              <Card_3></Card_3>

              <hr></hr>
              <Card_3></Card_3>

              <hr></hr>
              <Card_3></Card_3> */}
            </div>
          </div>

          {/* <NewsLetter></NewsLetter> */}

          {/* <div className="bg-slate-950 h-12 p-2 mb-4">
            <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
          </div>
          <div className="bg-white h-auto">

            <div className="px-4">
              <hr></hr>
              <Card_3></Card_3>

              <hr></hr>
              <Card_3></Card_3>

              <hr></hr>
              <Card_3></Card_3>
            </div>
          </div> */}

          {/* <div className="bg-slate-950 h-12 p-2 mb-6 mt-8">
            <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
          </div> */}
        </div>
      </div>

      <Footer></Footer>

    </main>
  );
}
