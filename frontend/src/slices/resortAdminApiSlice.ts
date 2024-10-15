import { CategoryDetails, FacilityDetails, IResort, IRoom } from '../types/types'
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

        getRoom: builder.query<IRoom[], string>({
            query: (id: string) => ({
                url: `/resort/rooms/${id}`
            }),
            providesTags: ['Rooms']
        }),

        addRoom: builder.mutation({
            query: (data: IRoom) => ({
                url: `/resort/rooms`,
                method: 'POST',
                body:data
            }),
            invalidatesTags: ['Rooms']
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


} = resortAdminApi