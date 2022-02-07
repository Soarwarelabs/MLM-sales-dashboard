import { combineReducers } from "redux";
import auth from "@redux/reducers/auth";
import notification from "@redux/reducers/notification";
import profile from "@redux/reducers/profile";
import dropdown from "@redux/reducers/dropdown";

const rootReducer = combineReducers({
  auth,
  notification,
  profile,
  dropdown,
});

export { rootReducer };
