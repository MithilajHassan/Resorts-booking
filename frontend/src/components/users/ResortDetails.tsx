import { useResortDetailsQuery } from "../../slices/userApiSlice"
import { useParams } from "react-router-dom"
import { FaMapMarkerAlt } from "react-icons/fa"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"

function ResortDetails() {
  const { id } = useParams()
  const { data: resort } = useResortDetailsQuery(id!)



  return (
    <section className=" bg-white p-2 mt-20">
      <div className="w-full flex flex-col items-center justify-center">

        <div className="flex">
          <div className="me-2">
            <div className="mb-4">
              <h1 className="text-xl font-bold mb-4">{resort?.resortName}</h1>
              <p className="flex items-center text-gray-600 text-md">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {resort?.address}
              </p>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-2">
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
          </div>

          <div>
            <div className="mt-24 flex justify-center items-center relative mb-2">
              <img
                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1600,c_limit/GoogleMapTA.jpg"
                className="w-48 rounded-md"
                alt="" />
              <Button className="bg-blue-600 hover:bg-blue-400 absolute" size={"sm"}>Show on map</Button>
            </div>
            <div>
            <Card className="bg-gray-100">
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

        </div>


        <div className="mt-4 flex">
          <div className="mx-32">
            <p className="text-black text-md">{resort?.description}</p>
          </div>

          {/* <div>
            <Card className="">
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
          </div> */}
        </div>

      </div>
    </section>
  )
}

export default ResortDetails