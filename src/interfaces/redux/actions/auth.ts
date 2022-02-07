import { AuthState } from "interfaces/redux/reducers/auth";
import { Action } from "redux";

export const LOGIN = "SET_LOGGED_IN";
export const LOGOUT = "SET_LOGGED_OUT";

interface LoginAction extends Action {
  type: typeof LOGIN;
  payload: AuthState;
}

interface LogoutAction extends Action {
  type: typeof LOGOUT;
  payload: AuthState;
  
}

export type AuthActionTypes = LoginAction | LogoutAction;
