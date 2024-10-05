import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryDetails } from "../types/types"

export const adminApi = createApi({
    reducerPath:'adminApi',
    baseQuery:fetchBaseQuery({baseUrl:'/api'}),
    endpoints:(builder)=>({
        addCategory:builder.mutation({
            query:(data:{category:string})=>({
                url:'/admin/add-category',
                method:'POST',
                body:data
            })
        }),
        listCategories:builder.query<CategoryDetails[] , void>({
            query:()=>({
                url:'/admin/list-categories'
            })
        })
    })
})

export const { useAddCategoryMutation,useListCategoriesQuery } = adminApi