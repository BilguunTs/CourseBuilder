import React, { Fragment } from "react";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  TextField,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import AddContentButtons from "../components/container/Modal";
export default function LectureView(props) {
  console.log(props.content);
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expanded={false}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid xs item container direction="row" justify="space-between">
          {props.content.editable === true ? (
            <TextField />
          ) : (
            <Fragment>
              <Grid item>
                <Typography variant="overline">
                  {" "}
                  {props.content.title}
                  <Typography variant="caption">
                    {props.content.description !== ""
                      ? "-(" + props.content.description + ")"
                      : ""}
                  </Typography>
                </Typography>
              </Grid>
            </Fragment>
          )}
          {props.content.content !== null ? (
            <Grid item></Grid>
          ) : (
            <Grid item>
              <Button variant="outlined">Add Conent</Button>
            </Grid>
          )}
        </Grid>
      </ExpansionPanelSummary>
      {props.content.content !== null ? (
        <div>{props.content.content}</div>
      ) : (
        <AddContentButtons {...props} />
      )}
    </ExpansionPanel>
  );
}
