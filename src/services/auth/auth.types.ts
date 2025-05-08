export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number; // default 60 mins
};

export type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  image: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
  expiresInMins?: number;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
