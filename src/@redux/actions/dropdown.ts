import {
  DropdownActionType,
  GET_DATA,
} from "interfaces/redux/actions/dropdown";
import { DropdownState } from "interfaces/redux/reducers/dropdown";

export const getData = (dropdown: DropdownState): DropdownActionType => {
  return {
    type: GET_DATA,
    payload: {
      ...dropdown,
    },
  };
};
