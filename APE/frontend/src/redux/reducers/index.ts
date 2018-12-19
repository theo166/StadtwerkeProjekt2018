import { combineReducers } from "redux";
import { AlertReducer, alertReducer } from "./alert-reducer";
import { UserReducer, userReducer } from "./user-reducer";
import { AuthenticationReducer, authenticationReducer } from "./authentication-reducer";
import { developmentFormsReducer, DevelopmentFormsReducer } from "./development-forms-reducer";
import {
  singleDevelopmentFormReducer,
  SingleDevelopmentFormReducer
} from "./single-development-form-reducer";
import {
  traineeDevelopmentFormsReducer,
  TraineeDevelopmentFormsReducer
} from "./trainee-developmentForm-reducer";

export interface ApplicationState {
  authenticationReducer: AuthenticationReducer;
  alertReducer: AlertReducer;
  userReducer: UserReducer;
  developmentFormsReducer: DevelopmentFormsReducer;
  singleDevelopmentFormReducer: SingleDevelopmentFormReducer;
  traineeDevelopmentFormsReducer: TraineeDevelopmentFormsReducer;
}

const rootReducer = combineReducers<ApplicationState>({
  alertReducer,
  userReducer,
  authenticationReducer,
  developmentFormsReducer,
  singleDevelopmentFormReducer,
  traineeDevelopmentFormsReducer
});

export default rootReducer;
