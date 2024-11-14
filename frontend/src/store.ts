import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/userApiSlice";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice"
import facilityReducer from "./slices/facilitySlice"
import userReducer from "./slices/userSlice"
import availableRsortReducer from './slices/availableRoomsSlice'
import searchReducer from "./slices/searchSlice"
import checkoutReducer from "./slices/checkoutSlice"
import bookingReducer from "./slices/bookingSlice";
import reviewReducer from "./slices/reviewSlice";
import wishlistReducer from "./slices/wishlistSlice";
import bannerReducer from "./slices/bannerSlice";
import { adminApi } from "./slices/adminApiSlice";
import { resortAdminApi } from './slices/resortAdminApiSlice';


const store = configureStore({
    reducer:{
        auth:authReducer,
        categories:categoryReducer,
        facilities:facilityReducer,
        users:userReducer,
        search:searchReducer,
        availableRsorts:availableRsortReducer,
        checkout:checkoutReducer,
        bookings:bookingReducer,
        reviews:reviewReducer,
        wishlist:wishlistReducer,
        banners:bannerReducer,
        
        
        [authApi.reducerPath]:authApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [resortAdminApi.reducerPath]:resortAdminApi.reducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(adminApi.middleware)
    .concat(resortAdminApi.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store