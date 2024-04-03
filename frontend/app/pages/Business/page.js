"use client"

import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

import Image from "next/image";
import TextField from '@mui/material/TextField';
import Header_1 from "../../components/Header_1/page";
import Header_2 from "../../components/Header_2/page";
import Card_1 from "../../components/News_Cars/Card_1/page";
import Card_2 from "../../components/News_Cars/Card_2/page";
import Card_3 from "../../components/News_Cars/Card_3/page";
import NewsLetter from "../../components/News_Letter/page";
import Footer from "../../components/Footer/page";
import axiosInstance from "@/app/utils/axiosInstance";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

    const [sortedData, setSortedData] = useState([]);
    const [card1Data, setCard1Data] = useState([]);

    // get all
    const fetchCardData = async () => {
        try {
            const response = await axiosInstance.get('news/filter/by-category/Business');
            const sortedData = response.data.sort((a, b) => {
                // Compare dates as strings (YYYY-MM-DD format)
                if (a.date > b.date) return -1; // Sort descending
                if (a.date < b.date) return 1; // Sort ascending
                return 0; // Dates are equal
            });
            setCard1Data(response.data); // Assuming response data is an array of objects
            setSortedData(sortedData)
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useEffect(() => {


        fetchCardData();
    }, []);


    return (
        <main className="flex flex-col items-center justify-between bg-slate-200">
            <Header_1></Header_1>
            <div className="mt-14 w-full h-52 flex flex-row items-center justify-center bg-cover object-cover object-center" style={{ backgroundImage: `url('/images/Banner1.png')` }}>

                <img
                    src="/images/bannerLogo.png"
                    className="w-auto lg:h-2/3 object-cover object-center z-10 h-20"
                />
            </div>
            <Header_2></Header_2>

            <div className="h-auto w-full gap-4 py-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
                <div className="w-full h-72 flex flex-row items-center justify-center bg-cover object-cover object-center py-4" style={{ backgroundImage: `url('/images/Banner2.png')` }}>
                    <h3 className="text-6xl font-semibold text-center">Business</h3>
                </div>
            </div>


            <div className=" w-full mb-6 px-4 2xl:px-80 xl:px-64 lg:px-32">
                <h3 className="text-black bg-white p-2"><span className="text-red-600 ml-2">Breaking News:</span> Astronomy Binoculars A Great Alternative</h3>
            </div>


            <div className="flex flex-col w-full lg:flex-row h-auto gap-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
                <div className="lg:basis-2/3 2xl:basis-2/3 bg-white p-4">
                    {/* <div className="bg-slate-950 h-12 p-2 mb-4">
                        <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
                    </div> */}

                    {/* <Card_1></Card_1>

                    <Card_1></Card_1>

                    <Card_1></Card_1>

                    <Card_1></Card_1>

                    <Card_1></Card_1>

                    <Card_1></Card_1> */}

                    {/* <div className="bg-slate-500 h-44 px-6"></div> */}
                    <div>
                        {card1Data.map((data, index) => (
                            <Card_1 key={index} {...data} />
                        ))}
                    </div>

                </div>

                <div className="lg:basis-1/3 bg-white p-4">
                    <div className="bg-slate-950 h-12 p-2 mb-4">
                        <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
                    </div>
                    <div className="bg-white h-auto">
                        {/* <Card_2></Card_2> */}
                        <Card_2 {...sortedData[0]}></Card_2>

                        <div className="px-4">
                            {/* <hr></hr>
                            <Card_3></Card_3>

                            <hr></hr>
                            <Card_3></Card_3>

                            <hr></hr>
                            <Card_3></Card_3> */}

                            {sortedData.map((data, index) => (
                                <> <Card_3 key={index} {...data} />
                                    <hr></hr></>

                            ))}
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
                </div>
            </div>




            <Footer></Footer>

        </main>
    );
}
