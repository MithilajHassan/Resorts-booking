import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api/user'}),
    endpoints:(builder)=>({

        signup:builder.mutation({
            query:(email:string)=>({
                url:`/signup`,
                method:'POST',
                body:{email}
            })
        }),

        verifyOtp:builder.mutation({
            query:(data:{otp:string,name:string,email:string,password:string})=>({
                url:`/verify-otp`,
                method:'POST',
                body:data
            })
        }),

        resendOtp:builder.mutation({
            query:(email:string)=>({
                url:`/resend-otp`,
                method:'POST',
                body:{email}
            })
        }),

    })  
})

export const {
    useSignupMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    
} = authApi