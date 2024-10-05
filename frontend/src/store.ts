import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import { adminApi } from "./slices/adminApiSlice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        
        [authApi.reducerPath]:authApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,

    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(authApi.middleware).concat(adminApi.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store