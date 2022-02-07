import { ProfileState } from "interfaces/redux/reducers/profile";
import { Action } from "redux";

export const SET_PROFILE = "SET_PROFILE";

interface SetProfile extends Action {
  type: typeof SET_PROFILE;
  payload: ProfileState;
}

export type ProfileActionType = SetProfile;
