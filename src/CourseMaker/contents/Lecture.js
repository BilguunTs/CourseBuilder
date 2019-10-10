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
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expanded={false}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid xs item container direction="row" justify="space-between">
          {props.editable === true ? (
            <TextField />
          ) : (
            <Fragment>
              <Grid item>
                <Typography variant="overline">
                  {" "}
                  {props.title}
                  <Typography variant="caption">
                    {props.description !== ""
                      ? "-(" + props.description + ")"
                      : ""}
                  </Typography>
                </Typography>
              </Grid>

              <Grid item>
                <Button variant="outlined">Add Conent</Button>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </ExpansionPanelSummary>
      <AddContentButtons />
    </ExpansionPanel>
  );
}
