import {
  ProfileActionType,
  SET_PROFILE,
} from "interfaces/redux/actions/profile";
import { ProfileState } from "interfaces/redux/reducers/profile";

export const setProfile = (profile: ProfileState): ProfileActionType => {
  return {
    type: SET_PROFILE,
    payload: profile,
  };
};
