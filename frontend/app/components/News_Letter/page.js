
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faCalendarAlt, faComment } from '@fortawesome/free-solid-svg-icons';


export default function page() {
    return (
        <div id="newsLetter" className='mb-8'>
            <div className="bg-slate-950 h-12 p-2 mb-4 mt-8">
              <h3 className="text-white m-1 ml-2 mb-2">Newsletter</h3>
            </div>

            <h3 className="text-black mb-4">Here, I focus on a range of items andfeatures that we use in life without giving them a second thought.</h3>

            <div className="flex flex-row mt-2 mb-2">
              <input
                type="text"
                placeholder=" Email Address"
                className="search-input p-1"
              />
              <button className="search-button h-auto w-auto bg-red-600 py-2 px-8">
                Subscribe
              </button>
            </div>

            <h3 className="text-black mb-4">You can unsubscribe us at any time</h3>
          </div>
    )
}