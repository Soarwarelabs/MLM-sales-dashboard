import { Reducer } from "redux";
import { NotificationState } from "interfaces/redux/reducers/notification";
import {
  NotificationActionTypes,
  SET_TOKEN,
  RESET_TOKEN,
} from "interfaces/redux/actions/notifications";

const initialState: NotificationState = {
  token: null,
};

const reducer: Reducer<NotificationState, NotificationActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_TOKEN: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }
    case RESET_TOKEN: {
      return {
        token: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
