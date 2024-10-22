import { IResort, IRoom } from '../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AvailableRoomsState {
    availableRooms:{
        resort:IResort;
        rooms: IRoom[];
    }[];
}

const initialState: AvailableRoomsState = {
   availableRooms:[]
}

const availableRoomsSlice = createSlice({
    name: 'availableRooms',
    initialState,
    reducers: {
        setAvailableRooms: (
            state,
            action: PayloadAction<{ resort: IResort; rooms: IRoom[] }[]>
          ) => {
            state.availableRooms = action.payload;
          },
    },

})

export const {
    setAvailableRooms,

}= availableRoomsSlice.actions

export default availableRoomsSlice.reducer;
