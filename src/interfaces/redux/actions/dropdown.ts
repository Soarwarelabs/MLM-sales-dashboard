import { DropdownState } from "interfaces/redux/reducers/dropdown";
import { Action } from "redux";

export const GET_DATA = "GET_DATA";

interface getData extends Action {
  type: typeof GET_DATA;
  payload: DropdownState;
}

export type DropdownActionType = getData;
