import { API_ROUTES } from "../../constants/api-routes";
import { apiClient } from "../api-client";
import {
  LoginRequest,
  LoginResponse,
  Profile,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "./auth.types";

export const login = async (request: LoginRequest) => {
  // const response = await apiClient.post(API_ROUTES.AUTH.LOGIN(), {
  //   json: request,
  // });
  // return response.json<LoginResponse>();

  // wretch
  const response = await apiClient
    .url(API_ROUTES.AUTH.LOGIN())
    .post(request)
    .json<LoginResponse>();

  return response;
};

export const getMyProfile = async (accessToken: string) => {
  // const authApiClient = apiClient.extend({
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  // const response = await authApiClient
  //   .get(API_ROUTES.USER.ME())
  //   .json<Profile>();

  // return response;

  // wretch
  const response = await apiClient
    .auth(`Bearer ${accessToken}`)
    .get(API_ROUTES.USER.ME())
    .json<Profile>();
  return response;
};

export const refreshToken = async (request: RefreshTokenRequest) => {
  console.debug("----------- refreshToken ------------");
  const response = await apiClient
    .url(API_ROUTES.AUTH.REFRESH())
    .post(request)
    .json<RefreshTokenResponse>();

  return response;
};
