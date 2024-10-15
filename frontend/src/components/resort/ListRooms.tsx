import { MdDelete, MdEdit } from "react-icons/md"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Link } from "react-router-dom"
import { useListRoomsQuery } from "../../slices/resortAdminApiSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Button } from "../ui/button"

const ListRooms = () => {
    const { resortAdmin } = useSelector((state: RootState) => state.auth)
    const { data: rooms = [] } = useListRoomsQuery(resortAdmin?._id!)

    const handleDelete = (roomId: string) => {

    }

    return (
        <div className="mt-16 mx-auto">
            <div className="flex justify-end mb-4">
                <Link to={'/resort/rooms/add'}>
                    <Button className="bg-blue-600 hover:bg-blue-400 text-white">Add Room</Button>
                </Link>
            </div>
            <div className="border border-2 rounded-md">
                <Table className="">
                    <TableHeader className="bg-blue-100 text-black h-12">
                        <TableRow>
                            <TableHead className="text-black font-bold">Room Name</TableHead>
                            <TableHead className="text-black font-bold">Guests</TableHead>
                            <TableHead className="text-black font-bold">Normal Price</TableHead>
                            <TableHead className="text-black font-bold">Offer Price</TableHead>
                            <TableHead className="text-black font-bold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <TableRow className="h-10" key={room._id}>
                                    <TableCell className="font-medium">{room.name}</TableCell>
                                    <TableCell>{room.numberOfGuests}</TableCell>
                                    <TableCell>{`$${room.normalPrice}`}</TableCell>
                                    <TableCell>{`$${room.offerPrice}`}</TableCell>
                                    <TableCell className="text-right flex justify-end items-center gap-5">
                                        <Link to={`/resort/rooms/update/${room._id}`}>
                                            <MdEdit
                                                style={{ fontSize: '1.3rem' }}
                                                className="text-blue-700 hover:text-blue-400 cursor-pointer"
                                            />
                                        </Link>
                                        <MdDelete
                                            onClick={() => handleDelete(room._id!)}
                                            style={{ fontSize: '1.3rem' }}
                                            className="text-red-600 hover:text-red-400 cursor-pointer"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">Rooms not found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ListRooms