import { ToastContainer } from "react-toastify";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useListBookingsQuery } from "../../slices/resortAdminApiSlice";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isApiError } from "../../utils/errorHandling";
import { clearResortAdminAuth } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { setBookings } from "../../slices/bookingSlice";

export default function BookingsList() {
    const { resortAdmin } = useSelector((state: RootState) => state.auth)
    const { data, error: err, isError } = useListBookingsQuery(resortAdmin?._id!)
    const { bookings } = useSelector((state: RootState) => state.bookings)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            if (isApiError(err)) {
                if (err.status == 401) {
                    dispatch(clearResortAdminAuth())
                    navigate('/resort/signin')
                } else {
                    console.log(err.data.message || 'Unknown error occurred')
                }
            } else {
                console.log(err)
            }
        } else {
            dispatch(setBookings(data?.bookings!))
        }
    }, [bookings])

    return (
        <div className="w-4/6 h-fit border-2 rounded-md" >
            <ToastContainer />
            <Table className="">
                <TableHeader className="bg-blue-100 text-black h-12">
                    <TableRow>
                        <TableHead className="text-black font-bold">Customers</TableHead>
                        <TableHead className="text-black font-bold">Room</TableHead>
                        <TableHead className="text-black font-bold">Price</TableHead>
                        <TableHead className="text-black font-bold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings?.length! > 0 ? (
                        bookings!.map((booking) => (
                            <TableRow className="h-10" >
                                <TableCell className="">{booking.guestName}</TableCell>
                                <TableCell className="">{typeof booking.roomId != 'string' && booking.roomId.name}</TableCell>
                                <TableCell className="text-green-800 font-bold">₹{typeof booking.roomId != 'string' && booking.totalPrice - 200}</TableCell>
                                <TableCell className="text-end">
                                    <Link to={''}>View</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">Bookings not found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
