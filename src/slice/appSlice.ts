/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserListApi } from "@/service/query/endpoints/UserListApt";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  isAuthenticated: boolean;
  isModalOpen: boolean;
  user: any;
  userList: any;
  selectedUser: any;
}

const initialState: IState = {
  user: null,
  userList: [],
  isAuthenticated: false,
  isModalOpen: false,
  selectedUser: null
};
const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      return { ...state, user: action.payload?.email, isAuthenticated: !!action.payload };
    },
    updateSelectedUser(state, action) {
      return { ...state, selectedUser: action.payload };
    },
    updateModalOpen(state, action) {
      return { ...state, isModalOpen: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserListApi.endpoints.getUserList.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        state.userList = action.payload;
      }
    )
  },
});

export const { updateUserInfo, updateSelectedUser, updateModalOpen } = appSlice.actions;
export default appSlice.reducer;
