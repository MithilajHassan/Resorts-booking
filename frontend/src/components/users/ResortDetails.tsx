import { useResortDetailsQuery } from "../../slices/userApiSlice"
import { useParams } from "react-router-dom"
import { FaMapMarkerAlt, FaWindowClose } from "react-icons/fa"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useState } from "react"
import MapComponent from "../common/Map"

function ResortDetails() {
  const { id } = useParams()
  const { data: resort } = useResortDetailsQuery(id!)
  const [showMap, setShowMap] = useState<boolean>(false);



  return (
    <section className="bg-white p-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {showMap && <div className="fixed z-10 top-20 border-2 border-black rounded bg-white ">
          <div className="flex justify-between z-50">
            <span className="my-auto ms-1 text-blue-800 font-semibold font-serif">Street Map</span>
            <FaWindowClose className="text-red-600 hover:text-red-400 text-2xl m-1" onClick={() => setShowMap(false)} />
          </div>
          <MapComponent location={resort?.location} resortName={resort!.resortName} />
        </div>}

        <div className="w-full flex justify-between mb-6">

          <div className="w-2/3 pr-4">
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{resort?.resortName}</h1>
              <p className="flex items-center text-gray-600 text-md">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {resort?.address}
              </p>
            </div>


            <div className="grid grid-cols-2 gap-2">
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


          <div className="w-1/3 pl-4 flex flex-col items-center">

            <div className="relative mb-6 flex justify-center items-center">
              <img
                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1600,c_limit/GoogleMapTA.jpg"
                className="w-full h-48 rounded-md object-cover"
                alt="Map"
              />
              <Button type="button" className="absolute bg-blue-600 hover:bg-blue-400" onClick={() => setShowMap(true)}>
                Show on map
              </Button>
            </div>



            <Card className="bg-gray-100 w-full">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-4 text-center">Facilities</h3>
                <ul className="text-blue-700 flex flex-wrap gap-3 justify-center font-semibold">
                  {resort?.facilities?.map((facility, index) => (
                    <li key={index}>
                      {typeof facility === "string"
                        ? facility
                        : facility?.facilityName}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-full mt-6">
          <p className="text-black text-lg">{resort?.description}</p>
        </div>
      </div>
    </section>
  )
}

export default ResortDetails