import { Action } from "redux";
import { traineeDevelopmentFormConstants } from "../../constants";
import { FullDevSheetFetch } from "../../types";

/** Interface declaration of action **/
interface TraineeDevelopmentFormAction extends Action {
  readonly devSheet: FullDevSheetFetch;
}

/** Interface declaration of state **/
export interface TraineeDevelopmentFormsReducer {
  readonly loading: boolean;
  readonly devSheet: FullDevSheetFetch;
}

//Set initial state
const initialState: TraineeDevelopmentFormsReducer = {
  loading: false,
  devSheet: {
    result: {
      devSheetid: "",
      department: "",
      education: "",
      status: "",
      version: 0,
      trainee: "",
      trainer: "",
      content: []
    }
  }
};

export const traineeDevelopmentFormsReducer = (
  state = initialState,
  action: TraineeDevelopmentFormAction
) => {
  switch (action.type) {
    case traineeDevelopmentFormConstants.SETDEVSHEET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeDevelopmentFormConstants.SETDEVSHEET_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case traineeDevelopmentFormConstants.SETDEVSHEET_FAILURE:
      return {
        ...state,
        loading: false
      };

    case traineeDevelopmentFormConstants.GETFULLDEVSHEET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case traineeDevelopmentFormConstants.GETFULLDEVSHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        devSheet: action.devSheet
      };
    case traineeDevelopmentFormConstants.GETFULLDEVSHEET_FAILURE:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
