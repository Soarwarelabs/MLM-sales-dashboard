import { Reducer } from "redux";
import { DropdownState } from "interfaces/redux/reducers/dropdown";
import {
  DropdownActionType,
  GET_DATA,
} from "interfaces/redux/actions/dropdown";

const initialState: DropdownState = {
  roles: [],
  area: [],
  cities: [],
  payment_permissions: [],
  inquiry_types: [],
  payment_method: [],
  payment_types: [],
};

const reducer: Reducer<DropdownState, DropdownActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_DATA: {
      const {
        roles,
        area,
        cities,
        payment_permissions,
        inquiry_types,
        payment_method,
        payment_types,
      } = action.payload;
      return {
        ...state,
        roles: [...roles],
        area: [...area],
        cities: [...cities],
        payment_permissions: [...payment_permissions],
        inquiry_types: [...inquiry_types],
        payment_method: [...payment_method],
        payment_types: [...payment_types],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
