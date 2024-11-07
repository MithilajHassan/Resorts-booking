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
        updateOneBooking: (state, action: PayloadAction<IBooking>) => {
            if (state.bookings) {
                const index = state.bookings.findIndex(booking => booking._id === action.payload._id)
                if (index !== -1) {
                    state.bookings[index] = action.payload
                }
            }
        },
    }
})

export default bookingSlice.reducer

export const { 
    setBookings,
    updateOneBooking
} = bookingSlice.actions

