
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


export default function page({ _id, title, category, status, description, image, date }) {
  return (
    <div>
      <div className="bg-slate-500 min-w-44 h-52 px-6 relative" style={{ backgroundImage: `url("${image}")`, backgroundSize: 'auto', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', overflow: 'hidden' }}>
        <div className="bg-red-700 py-2 px-3 w-28 mb-2 absolute bottom-2">
          News Box
        </div>
      </div>

      <div className="p-4">
        <Link href={`pages/News_Article/${_id}`} className="block"> {/* Make the title a Link */}
          <h3 className="text-black text-base font-semibold">{title}</h3>
        </Link>

        <div className="flex flex-row mb-2">
          {/* <div className=" w-24 h-4 mr-0 flex flex-row">
                    <FontAwesomeIcon icon={faUser} className="mr-1 p-1 text-black"/>
                    <h6 className= "text-xs text-black">John Smith</h6>
                  </div> */}
          <div className=" w-30 h-4 mr-2 flex flex-row">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-1 text-black" />
            <h6 className="text-xs text-black">{date}</h6>
          </div>
          {/* <div className=" w-30 h-4 mr-2 flex flex-row">
                    <FontAwesomeIcon icon={faComment} className="mr-1 p-1 text-black"/>
                    <h6 className= "text-xs text-black">08 Comments</h6>
                  </div> */}
        </div>

        <h3 className="text-black text-sm truncate-3-lines overflow-hidden h-10 md:h-16 mt-3">
          {description}
        </h3>

      </div>
    </div>
  )
}