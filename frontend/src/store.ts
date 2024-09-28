import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";


const store = configureStore({
    reducer:{
        auth:authReducer,
        
        [authApi.reducerPath]:authApi.reducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(authApi.middleware),
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store