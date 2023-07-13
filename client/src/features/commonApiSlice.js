import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const commonApiSlice = createApi({
    reducerPath: 'commonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Credentials': true,
        },
    }),
    endpoints: (builder) => ({
        getOauthUser: builder.query({
            query: () => '/api/user/login/success',
        }),
        uploadPhoto: builder.mutation({
            query: (data) => ({
                url: '/api/user/upload-photo',
                method: 'POST',
                body: data,
            })
        }),
        saveInfo: builder.mutation({
            query: (data) => ({
                url: '/api/user/save-info',
                method: 'PUT',
                body: data,
            })
        }),
        getModels: builder.query({
            query: () => '/api/model/all',
        }),
        getFullModels: builder.query({
            query: () => '/api/admin/getFullModels'
        }),
        getFullOne: builder.query({
            query: (id) => '/api/admin/getFullOne/' + id
        })
    }),
});

export const {
    useGetOauthUserQuery,
    useUploadPhotoMutation,
    useSaveInfoMutation,
    useGetModelsQuery,
    useGetFullModelsQuery,
    useGetFullOneQuery,
} = commonApiSlice;

export default commonApiSlice;