import { CategoryDetails, FacilityDetails, IBooking, IResort, IRoom } from '../types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const resortAdminApi = createApi({
    reducerPath: 'resortAdminApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Resort', 'Rooms'],
    endpoints: (builder) => ({
        registerResort: builder.mutation({
            query: (resortData: IResort) => ({
                url: '/resort/register',
                method: 'POST',
                body: resortData,
            }),
        }),

        resortSignin: builder.mutation({
            query: (data: { email: string, password: string }) => ({
                url: `/resort/signin`,
                method: 'POST',
                body: data
            })
        }),

        // verifyAdmin:builder.query<IUser , void>({
        //     query:()=> `/admin/verifyadmin` 
        // }),

        listCategories: builder.query<CategoryDetails[], void>({
            query: () => ({
                url: '/resort/categories'
            }),
        }),

        listFacilities: builder.query<FacilityDetails[], void>({
            query: () => ({
                url: '/resort/facilities'
            }),
        }),

        getMyResort: builder.query<IResort, string>({
            query: (id: string) => ({
                url: `/resort/myresort/${id}`
            }),
            providesTags: ['Resort']
        }),

        editResort: builder.mutation({
            query: (data: { resortData: IResort, id: string }) => ({
                url: `/resort/myresort/${data.id}`,
                method: 'PUT',
                body: data.resortData
            }),
            invalidatesTags: ['Resort']
        }),


        listRooms: builder.query<IRoom[], string>({
            query: (resortId: string) => ({
                url: `/resort/rooms/${resortId}`
            }),
            providesTags: ['Rooms']
        }),

        getRoom: builder.query<IRoom, string>({
            query: (id: string) => ({
                url: `/resort/rooms/detail/${id}`
            }),
            providesTags: ['Rooms']
        }),

        addRoom: builder.mutation({
            query: (data: IRoom) => ({
                url: `/resort/rooms`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Rooms']
        }),

        editRoom: builder.mutation({
            query: (data: { roomData: IRoom, id: string }) => ({
                url: `/resort/rooms/${data.id}`,
                method: 'PUT',
                body: data.roomData
            }),
            invalidatesTags: ['Rooms']
        }),

        deleteRoom: builder.mutation({
            query: (id: string) => ({
                url: `/resort/rooms/${id}/delete`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Rooms']
        }),

        listBookings: builder.query<{ bookings: IBooking[] }, string>({
            query: (resortId) => `/resort/bookings/${resortId}`
        }),
        editBookingStatus: builder.mutation<{ booking: IBooking }, { id: string, status: string }>({
            query: ({ id, status }) => ({
                url: `/resort/bookings/${id}`,
                method: 'PATCH',
                body: { status: status }
            })
        }),

    })
})

export const {
    useRegisterResortMutation,
    useResortSigninMutation,
    useListCategoriesQuery,
    useListFacilitiesQuery,
    useGetMyResortQuery,
    useEditResortMutation,
    useListRoomsQuery,
    useGetRoomQuery,
    useAddRoomMutation,
    useDeleteRoomMutation,
    useEditRoomMutation,
    // useVerifyAdminQuery,
    useListBookingsQuery,
    useEditBookingStatusMutation,



} = resortAdminApi