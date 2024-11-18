import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchElements {
  place: string;
  guestCount: number | null;
  checkIn: string;
  checkOut: string;
}
interface SearchState {
  search: SearchElements
}

const initialState: SearchState = {
  search: {
    place: '',
    guestCount: null,
    checkIn: '',
    checkOut: '',
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchElements>) => {
      state.search = action.payload
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
