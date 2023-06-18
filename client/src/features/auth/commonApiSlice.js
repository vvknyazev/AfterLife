import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commonApiSlice = createApi({
    reducerPath: 'googleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        },
    }),
    endpoints: (builder) => ({
        getOauthUser: builder.query({
            query: () => '/api/user/login/success',
        }),
    }),
});

export const { useGetOauthUserQuery } = commonApiSlice;

export default commonApiSlice;