import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  place: string;
  guestCount: number | null;
  checkIn: string;
  checkOut: string;
}

const initialState: SearchState = {
  place: '',
  guestCount: null,
  checkIn: '',
  checkOut: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchState>) => {
      state.place = action.payload.place;
      state.guestCount = action.payload.guestCount;
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
