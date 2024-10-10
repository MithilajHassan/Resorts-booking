import { CategoryDetails, FacilityDetails, IResort } from '../types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const resortAdminApi = createApi({
    reducerPath: 'resortAdminApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
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


    })
})

export const {
    useRegisterResortMutation,
    useResortSigninMutation,
    useListCategoriesQuery,
    useListFacilitiesQuery,


} = resortAdminApi