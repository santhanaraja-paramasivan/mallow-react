/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi } from "@reduxjs/toolkit/query/react";
import { appBaseQuery } from "../baseQuery/appBaseQuery";

export const UserListApi = createApi({
    reducerPath: "UserListApi",
    baseQuery: appBaseQuery,
    endpoints: (builder) => ({
        getUserList: builder.query({
            query: (page = 1) => ({
                url: `users?page=${page}&per_page=4`,
                method: "GET",
            }),
            transformResponse: (response: any) => {
                console.log("response.dataresponse.dataresponse.data", response);
                return response
                
            },
        }),
        createUser: builder.mutation({
            query: (userData: { name: string; job: string }) => ({
                url: "/users",
                body: userData,
                method: "POST",
            }),
            transformResponse: (response: any) => response,
        }),
        deleteUser: builder.mutation({
            query: (userId: string) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            transformResponse: (response: any) => response,
        }),
    }),
});

export const {
    useGetUserListQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
} = UserListApi;
