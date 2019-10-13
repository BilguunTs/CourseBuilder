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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
export default function LectureView(props) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expanded={false}
        expandIcon={<ExpandMoreIcon />}
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
          {props.content.content !== null ? <Grid item>Lecture</Grid> : null}
        </Grid>
      </ExpansionPanelSummary>
      <Grid container justify="center">
        {props.content.content !== null ? (
          /**check content type then deside which one will be shown
           *  1).(video)-api iframe will be replaced with VABplayer or player
           *  2).(article)-api
           *  3).(book)-api
           */

          <Grid item xs={12}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${props.content.content}?controls=0`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Grid>
        ) : (
          <AddContentButtons {...props} />
        )}
      </Grid>
    </ExpansionPanel>
  );
}
