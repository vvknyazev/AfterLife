import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    }),
});

export const { useGetOauthUserQuery, useUploadPhotoMutation, useSaveInfoMutation } = commonApiSlice;

export default commonApiSlice;