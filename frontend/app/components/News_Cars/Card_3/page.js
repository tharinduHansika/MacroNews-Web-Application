
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';


export default function page({ title, category, status, description, image, date }) {
  return (
    <div id="smallest" className="flex flex-row lg:max-w-60">
      {/* <div className="bg-slate-800 w-32 h-20 mt-5">
                  </div> */}

      <div className="py-4">
        <h3 className="text-black text-sm mb-4 font-semibold">{title}</h3>

        <div className="flex flex-row mb-2">

          <div className=" w-30 h-4 mr-2 flex flex-row">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1 p-1 text-black" />
            <h6 className="text-xs text-black">{date}</h6>
          </div>
          <div className=" w-30 h-4 mr-2 flex flex-row">
            <FontAwesomeIcon icon={faComment} className="mr-1 p-1 text-black" />
            <h6 className="text-xs text-black">08 Comments</h6>
          </div>
        </div>
        <div>
          <h1 className="text-black text-sm truncate-3-lines overflow-hidden h-10 md:h-16">
            {/* Lorem ipsum dolor sit amet, consecteturadip isicing elit, sed do eiusmod tempor incididunt. */}
            {description}
          </h1>
        </div>
      </div>

    </div>
  )
}