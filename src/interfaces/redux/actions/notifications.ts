import { NotificationState } from "interfaces/redux/reducers/notification";
import { Action } from "redux";

export const SET_TOKEN = "SET_TOKEN";
export const RESET_TOKEN = "RESET_TOKEN";

interface SetTokenAction extends Action {
  type: typeof SET_TOKEN;
  payload: NotificationState;
}

interface ResetTokenAction extends Action {
  type: typeof RESET_TOKEN;
  payload: NotificationState;
}

export type NotificationActionTypes = SetTokenAction | ResetTokenAction;
