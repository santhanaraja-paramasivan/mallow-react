/* eslint-disable @typescript-eslint/no-explicit-any */

import { LOCAL_CONSTANTS } from "@/constants/localConstant";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const getResultStatus = (result: any) => {
  return (
    result?.error?.status === 401 ||
    result?.error?.data?.error?.fault?.faultstring === "Access Token expired" ||
    result?.error?.data?.error?.fault?.faultstring === "Invalid Access Token" ||
    result?.error
  );
};

const mutex = new Mutex();

export const resetAuth = () => {
  sessionStorage.removeItem(LOCAL_CONSTANTS.ACCESS);
};

const appBaseQuery = fetchBaseQuery({
  baseUrl: "https://reqres.in/api/",
  prepareHeaders: (headers) => {
    const token = getLocalStorage(LOCAL_CONSTANTS.ACCESS);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const appBaseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  await mutex.waitForUnlock();
  let result = await appBaseQuery(args, api, extraOptions);
  const isUnAuth = getResultStatus(result);
  if (isUnAuth) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        const baseReAuthQuery = fetchBaseQuery({});
        const refreshResult: any = await baseReAuthQuery(
          {
            url: 'ENDPOINTS_CONSTANTS.GET_AUTH_TOKEN',
            method: "GET",
            headers: {
              Authorization: `Basic ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const accessToken = refreshResult.data.access_token;
          setLocalStorage(LOCAL_CONSTANTS.ACCESS, accessToken);
        } else {
          resetAuth();
        }
      } catch (error) {
        console.log(error);
        resetAuth();
      } finally {
        release();
      }
    }
    // retry the initial query
    result = await appBaseQuery(args, api, extraOptions);
  }
  return result;
};

export {appBaseQueryWithReauth, appBaseQuery };
