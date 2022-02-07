import { AuthActionTypes, LOGIN, LOGOUT } from "interfaces/redux/actions/auth";

export const login = (token: string): AuthActionTypes => {
  return {
    type: LOGIN,
    payload: {
      token,
    },
  };
};

export const logout = (): AuthActionTypes => {
  return {
    type: LOGOUT,
    payload: {
      token: null,
      isLoggedIn: false,
    },
  };
};
