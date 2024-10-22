import { format } from "date-fns";
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAvailableRooms } from '../../slices/availableRoomsSlice'
import { setSearchParams } from '../../slices/searchSlice';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import MyDatePicker from './DatePicker';
import { useSearchRoomsMutation } from "../../slices/userApiSlice";

const SearchBar = () => {
    const [place, setPlace] = useState('');
    const [guestCount, setGuestCount] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(true)
    const dispatch = useDispatch()
    const [ searchRoom ] = useSearchRoomsMutation()

    const submitHandler = async(e: FormEvent) => {
        e.preventDefault()
        console.log(place, guestCount, checkIn, checkOut)
        dispatch(setSearchParams({ 
            place, 
            guestCount:Number(guestCount), 
            checkIn, 
            checkOut
        }))

        const res = await searchRoom({
            place,
            guestCount:Number(guestCount), 
            checkIn, 
            checkOut
        }).unwrap()

        console.log(res)  

    }

    const handleSetCheckIn = (date: Date | undefined) => {
        setCheckIn(date ? format(date, "PP") : "")
    };

    const handleSetCheckOut = (date: Date | undefined) => {
        setCheckOut(date ? format(date, "PP") : "")

    }

    return (
        <div className="bg-green-400 ">
            <form onSubmit={submitHandler} className="flex justify-center items-center p-2 space-x-1 sm:space-y-0 sm:space-x-2 mb-4">
                <Input
                    type="text"
                    className="bg-white w-full sm:w-auto"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    required={true}
                    placeholder="Where are you going?"
                />

                <Input
                    type="number"
                    className="bg-white w-54 sm:w-auto"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    placeholder="Guests"
                    required={true}
                    min={1}
                />

                <div className="flex sm:w-auto space-x-1 sm:space-y-0 sm:space-x-2">
                    <Input
                        type="text"
                        className="bg-white cursor-pointer"
                        value={checkIn ? format(checkIn, "PP") : "Check-in"}
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        required={true}
                        readOnly
                    />
                    <Input
                        type="text"
                        className="bg-white cursor-pointer"
                        value={checkOut ? format(checkOut, "PP") : "Check-out"}
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        readOnly
                    />
                    {showDatePicker && (
                        <div className="absolute z-6 t-32 shadow-lg rounded-lg bg-white p-2" style={{ top: '110px' }}>
                            <MyDatePicker
                                setCheckIn={handleSetCheckIn}
                                setCheckOut={handleSetCheckOut}
                                // setShowDatePicker={setShowDatePicker}
                            />
                        </div>
                    )}
                </div>


                <Button className="bg-blue-700 hover:bg-blue-500">
                    Search
                </Button>
            </form>
        </div>
    );
};

export default SearchBar;