import { AuthState } from "interfaces/redux/reducers/auth";
import { NotificationState } from "interfaces/redux/reducers/notification";
import { ProfileState } from "interfaces/redux/reducers/profile";
import { DropdownState } from "../reducers/dropdown";

export interface RootState {
  auth: AuthState;
  notification: NotificationState;
  profile: ProfileState;
  dropdown: DropdownState;
}
