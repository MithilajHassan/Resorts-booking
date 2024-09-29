import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface authState {
    userInfo?: object | null;
    resortAdmin?: object | null;
}

const initialState:authState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null ,
    resortAdmin:localStorage.getItem('resortAdmin') ? JSON.parse(localStorage.getItem('resortAdmin')!) : null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action:PayloadAction<object>)=>{
            state.userInfo = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        setResortAdmin:(state,action)=>{
            state.resortAdmin = action.payload
            localStorage.setItem('resortAdmin',JSON.stringify(action.payload))
        },
        clearUserAuth: (state) => {
            state.userInfo = null;
            state.resortAdmin = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('resortAdmin');
        },
        clearResortAdminAuth: (state) => {
            state.userInfo = null;
            state.resortAdmin = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('resortAdmin');
        }
    }
})

export const { 
    setCredentials, 
    setResortAdmin, 
    clearUserAuth,
    clearResortAdminAuth,
    
 } = authSlice.actions
export default authSlice.reducer