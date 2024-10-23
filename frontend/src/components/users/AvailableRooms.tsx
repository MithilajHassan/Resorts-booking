import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/button';


const AvailableRooms = () => {
    const { availableRooms } = useSelector((state: RootState) => state.availableRsorts)
    const { id } = useParams()
    const resortEntry = availableRooms.find(resortEntry => resortEntry.resort._id === id);

    const roomsForResort = resortEntry ? resortEntry.rooms : [];

    return (
        <div className="w-full mb-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
            <Table className='border'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-black'>Room Type</TableHead>
                        <TableHead className='text-black'>Number of Guests</TableHead>
                        <TableHead className='text-black'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roomsForResort.length > 0 ? (
                        roomsForResort.map(room => (
                            <TableRow key={room._id}>
                                <TableCell>{room.name}</TableCell>
                                <TableCell>{room.numberOfGuests}</TableCell>
                                <TableCell>
                                    <Button className='bg-blue-600'>Book</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-gray-600">
                                No rooms available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AvailableRooms;
