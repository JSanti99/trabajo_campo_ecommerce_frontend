import axios from "axios";
import jwt from "jsonwebtoken";
import jwtDefaultConfig from "./jwtDefaultConfig";

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  counter = 0;
  // ** For Refreshing Token
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        const accessToken = this.getToken();

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;

        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              console.log("R", r);
              this.isAlreadyFetchingAccessToken = false;

              // ** Update accessToken in localStorage
              this.setToken(r.data.refreshToken);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.refreshToken);
            });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              console.log(accessToken);
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    console.log(
      "LOCALSTORAGE",
      localStorage.getItem(this.jwtConfig.storageTokenKeyName)
    );
    return JSON.parse(localStorage.getItem(this.jwtConfig.storageTokenKeyName));
  }

  getRefreshToken() {
    return JSON.parse(
      localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
    );
  }

  setToken(value) {
    localStorage.setItem(
      this.jwtConfig.storageTokenKeyName,
      JSON.stringify(value)
    );
  }

  setRefreshToken(value) {
    localStorage.setItem(
      this.jwtConfig.storageRefreshTokenKeyName,
      JSON.stringify(value)
    );
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args);
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken() {
    let instance = axios.create();
    // delete instance.defaults.headers.common["Authorization"];
    // console.log("ID", jwt.decode(this.getToken()));
    return instance.post(
      this.jwtConfig.refreshEndpoint,
      {
        refreshToken: jwt.decode(this.getToken()).id,
      },
      {
        headers: {
          Authorization: "",
        },
      }
    );
  }
}
