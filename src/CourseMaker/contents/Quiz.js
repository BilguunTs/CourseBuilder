import React, { Fragment } from "react";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  TextField,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@material-ui/core";
import PageIcon from "@material-ui/icons/LibraryBooks";
import AddContentButtons from "../components/container/Modal";
import QuizView from "./Quizview";
import HScontainer from "../components/utils/HorizontalScroll";
export default class Quiz extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { Quizs: [] };
  }
  UNSAFE_componentWillMount() {
    this._isMounted = true;
    this.setState({ Quiz: this.props.content });
    console.log(this.props.content);
    console.log(this.state.Quizs);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { Quizs } = this.state;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expanded={false}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid xs item container direction="row" justify="space-between">
            <Grid item>
              <PageIcon />
            </Grid>
            <Grid item>
              <Typography variant="button">{`Quistions-${this.props.content.length}`}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <div style={{ padding: "10px" }}>
          <HScontainer data={this.props.content} />
        </div>
      </ExpansionPanel>
    );
  }
}
//<QuizView data={props.content} editable={false} />
/**
 * <Grid container justify="center" direction="row">
            {this.props.content.map((quiz, index) => {
              return (
                <Paper key={index}>
                  <Grid item xs>
                    {
                      <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="stretch"
                      >
                        <Typography>{quiz.question}</Typography>
                        {quiz.options.map((option, i) => {
                          const labelId = `checkbox-list-label-${i}`;

                          return (
                            <Grid key={labelId} item xs>
                              <List>
                                <ListItem
                                  key={i}
                                  role={undefined}
                                  dense
                                  button={false}
                                >
                                  <ListItemText id={labelId}>
                                    <Typography>{option.value}</Typography>
                                  </ListItemText>
                                </ListItem>
                              </List>
                            </Grid>
                          );
                        })}
                      </Grid>
                    }
                  </Grid>
                </Paper>
              );
            })}
          </Grid>
 */
