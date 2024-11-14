import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CategoryDetails, FacilityDetails, IBanner, IUser } from "../types/types"

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Resorts'],
    endpoints: (builder) => ({

        //------------------------ Category Management-----------------------------//

        addCategory: builder.mutation({
            query: (data: { category: string }) => ({
                url: '/admin/categories',
                method: 'POST',
                body: data
            })
        }),

        listCategories: builder.query<CategoryDetails[], void>({
            query: () => ({
                url: '/admin/categories'
            })
        }),

        deleteCategory: builder.mutation({
            query: (data: { id: unknown }) => ({
                url: `/admin/categories/${data.id}/soft-delete`,
                method: 'PATCH',
                body: data
            })
        }),

        updateCategory: builder.mutation({
            query: (data: { id: unknown, category: string }) => ({
                url: `/admin/categories/${data.id}`,
                method: 'PUT',
                body: { category: data.category }
            })
        }),

        //--------------------------- Facility Management ----------------------------//

        addFacility: builder.mutation({
            query: (data: { facilityName: string; }) => ({
                url: '/admin/facilities',
                method: 'POST',
                body: data
            })
        }),

        listFacilities: builder.query<FacilityDetails[], void>({
            query: () => ({
                url: '/admin/facilities'
            })
        }),

        deleteFacility: builder.mutation({
            query: (id: string) => ({
                url: `/admin/facilities/${id}/soft-delete`,
                method: 'PATCH',
            })
        }),

        updateFacility: builder.mutation({
            query: (data: { id: string, facilityName: string }) => ({
                url: `/admin/facilities/${data.id}`,
                method: 'PUT',
                body: { facilityName: data.facilityName }
            })
        }),


        //------------------------- Resort Management -------------------------------//

        getResorts: builder.query({
            query: () => '/admin/resorts',
            providesTags: ['Resorts'],
        }),

        acceptResort: builder.mutation({
            query: (resortId: string) => ({
                url: `admin/resorts/${resortId}/accept`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Resorts']
        }),

        rejectResort: builder.mutation({
            query: (data: { resortId: string, reason: string }) => ({
                url: `admin/resorts/${data.resortId}/reject`,
                method: 'PATCH',
                body: { reason: data.reason }
            }),
            invalidatesTags: ['Resorts']
        }),

        manageBlockUnblockResort: builder.mutation({
            query: (data: { id: string, status: boolean }) => ({
                url: `/admin/resorts/${data.id}/manage-block`,
                method: "PATCH",
                body: { status: data.status }
            }),
            invalidatesTags: ['Resorts']
        }),

        //--------------------------- User Management -----------------------------//

        listUsers: builder.query<IUser[], void>({
            query: () => '/admin/users',
        }),

        manageBlockUnblockUser: builder.mutation({
            query: (data: { id: string, status: boolean }) => ({
                url: `/admin/users/${data.id}/manage-block`,
                method: "PATCH",
                body: { status: data.status }
            })
        }),


        //--------------------- Banner Management---------------------//

        listBanners: builder.query<IBanner[], void>({
            query: () => '/admin/banners',
        }),
        createBanner: builder.mutation<IBanner, IBanner>({
            query: (bannerData) => ({
                url: '/admin/banners',
                method: 'POST',
                body: bannerData,
            }),
        }),
        deleteBanner: builder.mutation<{message:string},string>({
            query: (bannerId) => ({
                url: `/admin/banners/${bannerId}`,
                method: 'DELETE',
            }),
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
    useListFacilitiesQuery,
    useGetResortsQuery,
    useAcceptResortMutation,
    useRejectResortMutation,
    useListUsersQuery,
    useManageBlockUnblockUserMutation,
    useManageBlockUnblockResortMutation,
    useListBannersQuery,
    useCreateBannerMutation,
    useDeleteBannerMutation,



} = adminApi