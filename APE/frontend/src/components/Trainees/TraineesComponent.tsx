import * as React from "react";
import { AllProps, State } from "./Trainees";
import { CircularProgress, Typography } from "@material-ui/core";
import { ListItemTrainee } from "./ListItemTrainee";
import "./TraineesComponent.css";
import { FillOutDevelopmentSheetTrainer } from "../FillOutDevelopmentSheetTrainer/FillOutDevelopmentSheetTrainer";

export class TraineesComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: "connected-dev-sheets"
    };
  }

  componentDidMount() {
    this.props.getAllConnectedDevSheets();
  }

  // Klick auf mir zuweisen
  private handleAssignment = async (traineeUsername, devSheetId) => {
    try {
      const { setDevSheetToTrainer, getAllConnectedDevSheets } = this.props;
      await setDevSheetToTrainer(traineeUsername, devSheetId);
      getAllConnectedDevSheets();
    } catch (e) {
      console.log(e);
    }
  };

  // Klick auf Ausfüllen
  private handleFillOut = (devSheetID, traineeUsername) => {
    this.props.getFullDevSheet(devSheetID, traineeUsername);
    this.changeVisiblityIndex("fill-out");
  };

  private changeVisiblityIndex = visiblityIndex => {
    this.setState({
      visibilityIndex: visiblityIndex
    });
  };

  private handleSearch = () => {
    console.log("searchClick");
  };

  private renderContent = () => {
    const { visibilityIndex } = this.state;
    const { connectedDevSheets, loadingFullDevSheet, fullDevSheet } = this.props;

    switch (visibilityIndex) {
      case "connected-dev-sheets":
        return (
          <div className={"frameCenterTraineeTab"}>
            <ListItemTrainee
              isHeader={true}
              department={"Abteilung"}
              nameTrainee={"Kennung des zugewiesenen Auszubildenden"}
              nameTrainer={"Kennung des zugewiesenen Ausbilders"}
              status={"Status"}
            />

            {connectedDevSheets.map((devSheet, index) => (
              <ListItemTrainee
                key={index}
                nameTrainee={devSheet.TraineeUsername}
                department={devSheet.DevelopmentSheet.department}
                nameTrainer={devSheet.TrainerUsername}
                status={devSheet.status}
                onAssignmentClick={() =>
                  this.handleAssignment(devSheet.TraineeUsername, devSheet.id)
                }
                onFilloutClick={() => this.handleFillOut(devSheet.id, devSheet.TraineeUsername)}
                onSearchClick={() => this.handleSearch()}
              />
            ))}
          </div>
        );
      case "fill-out":
        return (
          <FillOutDevelopmentSheetTrainer
            loading={loadingFullDevSheet}
            fullDevSheet={fullDevSheet}
            goBack={() => this.changeVisiblityIndex("connected-dev-sheets")}
          />
        );
      default:
        return (
          <div>
            <Typography variant={"h2"}>Upps, hier lief etwas schief</Typography>
          </div>
        );
    }
  };

  render() {
    const { loading } = this.props;

    return loading ? <CircularProgress /> : this.renderContent();
  }
}
