import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryDetails, FacilityDetails } from "../types/types"

export const adminApi = createApi({
    reducerPath:'adminApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api'}),
    tagTypes: ['Facilities','Categories'],
    endpoints:(builder)=>({

        // Category Management-------------------------------------------------------

        addCategory:builder.mutation({
            query:(data:{category:string})=>({
                url:'/admin/add-category',
                method:'POST',
                body:data
            }),
            invalidatesTags: ['Categories']
        }),

        listCategories:builder.query<CategoryDetails[] , void>({
            query:()=>({
                url:'/admin/list-categories'
            }),
            providesTags: ['Categories'],
        }),

        deleteCategory:builder.mutation({
            query:(data:{id:unknown})=>({
                url:'/admin/delete-category',
                method:'PUT',
                body:data
            }),
            invalidatesTags: ['Categories']
        }),

        updateCategory:builder.mutation({
            query:(data:{id:unknown,category:string})=>({
                url:`/admin/edit-category/${data.id}`,
                method:'PUT',
                body:{category:data.category}
            }),
            invalidatesTags: ['Categories']
        }),

        // Facility Management --------------------------------------------------------------

        addFacility: builder.mutation({
            query: (data: { facilityName: string; }) => ({
                url: '/admin/add-facility',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Facilities']
        }),

        listFacilities: builder.query<FacilityDetails[], void>({
            query: () => ({
                url: '/admin/list-facilities'
            }),
            providesTags: ['Facilities'],
        }),

        deleteFacility: builder.mutation({
            query: ( id: string ) => ({
                url: `/admin/delete-facility/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Facilities']
        }),

        updateFacility: builder.mutation({
            query: (data: { id: string, facilityName: string}) => ({
                url: `/admin/edit-facility/${data.id}`,
                method: 'PUT',
                body: { facilityName: data.facilityName }
            }),
            invalidatesTags: ['Facilities']
        }),

    })
})

export const { 
    useAddCategoryMutation,
    useListCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useAddFacilityMutation,
    useUpdateFacilityMutation,
    useDeleteFacilityMutation,
    useListFacilitiesQuery

} = adminApi