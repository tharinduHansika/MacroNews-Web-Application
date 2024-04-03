import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBehance } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faDribbble } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function page() {
    return (
        <div className="bg-slate-950 w-full mt-8 px-4 2xl:px-80 xl:px-64 lg:px-32 py-20">
        <div className=" h-auto flex flex-col lg:flex-row">
          <div className="w-full">
            <h3 className="text-xl font-semibold text-white mb-10">News Categories</h3>
            <ul>
              <li className="mb-3">
                <a href="" className="text-slate-500">Social</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Foriegn</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Sports</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500" >Business</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Technology</a>
              </li>
            </ul>
          </div>

          <div className=" w-full">
          <h3 className="text-xl font-semibold text-white mb-10">Explore</h3>
            <ul>
              <li className="mb-3">
                <a href="" className="text-slate-500">About</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Careers</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Guides</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500" >Terms of Service</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Contact</a>
              </li>
            </ul>
          </div>

          <div className="w-full">
          <h3 className="text-xl font-semibold text-white mb-10">languages</h3>
            <ul>
              <li className="mb-3">
                <a href="" className="text-slate-500">Sinhala</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Tamil</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">English</a>
              </li>
              
            </ul>
          </div>

          <div className=" w-full"></div> 

          <div className=" w-full">
          <h3 className="text-xl font-semibold text-white mb-10">Quick Links</h3>
            <ul>
              <li className="mb-3">
                <a href="" className="text-slate-500">Gossips</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Trending</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">Entertainment</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500" >Education</a>
              </li>
              <li className="mb-3">
                <a href="" className="text-slate-500">24x7</a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="flex flex-row w-full h-12 px-0 pt-5 justify-between">
          <h3 className="text-white">Copyright ©2024 All rights reserved | <span className="text-red-500">Tharindu Hansika</span></h3>

          {/* <div className="flex flex-row gap-4">
            <div className="bg-red-500 w-6 h-6"></div>
            <div className="bg-red-500 w-6 h-6"></div>
            <div className="bg-red-500 w-6 h-6"></div>
            <div className="bg-red-500 w-6 h-6"></div>
          </div> */}
        </div>
      </div>
    )
}
