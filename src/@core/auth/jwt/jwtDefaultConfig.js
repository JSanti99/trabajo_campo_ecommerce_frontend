// ** Auth Endpoints
export default {
  loginEndpoint: "http://localhost:1337/auth/local",
  registerEndpoint: "http://localhost:1337/auth/local/register",
  refreshEndpoint: "http://localhost:1337/users-permissions/refreshToken",
  logoutEndpoint: "/jwt/logout",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
