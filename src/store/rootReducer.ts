import { LoginApi } from "@/service/query/endpoints/LoginApi";
import { UserListApi } from "@/service/query/endpoints/UserListApt";
import appSlice from "@/slice/appSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  application: appSlice,
  [LoginApi.reducerPath]: LoginApi.reducer,
  [UserListApi.reducerPath]: UserListApi.reducer,
});

export default rootReducer;
