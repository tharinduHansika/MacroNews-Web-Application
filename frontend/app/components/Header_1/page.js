import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBehance } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faDribbble } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


export default function page() {
    return (
        <div className="absolute h-14 w-full bg-slate-950">
            <div className="flex justify-between py-2 px-4 2xl:px-80 xl:px-64 lg:px-32">
                <div>
                    <div>
                        <nav className="container mx-auto">
                            <ul className="flex justify-between content-center items-center gap-3 md:gap-4 h-4 mt-2">
                                
                                <li>
                                    <a className="text-white hover:text-gray-300 ml-0 md:ml-4">
                                    <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>

                                <li>
                                    <a className="text-white hover:text-gray-300 ml-0 md:ml-4">
                                    <FontAwesomeIcon icon={faFacebookF} size="1x" className="h-4"/>
                                    </a>
                                </li>

                                <li>
                                    <a className="text-white hover:text-gray-300 ml-0 md:ml-4">
                                    <FontAwesomeIcon icon={faBehance}/>
                                    </a>
                                </li>

                                <li>
                                    <a className="text-white hover:text-gray-300 ml-0 md:ml-4">
                                    <FontAwesomeIcon icon={faDribbble}/>
                                    </a>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>

                {/* <div className='flex flex-row'>
                    <h3 className="text-white hover:text-gray-300 ml-4 mt-2">+440 012 3654 896</h3>
                    <h3 className="text-white hover:text-gray-300 ml-4 mt-2">support@colorlib.com</h3>
                </div> */}

                <div className='flex flex-row'>
                    <ul className='flex justify-between content-center items-center gap-3 md:gap-4 h-4 mt-2'>
                        <li className='hidden md:block'>
                            <h3 className="text-white hover:text-gray-300 ml-4 mt-2">+440 012 3654 896</h3>
                        </li>

                        <li className='hidden md:block'>
                            <h3 className="text-white hover:text-gray-300 ml-4 mt-2">info@macronews.com</h3>
                        </li>

                        <li className='md:hidden mt-1'>
                            <a className="text-white hover:text-gray-300 ml-1">
                                <FontAwesomeIcon icon={faPhone} size="sm"/>
                            </a>
                        </li>

                        <li className='md:hidden mt-1'>
                            <a className="text-white hover:text-gray-300 ml-1">
                                <FontAwesomeIcon icon={faEnvelope} size="sm"/>
                            </a>
                        </li>


                        <Link href="../../../../pages/Sign_Up">
                            <li className=' bg-slate-100 rounded-full mt-1 lg:mt-2 px-2 py-0'>
                                <FontAwesomeIcon icon={faUser} size="xs" className="text-slate-950 hover:text-slate-300 "/>
                            </li>
                        </Link>
                        

                        {/* <Link href="../../../../pages/News_List">
                            <li className="bg-slate-100 hover:bg-slate-500 h-6 rounded-full mt-0 p-2">
                                <FontAwesomeIcon icon={faUser} size="xs" className="text-slate-950 hover:text-slate-300"/>
                            </li>
                        </Link> */}
                    </ul>
                    
                </div>

            </div>
        </div>
    )
}
