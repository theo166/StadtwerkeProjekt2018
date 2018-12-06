import {
  Button,
  Checkbox,
  InputBase,
  List,
  ListItem,
  Typography,
  WithStyles
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import * as React from "react";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";
import { styles } from "../mUIstyles";
import { Competence } from "./CompetenceCreation";
import AddIcon from "@material-ui/icons/Add";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from "@material-ui/core/es/Collapse/Collapse";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import withStyles from "@material-ui/core/es/styles/withStyles";
import "./MainCategoryCreation.css";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/es/Radio/Radio";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";

interface Props extends WithStyles<typeof styles> {
  developmentForm: Competence[];
  onChange?: (index, index2, index3, index4) => void;
  onClickAddButton: (index, index2, index3) => void;
  classes: any;
  name: string;
}

export interface Criteria {
  name: string;
  checked: boolean;
  value: string;
}

const theme = createMuiTheme({
  overrides: {
    MuiCheckbox: {
      root: {
        color: "#1A223A !important",
        "&$checked": {
          color: "#00a8e1 !important"
        }
      },
      checked: {}
    }
  }
});

class CriteriaCreation extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      checked: [0]
    };
  }

  handleRename = (event: any, index, index2, index3, index4) => {
    const target = event.currentTarget;
    this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
      index4
    ].name = target.value;

    // forceUpdate() eher hacky, aber Ansatz über this.setState(this.state) zum rerendern funktioniert nicht.
    this.forceUpdate();
  };

  handleToggle = (event: any, index, index2, index3, index4) => {
    if (
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
        index4
      ].checked
    ) {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
        index4
      ].checked = false;
    } else {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
        index4
      ].checked = true;
    }
    this.forceUpdate();
  };

  handleCompetenceClick = (event: any, index) => {
    if (this.props.developmentForm[index].open) {
      this.props.developmentForm[index].open = false;
    } else {
      this.props.developmentForm[index].open = true;
    }
    this.forceUpdate();
  };

  handleMainCategoryClick = (event: any, index, index2) => {
    if (this.props.developmentForm[index].MainCategories[index2].open) {
      this.props.developmentForm[index].MainCategories[index2].open = false;
    } else {
      this.props.developmentForm[index].MainCategories[index2].open = true;
    }
    this.forceUpdate();
  };

  handleSubCategoryClick = (event: any, index, index2, index3) => {
    if (this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].open) {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].open = false;
    } else {
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].open = true;
    }
    this.forceUpdate();
  };

  handleRadioClick = (event: any, index, index2, index3, index4, value) => {
    this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
      index4
    ].value = value;
    this.forceUpdate();
    console.log(
      "Value: ",
      this.props.developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria[
        index4
      ].value
    );
  };

  //TODO Tooltip anpassen
  description =
    "Durch einen Klick auf ein Plus-Symbol, wird zu der darüber liegenden Hauptkategorie " +
    "eine Unterkategorie erstellt. Doppelklick auf den Namen der Unterkategorie ermöglicht " +
    "es diese umzubennen.";

  render() {
    const { developmentForm, classes, onClickAddButton } = this.props;

    return (
      <div className={"step3"}>
        <div className={"taskDescription"}>
          <Typography variant={"subtitle2"}>
            Erstellung, Benennung und Auswahl von Unterkategorien für zugehörige Hauptkategorien
          </Typography>
          <Tooltip title={this.description}>
            <InfoIcon className={classes.infoIcon} color={"disabled"} />
          </Tooltip>
        </div>
        <div className={"step3form"}>
          <List className={"list"}>
            {developmentForm.map((competence, index) => (
              <div key={index}>
                <ListItem
                  button
                  dense={true}
                  divider={true}
                  name={"developmentForm"}
                  onClick={e => {
                    this.handleCompetenceClick(e, index);
                  }}>
                  <InputBase
                    disabled={true}
                    className={classes.disabledInputBase}
                    value={developmentForm[index].name}
                    name={name}
                    style={{ color: "black", width: 800 }}
                  />
                  {developmentForm[index].open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={developmentForm[index].open} timeout={"auto"} unmountOnExit>
                  {developmentForm[index].MainCategories.map((mainCategories, index2) => {
                    return (
                      <List key={index2}>
                        <ListItem
                          button
                          dense={false}
                          divider={true}
                          name={"developmentForm"}
                          className={classes.nested}
                          onClick={e => {
                            this.handleMainCategoryClick(e, index, index2);
                          }}>
                          <InputBase
                            disabled={true}
                            className={classes.disabledInputBase}
                            value={developmentForm[index].MainCategories[index2].name}
                            name={name}
                            style={{ color: "black", width: 800 }}
                          />
                          {developmentForm[index].MainCategories[index2].open ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItem>
                        <Collapse
                          in={developmentForm[index].MainCategories[index2].open}
                          timeout={"auto"}
                          unmountOnExit>
                          {developmentForm[index].MainCategories[index2].SubCategories.map(
                            (subcategories, index3) => {
                              return (
                                <div key={index3}>
                                  <ListItem
                                    button
                                    dense={true}
                                    divider={true}
                                    name={"developmentForm"}
                                    className={classes.nested}
                                    onClick={e => {
                                      this.handleSubCategoryClick(e, index, index2, index3);
                                    }}>
                                    <InputBase
                                      disabled={true}
                                      className={classes.margin}
                                      value={
                                        developmentForm[index].MainCategories[index2].SubCategories[
                                          index3
                                        ].name
                                      }
                                      style={{ color: "black", width: 800 }}
                                      name={name}
                                    />
                                    {developmentForm[index].MainCategories[index2].SubCategories[
                                      index3
                                    ].open ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItem>

                                  <Collapse
                                    in={
                                      developmentForm[index].MainCategories[index2].SubCategories[
                                        index3
                                      ].open
                                    }
                                    timeout={"auto"}
                                    unmountOnExit>
                                    {developmentForm[index].MainCategories[index2].SubCategories[
                                      index3
                                    ].Criteria.map((criteria, index4) => {
                                      return (
                                        <div key={index4}>
                                          <ListItem
                                            dense={true}
                                            divider={true}
                                            name={"developmentForm"}
                                            className={classes.nested}>
                                            <MuiThemeProvider theme={theme}>
                                              <Checkbox
                                                checked={
                                                  this.props.developmentForm[index].MainCategories[
                                                    index2
                                                  ].SubCategories[index3].Criteria[index4].checked
                                                }
                                                onClick={e => {
                                                  this.handleToggle(
                                                    e,
                                                    index,
                                                    index2,
                                                    index3,
                                                    index4
                                                  );
                                                }}
                                              />
                                            </MuiThemeProvider>
                                            <InputBase
                                              className={classes.margin}
                                              value={
                                                developmentForm[index].MainCategories[index2]
                                                  .SubCategories[index3].Criteria[index4].name
                                              }
                                              onChange={e => {
                                                this.handleRename(e, index, index2, index3, index4);
                                              }}
                                              style={{ width: 800 }}
                                              name={name}
                                            />
                                            <ListItemSecondaryAction>
                                              <FormControl component={"fielsdset"}>
                                                <RadioGroup
                                                  aria-label={"value"}
                                                  name={"value"}
                                                  value={
                                                    developmentForm[index].MainCategories[index2]
                                                      .SubCategories[index3].Criteria[index4].value
                                                  }
                                                  row>
                                                  <FormControlLabel
                                                    value={"1"}
                                                    control={<Radio color={"primary"} />}
                                                    label={"1"}
                                                    onClick={e => {
                                                      this.handleRadioClick(
                                                        e,
                                                        index,
                                                        index2,
                                                        index3,
                                                        index4,
                                                        "1"
                                                      );
                                                    }}
                                                  />
                                                  <FormControlLabel
                                                    value={"2"}
                                                    control={<Radio color={"primary"} />}
                                                    label={"2"}
                                                    onClick={e => {
                                                      this.handleRadioClick(
                                                        e,
                                                        index,
                                                        index2,
                                                        index3,
                                                        index4,
                                                        "2"
                                                      );
                                                    }}
                                                  />
                                                  <FormControlLabel
                                                    value={"3"}
                                                    control={<Radio color={"primary"} />}
                                                    label={"3"}
                                                    onClick={e => {
                                                      this.handleRadioClick(
                                                        e,
                                                        index,
                                                        index2,
                                                        index3,
                                                        index4,
                                                        "3"
                                                      );
                                                    }}
                                                  />
                                                  <FormControlLabel
                                                    value={"4"}
                                                    control={<Radio color={"primary"} />}
                                                    label={"4"}
                                                    onClick={e => {
                                                      this.handleRadioClick(
                                                        e,
                                                        index,
                                                        index2,
                                                        index3,
                                                        index4,
                                                        "4"
                                                      );
                                                    }}
                                                  />
                                                  <FormControlLabel
                                                    value={"5"}
                                                    control={<Radio color={"primary"} />}
                                                    label={"5"}
                                                    onClick={e => {
                                                      this.handleRadioClick(
                                                        e,
                                                        index,
                                                        index2,
                                                        index3,
                                                        index4,
                                                        "5"
                                                      );
                                                    }}
                                                  />
                                                </RadioGroup>
                                              </FormControl>
                                            </ListItemSecondaryAction>
                                          </ListItem>
                                        </div>
                                      );
                                    })}
                                    <div className={"buttonFlex"}>
                                      <div />
                                      <Button
                                        color={"primary"}
                                        variant={"fab"}
                                        aria-label={"Add"}
                                        mini
                                        className={"AddIcon"}
                                        onClick={() => onClickAddButton(index, index2, index3)}>
                                        <AddIcon />
                                      </Button>
                                    </div>
                                  </Collapse>
                                </div>
                              );
                            }
                          )}
                        </Collapse>
                      </List>
                    );
                  })}
                </Collapse>
              </div>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CriteriaCreation);