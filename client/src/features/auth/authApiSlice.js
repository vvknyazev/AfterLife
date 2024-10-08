import {apiSlice} from "../../app/api/apiSlice";
import {setCredentials} from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/user/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/api/user/register',
                method: 'POST',
                body: {...credentials}
            })
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/api/user/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    // console.log(data)
                    const {accessToken} = data
                    dispatch(setCredentials({accessToken}))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/user/auth',
                // providesTags:['Auth']
            }),
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
        changeModel: builder.mutation({
            query: (data) => ({
                url: '/api/admin/changeModel' + data.id,
                method: 'PUT',
                body: data,
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useGetUserQuery,
    useUploadPhotoMutation,
    useSaveInfoMutation,
} = authApiSlice
