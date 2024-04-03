'use client'

import { useRouter } from 'next/router';
 
import { useState } from 'react'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    

    return (
        <div className="w-full px-4 lg:px-32 xl:px-64 2xl:px-80">
            <div className="bg-slate-950 h-20 flex justify-between items-center">
                <div>
                    <nav className="container mx-auto pb-6">
                        {/* Toggle button for mobile view */}
                        <button
                            className="text-white lg:hidden pl-2 sm:ml-6 mt-6"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <FontAwesomeIcon  icon={faTimes} />
                            ) : (
                                <FontAwesomeIcon icon={faBars} />
                            )}
                        </button>


                        {/* Navigation links */}
                        <ul
                            className={`${
                                isMenuOpen ? 'block' : 'hidden'
                            } lg:flex justify-between items-center mt-0 px-4 py-4 lg:px-0 lg:py-0 bg-slate-950 absolute`}
                        >
                            

                            <Link href="/">
                                <li className="text-white hover:text-gray-300 ml-4">
                                    Home
                                </li>
                            </Link>
                            
                            
                            <Link href="../../../../pages/Social" >
                                <li className="text-white hover:text-gray-300 ml-4">
                                    Social
                                </li>
                            </Link>
                            <Link href="../../../../pages/Foreign">
                                <li className="text-white hover:text-gray-300 ml-4">
                                    Foriegn
                                </li>
                            </Link>
                            <Link href="../../../../pages/Sports">
                                <li className="text-white hover:text-gray-300 ml-4">
                                    Sports
                                </li>
                            </Link>
                            <Link href="../../../../pages/Business">
                                <li className="text-white hover:text-gray-300 ml-4">
                                    Business
                                </li>
                            </Link>
                            <Link href="../../../../pages/Weather">
                                <li className="text-white hover:text-gray-300 ml-4" >
                                    Weather
                                </li>
                            </Link>

                        </ul>
                    </nav>
                </div>
                {/* Search input */}
                <div className=" px-1 lg:px-6 ">
                    <input
                        type="text"
                        placeholder=" Search..."
                        className="search-input px-1 py-2"
                    />
                    <button className="search-button h-4 w-4 ml-2">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>
    );
}
