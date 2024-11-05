import { TbBuildingBroadcastTower } from 'react-icons/tb';
import { IBooking, IResort, IRoom } from '../types/types'
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

        // getGoogleLoginUrl: builder.mutation({
        //     query: () => ({
        //         url: '/user/auth/google/url',
        //         method: 'GET',
        //     }),
        // }),

        // googleCallback: builder.mutation({
        //     query: (code) => ({
        //         url: '/user/auth/google/callback',
        //         method: 'POST',
        //         body: { code },
        //     }),
        // }),

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
        }),

        searchRooms: builder.mutation<{ resort: IResort; rooms: IRoom[] }[], { place: string, guestCount: number, checkIn: string, checkOut: string }>({
            query: (data) => ({
                url: '/user/search-resort',
                method: 'POST',
                body: data
            })
        }),

        createBooking: builder.mutation<{orderId:string, amount:string|number, bookingId:string}, IBooking>({
            query: (data) => ({
                url: '/user/checkout',
                method: 'POST',
                body: data
            })
        }),
        setPaymentStatus: builder.mutation<{success:boolean}, {bookingId:string,status:boolean}>({
            query: (data) => ({
                url: '/user/paymentstatus',
                method: 'PATCH',
                body: data
            })
        }),
        listBookings: builder.query<{bookings:IBooking[]},string>({
            query:(userId)=> `/user/bookings/${userId}`
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
        useSearchRoomsMutation,
        useCreateBookingMutation,
        useSetPaymentStatusMutation,
        useListBookingsQuery,
        // useGetGoogleLoginUrlMutation,
        // useGoogleCallbackMutation,

    } = authApi