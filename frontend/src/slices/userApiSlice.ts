import { IResort, IUser } from '../types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({

        signup: builder.mutation({
            query: (email: string) => ({
                url: `/user/signup`,
                method: 'POST',
                body: { email }
            })
        }),

        verifyOtp: builder.mutation({
            query: (data: { otp: string, name: string, email: string, password: string }) => ({
                url: `/user/verify-otp`,
                method: 'POST',
                body: data
            })
        }),

        resendOtp: builder.mutation({
            query: (email: string) => ({
                url: `/user/resend-otp`,
                method: 'POST',
                body: { email }
            })
        }),

        signin: builder.mutation({
            query: (data: { email: string, password: string, role: string }) => ({
                url: `/user/signin`,
                method: 'POST',
                body: data
            })
        }),

        signoutUser: builder.mutation({
            query: () => ({
                url: `/user/signout`,
                method: 'POST',
            })
        }),

        getUser: builder.query({
            query: () => ({
                url: '/user/verifyuser',
                method: 'GET',
                credentials: 'include' 
            })
        }),

        signoutResortAdmin: builder.mutation({
            query: () => ({
                url: `/resort/signout`,
                method: 'POST',
            })
        }),

        signoutAdmin: builder.mutation({
            query: () => ({
                url: `/admin/signout`,
                method: 'POST',
            })
        }),

        listResorts: builder.query<IResort[], void>({
            query: () => '/user/resorts',
        }),

        resortDetails: builder.query<IResort, string>({
            query: (id: string) => `/user/resorts/${id}`
        })

    })
})

export const {
    useSignupMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useSigninMutation,
    useSignoutUserMutation,
    useSignoutResortAdminMutation,
    useSignoutAdminMutation,
    useListResortsQuery,
    useResortDetailsQuery,
    useGetUserQuery,

} = authApi