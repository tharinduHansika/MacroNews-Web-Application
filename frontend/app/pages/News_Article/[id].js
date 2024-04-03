import Image from "next/image";
import TextField from '@mui/material/TextField';
import Header_1 from "../../components/Header_1/page";
import Header_2 from "../../components/Header_2/page";
import Card_1 from "../../components/News_Cars/Card_1/page";
import Card_2 from "../../components/News_Cars/Card_2/page";
import Card_3 from "../../components/News_Cars/Card_3/page";
import NewsLetter from "../../components/News_Letter/page";
import Footer from "../../components/Footer/page";
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
export default function Home({ news }) {

    const router = useRouter();
    const { id } = router.query;



    const [news, setNews] = useState(null); // State to store the loaded news data


    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                // Make a GET request to fetch news data by id
                const response = await axios.get(`news?id=${_id}`);
                setNews(response.data); // Set the retrieved news data to state
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        if (id) {
            fetchNewsData(); // Fetch news data only when the id parameter is available
        }
    }, [id]);

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

            {/* <div className="h-auto w-full gap-4 py-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
            <div className="bg-red-500 h-96 flex flex-col items-center justify-center">
                <h3 className="text-6xl font-semibold text-center">Image News</h3>
            </div>
        </div> */}

            <div className=" w-full mb-6 pt-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
                <h3 className="text-black bg-white p-2"> {news.title}</h3>
            </div>


            <div className="flex flex-col w-full lg:flex-row h-auto gap-4 px-4 2xl:px-80 xl:px-64 lg:px-32">
                <div className="lg:basis-2/3 2xl:basis-2/3 bg-white p-4">

                    <div className="bg-slate-500 h-96 px-6"></div>

                    <div className="p-4">
                        <div className="bg-red-500 py-2 px-3 w-28 mt-2 mb-2">
                            {news.category}
                        </div>

                        <h1 className="mb-4 mt-4 text-black text-2xl font-semibold">{news.title}</h1>

                        <div className="flex flex-row mb-8">
                            <div className=" w-24 h-4 mr-4 flex flex-row">
                                <FontAwesomeIcon icon={faUser} className="mr-1 p-0 text-black" />
                                <h6 className="text-xs text-black">John Smith</h6>
                            </div>
                            <div className=" w-28 h-4 mr-4 flex flex-row">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-0 text-black" />
                                <h6 className="text-xs text-black">{news.date}3</h6>
                            </div>
                            <div className=" w-28 h-4 mr-4 flex flex-row">
                                <FontAwesomeIcon icon={faComment} className="mr-1 p-0 text-black" />
                                <h6 className="text-xs text-black">08 Comments</h6>
                            </div>
                        </div>

                        <h3 className="text-black">
                            {news.description}


                        </h3>
                    </div>
                </div>

                <div className="lg:basis-1/3 bg-white p-4">
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

export async function getServerSideProps(context) {
    const { id } = context.params; // Retrieve the id parameter from the URL

    try {
        // Fetch the news data based on the id parameter
        const response = await axiosInstance.get(`news?_id=${id}`);
        const news = response.data; // Retrieved news data

        // Pass the news data as props to the component
        return {
            props: {
                news,
            },
        };
    } catch (error) {
        console.error('Error fetching news data:', error);

        // If an error occurs, return an empty news object
        return {
            props: {
                news: {},
            },
        };
    }
}
