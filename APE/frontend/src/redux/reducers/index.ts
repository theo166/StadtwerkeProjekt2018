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
import { TraineesTabReducer, traineeTabReducer } from "./trainees-tab-reducer";
import { registerUserReducer, RegisterUserReducer } from "./register-reducer";
import {
  TraineeDevelopmentFormsListReducer,
  traineeDevelopmentFormsListReducer
} from "./trainee-developmentFormsList-reducer";
import {
  AssessmentsReducer,
  trainerAssessmentReducer,
  traineeAssessmentReducer
} from "./assessments-reducer";

/** Combining all interfaces of all reducers to get the ApplicationState interface **/
export interface ApplicationState {
  authenticationReducer: AuthenticationReducer;
  alertReducer: AlertReducer;
  userReducer: UserReducer;
  developmentFormsReducer: DevelopmentFormsReducer;
  singleDevelopmentFormReducer: SingleDevelopmentFormReducer;
  traineeDevelopmentFormsReducer: TraineeDevelopmentFormsReducer;
  traineeTabReducer: TraineesTabReducer;
  traineeDevelopmentFormsListReducer: TraineeDevelopmentFormsListReducer;
  registerUserReducer: RegisterUserReducer;
  trainerAssessmentReducer: AssessmentsReducer;
  traineeAssessmentReducer: AssessmentsReducer;
}

/** Combining all reducers to a rootReducer **/
const rootReducer = combineReducers<ApplicationState>({
  alertReducer,
  userReducer,
  authenticationReducer,
  developmentFormsReducer,
  singleDevelopmentFormReducer,
  traineeDevelopmentFormsReducer,
  traineeTabReducer,
  traineeDevelopmentFormsListReducer,
  registerUserReducer,
  trainerAssessmentReducer,
  traineeAssessmentReducer
});

/** Export rootReducer **/
export default rootReducer;
