/* eslint-disable @typescript-eslint/no-explicit-any */

import { createApi } from "@reduxjs/toolkit/query/react";
import { PayloadGenerator } from "@/lib/payloadGenerator";
import { appBaseQuery } from "../baseQuery/appBaseQuery";

const payload = new PayloadGenerator();

export const LoginApi = createApi({
    reducerPath: "LoginApi",
    baseQuery: appBaseQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (loginData: { email: string, password: string }) => ({
                url: 'login',
                body: payload.loginRequest(loginData.email, loginData.password),
                method: "POST",
            }),
            transformResponse: (response: any) => response
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            transformResponse: (response: any) => response,
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
} = LoginApi;
