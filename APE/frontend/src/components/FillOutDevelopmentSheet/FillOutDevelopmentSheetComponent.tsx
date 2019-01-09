import * as React from "react";
import { CircularProgress, FormControl, FormControlLabel, RadioGroup } from "@material-ui/core";
import { AllProps, State } from "./FillOutDevelopmentSheet";
import "./FillOutDevelopmentSheetComponent.css";
import LabelWithTextfield from "../DetailviewDevelopmentSheet/LabelWithTextfield";
import CustomizedRadio from "../General/CustomizedRadio";

export class FillDevelopmentSheetComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: []
    };
  }

  private handleChange = event => {
    let radioValueArray = this.state.radioValue;

    if (radioValueArray.find(r => r.name === event.target.name)) {
      radioValueArray[radioValueArray.findIndex(r => r.name === event.target.name)].value =
        event.target.value;
    } else {
      radioValueArray = [
        ...radioValueArray,
        { name: event.target.name, value: event.target.value }
      ];
    }

    this.setState({
      radioValue: radioValueArray
    });
  };

  render() {
    console.log("FullDev: ", this.props.fullDevSheet.result);

    const { radioValue } = this.state;
    const { fullDevSheet, loading } = this.props;

    return loading ? (
      <CircularProgress />
    ) : (
      <React.Fragment>
        <div className={"fillOutRoot"}>
          <div className="div-headerFill" id="frameFill">
            <div className="div-leftFill">
              <LabelWithTextfield name={"Abteilung"} content={fullDevSheet.result.department} />
              <LabelWithTextfield
                name={"Ausbildungsbeauftragter"}
                content={fullDevSheet.result.trainer}
              />
              <LabelWithTextfield name={"Auszubildener"} content={fullDevSheet.result.trainee} />
              <LabelWithTextfield
                name={"Ausbildungsberuf"}
                content={fullDevSheet.result.education}
              />
            </div>
            <div className="div-rightFill">
              <LabelWithTextfield name={"Datum"} content={""} />
              <LabelWithTextfield name={"Ausbildungszeitraum"} content={""} />
              <LabelWithTextfield name={"Ausbildungsjahr"} content={""} />
              <LabelWithTextfield name={"Abwesenheitstage"} content={""} />
            </div>
          </div>

          {fullDevSheet.result.content.map(competence => (
            <div key={competence.name} id={"frameFill"}>
              <h3>{competence.name}</h3>
              {competence.children.map(mainCategory => (
                <div className={"gravity-leftFill"} key={mainCategory.name}>
                  <h4>{mainCategory.name}</h4>
                  {mainCategory.children.map(subCategory => (
                    <div className={"gravity-leftFill"} key={subCategory.name}>
                      <h5>{subCategory.name}</h5>
                      {subCategory.children.map(criteria => (
                        <div className={"criteria-container"} key={criteria.name}>
                          <legend className={"criteria-text"}>{criteria.name}</legend>
                          <FormControl component={"fieldset"}>
                            <RadioGroup
                              name={criteria.name}
                              onChange={this.handleChange}
                              value={
                                radioValue.find(r => r.name === criteria.name)
                                  ? radioValue[radioValue.findIndex(r => r.name === criteria.name)]
                                      .value
                                  : "3"
                              }
                              row={true}>
                              <FormControlLabel
                                value={"1"}
                                control={<CustomizedRadio />}
                                label={""}
                              />
                              <FormControlLabel
                                value={"2"}
                                control={<CustomizedRadio />}
                                label={""}
                              />
                              <FormControlLabel
                                value={"3"}
                                control={<CustomizedRadio />}
                                label={""}
                              />
                              <FormControlLabel
                                value={"4"}
                                control={<CustomizedRadio />}
                                label={""}
                              />
                              <FormControlLabel
                                value={"5"}
                                control={<CustomizedRadio />}
                                label={""}
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
