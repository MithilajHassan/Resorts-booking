import { FaMapMarkerAlt } from "react-icons/fa";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SortResorts from "./ResortSort";


const SearchResults = () => {
  const { availableRooms } = useSelector((state: RootState) => state.availableRsorts)

  return (
    <div className="w-full sm:w-3/4 p-4 space-y-6">
      <SortResorts />
      {availableRooms.length > 0 ? (
        availableRooms.map((resort, index) => (
          <Link
            to={`/resortdetails/${resort.resort._id}`}
            key={index} // Place key on Link
            className="block mb-3"
          >
            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-full sm:w-1/3">
                <img
                  src={resort.resort.images[0]}
                  alt={resort.resort.resortName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="w-full sm:w-2/3 flex flex-col justify-center">
                <h2 className="text-xl text-blue-500 font-bold mb-2">
                  {resort.resort.resortName}
                </h2>
                <p className="text-gray-700 font-semibold">{resort.resort.city}</p>
                <p className="text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-red-500" />
                  {resort.resort.address}
                </p>
                <p className="text-gray-600 mt-2">
                  {resort.resort.description.slice(0, 150)}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-red-600">No available resorts found.</p>
      )}
    </div>
  );
};

export default SearchResults