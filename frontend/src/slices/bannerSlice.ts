import { IBanner } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerState {
    banners: IBanner[]
}

const initialState: BannerState = {
    banners: [],
};

const bannersSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {
        SetBanner: (state, action: PayloadAction<IBanner[]>) => {
            state.banners = action.payload
        },
        addBanner: (state, action: PayloadAction<IBanner>) => {
            state.banners.push(action.payload);
        },
        editBanner: (state, action) => {
            const { id, updatedBanner } = action.payload;
            const index = state.banners.findIndex((banner) => banner._id === id);
            if (index !== -1) {
                state.banners[index] = { ...state.banners[index], ...updatedBanner };
            }
        },
        deleteOneBanner: (state, action) => {
            state.banners = state.banners.filter((banner) => banner._id !== action.payload);
        },

    },
});

export const { SetBanner, addBanner, editBanner, deleteOneBanner } = bannersSlice.actions;
export default bannersSlice.reducer;