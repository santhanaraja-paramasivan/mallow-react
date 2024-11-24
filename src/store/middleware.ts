import { LoginApi } from "@/service/query/endpoints/LoginApi";
import { UserListApi } from "@/service/query/endpoints/UserListApt";

const middleware = [
  LoginApi.middleware,
  UserListApi.middleware,
];

export default middleware;