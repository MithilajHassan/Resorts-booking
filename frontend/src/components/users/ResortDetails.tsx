import { useResortDetailsQuery } from "../../slices/userApiSlice"
import { useParams } from "react-router-dom"
import { FaMapMarkerAlt } from "react-icons/fa"
import { Card, CardContent } from "../ui/card"

function ResortDetails() {
  const { id } = useParams()
  const { data: resort } = useResortDetailsQuery(id!)



  return (
    <section className="flex items-center justify-center bg-white p-6 mt-12">
      <div className=" w-full p-8 rounded-md">

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-4">{resort?.resortName}</h1>
            <p className="flex items-center text-gray-600 text-md">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {resort?.address}, India
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2 w-3/5">
          {resort?.images && (
            <>
              <div className="col-span-2">
                <img
                  src={resort.images[0]}
                  alt={resort?.resortName}
                  className="w-full h-64 rounded-xl object-cover"
                />
              </div>
              {resort.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Resort Image ${index + 2}`}
                  className="w-full h-32 rounded-xl object-cover"
                />
              ))}
            </>
          )}
        </div>

        <div className="mt-4 flex justify-between items-start ">
          <p className="text-black text-md w-3/5">{resort?.description}</p>

          <Card className=" w-1/4">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-center">Facilities</h3>
              <ul className="text-blue-700 flex flex-wrap gap-3 font-semibold">
                {resort?.facilities?.map((facility, index) => (
                  <li key={index}>{typeof facility === "string"
                    ? facility
                    : facility?.facilityName}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  )
}

export default ResortDetails