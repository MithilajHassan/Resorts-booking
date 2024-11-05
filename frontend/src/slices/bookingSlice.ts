import { IBooking } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingsState {
    bookings: IBooking[] | null;
}

const initialState: BookingsState = {
    bookings: null,
}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<IBooking[]>) => {
            state.bookings = action.payload;
        },
    }
})

export default bookingSlice.reducer

export const { 
    setBookings,
    
} = bookingSlice.actions

