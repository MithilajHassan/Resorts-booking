import Bill from "../../components/users/checkout/Bill"
import BookingDetails from "../../components/users/checkout/BookingDetails"
import UserHeader from "../../components/users/UserHeader"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { useParams } from "react-router-dom"


export default function BookingDetailsPage() {
    const { bookings } = useSelector((state: RootState) => state.bookings)
    const { id } = useParams()
    const bookingData = bookings?.find((value)=>value._id == id)
    
    return (
        <>
            <UserHeader />
            <div className="flex flex-col space-y-2 p-4 mt-16">

                <div className="flex flex-col md:space-x-4 md:flex-row md:space-y-0 space-y-4 p-6">
                    {typeof bookingData?.resortId != 'string' && typeof bookingData?.roomId != 'string' &&
                        <BookingDetails checkoutDetails={bookingData!} resort={bookingData?.resortId!} room={bookingData?.roomId!} />
                    }
                    {/* {typeof bookingData?.roomId != 'string' &&
                        <Bill checkoutDetails={bookingData!} room={bookingData?.roomId!} />
                    } */}
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 px-6 ">

                    {/* <GuestForm /> */}

                    <div className="w-80">

                    </div>

                </div>

            </div>
        </>

    )
}