import { Reducer } from "redux";
import { ProfileState } from "interfaces/redux/reducers/profile";
import { ProfileActionType } from "interfaces/redux/actions/profile";

const initialState: ProfileState = {
  name: "",
  email: "",
   uuid: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  role: null,
  promo_code: null
};

const reducer: Reducer<ProfileState, ProfileActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SET_PROFILE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
