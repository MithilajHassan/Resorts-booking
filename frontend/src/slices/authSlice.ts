import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface UserInfo {
    _id: unknown;
    name: string;
    email: string;
    avatar?: string;
}
interface ResortAdmin {
    _id: unknown;
    name: string;
    email: string;
    avatar?: string;
}
interface AdminInfo {
    _id: unknown;
    name: string;
    email: string;
    avatar?: string;
}


interface authState {
    userInfo: UserInfo | null;
    resortAdmin: ResortAdmin | null;
    adminInfo: AdminInfo | null;
}

const initialState: authState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
    resortAdmin: localStorage.getItem('resortAdmin') ? JSON.parse(localStorage.getItem('resortAdmin')!) : null,
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')!) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        setResortAdmin: (state, action: PayloadAction<ResortAdmin>) => {
            state.resortAdmin = action.payload
            localStorage.setItem('resortAdmin', JSON.stringify(action.payload))
        },
        setAdminAuth: (state, action: PayloadAction<AdminInfo>) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        clearUserAuth: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        clearResortAdminAuth: (state) => {
            state.resortAdmin = null
            localStorage.removeItem('resortAdmin')
        },
        clearAdminAuth: (state) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {
    setCredentials,
    setResortAdmin,
    setAdminAuth,
    clearUserAuth,
    clearResortAdminAuth,
    clearAdminAuth,

} = authSlice.actions
export default authSlice.reducer