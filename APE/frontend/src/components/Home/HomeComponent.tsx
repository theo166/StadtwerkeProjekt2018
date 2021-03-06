import * as React from "react";
import IdleTimer from "react-idle-timer";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { Navigation } from "../Navigation/Navigation";
import { UserAdministration } from "../UserAdministration/UserAdministration";
import { PrivateRoute } from "../PrivateRoute";
import { DevelopmentForms } from "../DevelopmentForms/DevelopmentForms";
import { Trainees } from "../Trainees/Trainees";
import { TraineeView } from "../Trainees/TraineeView";
import { RoleConstants, RouterPathsConstants } from "../../constants";
import { connect } from "react-redux";
import { getRole } from "../../redux/actions";
import { User } from "../../types";

/** Interface and type declaration **/
interface Props {}

interface State {
  redirect: boolean;
  rerender: boolean;
}

interface ReduxStateProps {
  role: string;
  user: User;
}

interface ReduxDispatchProps {
  getRole: (token: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

class Home extends React.Component<AllProps, State> {
  //Timer declaration for Autologout
  public idleTimer: any;

  constructor(props: AllProps) {
    super(props);

    this.state = {
      redirect: false,
      rerender: false
    };

    this.idleTimer = null;

    //Get role from user token
    this.props.getRole(this.props.user.token);
  }

  componentWillReceiveProps(nextProps: AllProps) {
    //Rerender if role changed
    if (nextProps.role !== this.props.role) {
      this.setState({ rerender: !this.state.rerender });
    }
  }

  render() {
    const { redirect, rerender } = this.state;
    const { role } = this.props;

    //Check which role is active
    const isAdmin = role === RoleConstants.admin;
    const isTrainer = role === RoleConstants.trainer;
    const isTrainee = role === RoleConstants.trainee;

    return (
      <IdleTimer
        ref={ref => {
          this.idleTimer = ref;
        }}
        element={document}
        onIdle={this._onIdle}
        timeout={900000}>
        {redirect && <Redirect to={"/login"} />}

        <Navigation />

        {rerender && isAdmin && (
          <PrivateRoute
            path={RouterPathsConstants.userAdministration}
            exact={true}
            component={UserAdministration}
          />
        )}

        {rerender && (isAdmin || isTrainer) && (
          <PrivateRoute
            path={RouterPathsConstants.developmentForms}
            exact={true}
            component={DevelopmentForms}
          />
        )}

        {rerender && (isAdmin || isTrainer) && (
          <PrivateRoute path={RouterPathsConstants.trainees} exact={true} component={Trainees} />
        )}

        {rerender && isTrainee && (
          <PrivateRoute
            path={RouterPathsConstants.traineeDevelopmentForms}
            exact={true}
            component={TraineeView}
          />
        )}
      </IdleTimer>
    );
  }

  //Redirect if time is passed
  private _onIdle = () => {
    this.setState({ redirect: true });
  };
}

/** Connecting Redux **/
const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getRole: token => dispatch(getRole(token))
  };
};

const mapStateToProps = (state): ReduxStateProps => {
  const { role } = state.userReducer;
  const { user } = state.authenticationReducer;
  return {
    user: user.token ? user : JSON.parse(user),
    role
  };
};

const connectedHome = withRouter(
  connect<ReduxStateProps, ReduxDispatchProps, RouteComponentProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);

/** Export component **/
export { connectedHome as Home };
