import * as React from "react";
import { CircularProgress, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import "./LoginComponent.css";
import { AllProps, State } from "./Login";
import logo from "../../resources/swk_full.png";
import CustomizedInput from "../General/CustomizedInput";
import Typography from "@material-ui/core/Typography/Typography";
import TextLoop from "react-text-loop";
import CustomizedButton from "../General/CustomizedButton";

export class LoginComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);
    const { logout } = this.props;

    //Logout
    logout();

    //Set initial state
    this.state = {
      email: "",
      passwort: "",
      submitted: false
    };
  }

  render() {
    const { email, passwort, submitted } = this.state;
    const { loggingIn } = this.props;
    const noEmail = submitted && !email;
    const noPassword = submitted && !passwort;

    //Change function for input fields
    const handleChange = (event: any) => {
      const target = event.currentTarget;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value } as State);
    };

    //Submit function
    const handleSubmit = () => {
      const { email, passwort } = this.state;
      const { login } = this.props;
      this.setState({ submitted: true });

      //Submitting is only allowed when all input fields are filled out
      if (email && passwort) {
        //Login function
        login(email, passwort);
      }
    };

    return (
      <div className={"all"}>
        <header>
          <img className={"logo"} src={logo} width={"238.2"} height={"60"} />
        </header>

        <Typography variant={"h4"} className={"header"}>
          Entwicklungsbogenportal
        </Typography>

        <div className={"loginContainer"}>
          <div className={"textBox"}>
            <div className={"helpDiv"}>
              <Typography variant={"h5"}>Am Ende deiner Ausbildung</Typography>
              <div className={"flexDivAnimation"}>
                <Typography variant={"h5"}>weißt du</Typography>
                <TextLoop style={{ textAlign: "center" }}>
                  <Typography variant={"h5"}>wer du bist</Typography>
                  <Typography variant={"h5"}>was du willst</Typography>
                  <Typography variant={"h5"}>was du kannst</Typography>
                </TextLoop>
              </div>
            </div>
          </div>

          <div
            className={"inputForm"}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}>
            <FormControl className={"emailForm"}>
              <InputLabel shrink htmlFor="bootstrap-input">
                <Typography variant={"subtitle1"}>Kennung</Typography>
              </InputLabel>
              <CustomizedInput name="email" value={email} error={noEmail} onChange={handleChange} />
              {noEmail && (
                <FormHelperText className={"required-error"}>
                  Kennung ist erforderlich
                </FormHelperText>
              )}
            </FormControl>

            <FormControl className={"passwordForm"}>
              <InputLabel shrink htmlFor="bootstrap-input">
                <Typography variant={"subtitle1"}>Passwort</Typography>
              </InputLabel>
              <CustomizedInput
                name="passwort"
                value={passwort}
                onChange={handleChange}
                type={"password"}
                error={noPassword}
              />
              {noPassword && (
                <FormHelperText className={"required-error"}>
                  Passwort ist erforderlich
                </FormHelperText>
              )}
            </FormControl>

            {loggingIn && <CircularProgress />}

            {!loggingIn && <CustomizedButton text={"Login"} onClick={handleSubmit} />}
          </div>
        </div>
      </div>
    );
  }
}
