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
        receiveMessage: builder.mutation({
            query: (data) => {
                console.log("receiveMessage: ", data)
                return {
                    url: '/api/message/getmsg',
                    method: 'POST',
                    body: data,
                }
            },
        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: '/api/message/addmsg',
                method: 'POST',
                body: data,
            })
        }),
        addContact: builder.mutation({
            query: (data) => {
                console.log("addContact: ", data);
                return {
                    url: '/api/message/add-contact',
                    method: 'POST',
                    body: data,
                }
            },
        }),
        getAllContacts: builder.mutation({
            query: (data) => {
                console.log("getAllContacts: ", data);
                return {
                    url: '/api/message/get-contacts',
                    method: 'POST',
                    body: data,
                }
            },
        }),
        updateContacts: builder.mutation({
            query: (data) => {
                console.log("updateContacts: ", data);
                return {
                    url: '/api/message/update-contacts',
                    method: 'PUT',
                    body: data,
                }
            },
        }),
        addNotifications: builder.mutation({
            query: (data) => {
                console.log("addNotifications: ", data);
                return {
                    url: '/api/message/add-notifications',
                    method: 'PUT',
                    body: data,
                }
            },
        }),
        getNotifications: builder.mutation({
            query: (data) => {
                console.log("getNotifications: ", data);
                return {
                    url: '/api/message/get-notifications',
                    method: 'POST',
                    body: data,
                }
            },
        }),
        activateCode: builder.mutation({
            query: credentials => ({
                url: '/api/user/activate',
                method: 'POST',
                body: {...credentials}
            })
        }),
        resend: builder.mutation({
            query: credentials => ({
                url: '/api/user/resend',
                method: 'POST',
                body: {...credentials}
            })
        }),
        getStep: builder.query({
            query: () => '/api/user/step',
        }),
        checkUsername: builder.mutation({
            query: credentials => ({
                url: '/api/user/check-username',
                method: 'POST',
                body: {...credentials}
            })
        }),
        completeRegistration: builder.mutation({
            query: credentials => ({
                url: '/api/user/complete-registration',
                method: 'POST',
                body: {...credentials}
            })
        }),
    }),
});

export const {
    useUploadPhotoMutation,
    useSaveInfoMutation,
    useGetModelsQuery,
    useGetOneModelQuery,
    useGetFullModelsQuery,
    useGetFullOneQuery,
    useChangeModelMutation,
    useCreateModelMutation,
    useReceiveMessageMutation,
    useSendMessageMutation,
    useAddContactMutation,
    useGetAllContactsMutation,
    useUpdateContactsMutation,
    useAddNotificationsMutation,
    useGetNotificationsMutation,
    useActivateCodeMutation,
    useCheckUsernameMutation,
    useCompleteRegistrationMutation,
    useResendMutation,
    useGetStepQuery,
} = commonApiSlice;

export default commonApiSlice;
