import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyProfile, login } from "./auth.requests";
import { LoginRequest, LoginResponse, Profile } from "./auth.types";
import { AUTH_KEYS } from "./auth.keys";
import { useSession } from "next-auth/react";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (request: LoginRequest) => login(request),
  });
};

export const useGetMyProfile = () => {
  const { data: session } = useSession();
  return useQuery<Profile, Error>({
    queryKey: AUTH_KEYS.PROFILE,
    queryFn: () => getMyProfile(session?.user.accessToken || ""),
    enabled: !!session?.user.accessToken,
  });
};
