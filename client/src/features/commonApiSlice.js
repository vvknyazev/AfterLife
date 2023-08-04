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
        getOneModel: builder.query({
            query: (id) => '/api/model/getOne/' + id
        }),
        getFullModels: builder.query({
            query: () => '/api/admin/getFullModels'
        }),
        getFullOne: builder.query({
            query: (id) => '/api/admin/getFullOne/' + id
        }),
        changeModel: builder.mutation({
            query: (data) => ({
                url: '/api/admin/changeModel/' + data.id,
                method: 'PUT',
                body: data,
            })
        }),
        createModel: builder.mutation({
            query: (data) => ({
                url: '/api/admin/createModel/',
                method: 'POST',
                body: data,
            })
        }),
        getAllContacts: builder.query({
            query: () => '/api/message/getAllUsers',
        }),
        receiveMessage: builder.mutation({
            query: (data) => ({
                url: '/api/message/getmsg',
                method: 'POST',
                body: data,
            })
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: '/api/message/addmsg',
                method: 'POST',
                body: data,
            })
        }),
    }),
});

export const {
    useGetOauthUserQuery,
    useUploadPhotoMutation,
    useSaveInfoMutation,
    useGetModelsQuery,
    useGetOneModelQuery,
    useGetFullModelsQuery,
    useGetFullOneQuery,
    useChangeModelMutation,
    useCreateModelMutation,
    useGetAllContactsQuery,
    useReceiveMessageMutation,
    useSendMessageMutation,
} = commonApiSlice;

export default commonApiSlice;