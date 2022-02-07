import { Dispatch } from "redux";
import {
  NotificationActionTypes,
  SET_TOKEN,
  RESET_TOKEN,
} from "interfaces/redux/actions/notifications";

const _setToken = (token: string): NotificationActionTypes => {
  return {
    type: SET_TOKEN,
    payload: {
      token,
    },
  };
};

export const setToken = (token: string) => (dispatch: Dispatch) => {
  return new Promise<void>((res, rej) => {
    try {
      dispatch(_setToken(token));
      res();
    } catch (error) {
      rej(error);
    }
  });
};

export const resetToken = (): NotificationActionTypes => {
  return {
    type: RESET_TOKEN,
    payload: {
      token: null,
    },
  };
};
