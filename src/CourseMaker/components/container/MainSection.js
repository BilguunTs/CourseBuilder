import React from "react";
import {
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  Button,
  TextField,
  Grid
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { renderContent } from "./ContentContainer";
import DefaultView from "../../contents/defaultContentView";
import Image from "../../image1.svg";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));
const buttontypes = [
  { value: "lecture" },
  { value: "Quiz" },
  { value: "Assignment" }
];

export default function SimpleExpansionPanel(props) {
  const [formvalue, setFormValue] = React.useState(" ");
  const classes = useStyles();
  const [editable, setEditable] = React.useState(false);

  const [showbuttons, setShowButtons] = React.useState();
  const [instancetype, setInstance] = React.useState();

  const handleClick = (i, val) => {
    //props.handleAdd(i, val);
    setInstance(val);
    props.setEditableMode(i, true);
    setEditable(true);
    //  return InputRef.current.focus();
  };
  const RenderButtons = ({ index }) => {
    return (
      <Grid container justify="center" direction="row" spacing={1}>
        {buttontypes.map(button => (
          <Grid item key={`key${button.value}`}>
            <Button
              onClick={handleClick.bind(this, index, button.value)}
              variant="outlined"
              color="primary"
            >{`+ add ${button.value}`}</Button>
          </Grid>
        ))}
      </Grid>
    );
  };
  //======================================
  const handleSubmit = (event, rI, iI) => {
    /*   if (InputRef.current.value === "" && InputRef.current.value === undefined) {
      return console.warn("Title must be given");
    }*/

    // setEditable(false);
    props.setEditable(rI, iI);
    props.setEditableMode(rI, false);
    setShowButtons(false);
    console.log(props);
    event.preventDefault();
  };

  const handleChange = event => {
    setFormValue(event.target.value);
  };

  //=====================================
  return (
    <div className={classes.root}>
      {props.sections.map((section, index) => {
        return (
          <div
            style={{
              backgroundColor: "#eee",
              padding: "10px",
              margin: "5px",
              borderRadius: "5px"
            }}
            key={index}
          >
            <Typography className={classes.heading}>{section.title}</Typography>

            <div
              style={{
                padding: "20px"
              }}
            >
              {section.contents.map((c, i) => {
                return c ? (
                  renderContent(c, index, i)
                ) : (
                  <img
                    src={Image}
                    style={{ opacity: "0.5", maxWidth: "100%", height: "auto" }}
                  />
                );
              })}
            </div>

            <div style={{ padding: "20px" }}>
              {section.editablemode ? (
                <DefaultView
                  index={index}
                  instancetype={instancetype}
                  {...props}
                />
              ) : null}
            </div>
            {section.editablemode === false ? (
              <RenderButtons index={index} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
