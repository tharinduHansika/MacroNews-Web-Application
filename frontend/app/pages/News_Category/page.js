import Image from "next/image";
import TextField from '@mui/material/TextField';
import Header_1 from "../../components/Header_1/page";
import Header_2 from "../../components/Header_2/page";
import Card_1 from "../../components/News_Cars/Card_1/page";
import Card_2 from "../../components/News_Cars/Card_2/page";
import Card_3 from "../../components/News_Cars/Card_3/page";
import NewsLetter from "../../components/News_Letter/page";
import Footer from "../../components/Footer/page";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-white">
        <Header_1></Header_1>
        <div className="bg-red-500 w-full h-52"></div>
        <Header_2></Header_2>
      
        <div className="h-auto w-full gap-4 py-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
            <div className="bg-red-500 h-96 flex flex-col items-center justify-center">
                <h3 className="text-6xl font-semibold text-center">Image News</h3>
            </div>
        </div>

        <div className=" w-full mb-6 px-4 2xl:px-80 xl:px-64 lg:px-32">
            <h3 className="text-black bg-slate-200 p-2"><span className="text-red-600 ml-2">Breaking News:</span> Astronomy Binoculars A Great Alternative</h3>
        </div>


        <div className="flex flex-col w-full lg:flex-row h-auto gap-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
            <div className="lg:basis-2/3 2xl:basis-2/3 bg-fuchsia-400 p-4">
                <div className="bg-slate-950 h-12 p-2 mb-4">
                    <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
                </div>

                <Card_1></Card_1>

                <Card_1></Card_1>

                <Card_1></Card_1>

                <Card_1></Card_1>

                <Card_1></Card_1>

                <Card_1></Card_1>

                <div className="bg-slate-500 h-44 px-6"></div>

                
            </div>

            <div className="lg:basis-1/3 bg-fuchsia-300 p-4">
                <div className="bg-slate-950 h-12 p-2 mb-4">
                    <h3 className="text-white m-1 ml-2 mb-2">Latest News</h3>
                </div>
                <div className="bg-white h-auto">
                    <Card_2></Card_2>

                    <div className="px-4">
                        <hr></hr>
                        <Card_3></Card_3>

                        <hr></hr>
                        <Card_3></Card_3>

                        <hr></hr>
                        <Card_3></Card_3>
                    </div>
                </div>

             {/* <NewsLetter></NewsLetter> */}

                <div className="bg-slate-950 h-12 p-2 mb-4">
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
                </div>
            </div>
        </div>


        <Footer></Footer>
    
    </main>
  );
}
