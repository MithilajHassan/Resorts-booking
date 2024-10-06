import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryDetails } from "../types/types"

export const adminApi = createApi({
    reducerPath:'adminApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api'}),
    tagTypes: ['Categories'],
    endpoints:(builder)=>({
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
    })
})

export const { 
    useAddCategoryMutation,
    useListCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,

} = adminApi