import React, { Fragment, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Clear";
import Card from "@material-ui/core/Card";
import QuizView from "./Quizview";

import update from "immutability-helper";
export default function DefaultView(props) {
  const TitleRef = useRef();
  const defRef = useRef();
  const myRef = useRef();
  const [elv, setElv] = useState(2);
  const [isBlank, setBlank] = useState(false);
  const [instance, setInstance] = useState({
    type: "",
    title: "",
    content: [{ question: "", options: [] }],
    description: "",
    editable: false
  });
  const setOption = array => {
    setInstance(
      update(instance, {
        content: { [0]: { options: { $push: [{ id: "" }] } } }
      })
    );
  };
  const addCapacity = () => {
    setInstance(
      update(instance, {
        content: {
          [1]: { capacity: { $set: instance.content[1].capacity + 1 } }
        }
      })
    );
  };
  const deleteChoice = Index => {
    setInstance(
      update(instance, {
        content: { [0]: { options: { $splice: [[Index, 1]] } } }
      })
    );
  };
  const SubmitLecture = event => {
    event.preventDefault();

    if (TitleRef.current.value.trim() == "") {
      return setBlank(true);
    }

    setBlank(false);
    instance.type = props.instancetype;
    instance.title = TitleRef.current.value;
    instance.description = defRef.current.value;
    instance.content = null;
    props.handleAdd(props.index, instance);
    setTimeout(() => props.setEditableMode(props.index, false), 100);
  };
  const SubmitQuiz = event => {
    event.preventDefault();
    instance.type = props.instancetype;
    instance.title = "Quiz";

    props.handleAdd(props.index, instance);
    setTimeout(() => props.setEditableMode(props.index, false), 100);
  };

  const RenderViews = () => {
    let InstanceView;

    switch (props.instancetype) {
      case "lecture":
        InstanceView = (
          <Fragment>
            <Grid item xs>
              <TextField
                autoFocus
                label="title"
                required
                error={isBlank}
                inputRef={TitleRef}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                rows={1}
                onFocus={() => (defRef.current.rows = 3)}
                onBlur={() => (defRef.current.rows = 1)}
                variant="filled"
                multiline={true}
                inputRef={defRef}
                label="description"
              />
            </Grid>
            <Grid item>
              <Button onClick={SubmitLecture.bind(this)} variant="contained">
                submit
              </Button>
            </Grid>
          </Fragment>
        );
        break;
      case "Quiz":
        InstanceView = (
          <React.Fragment>
            <QuizView
              addCapacity={addCapacity}
              instancedata={instance}
              setOption={setOption}
              deleteOption={deleteChoice}
              {...props}
              editable={true}
            />
            <Grid item>
              <Button onClick={SubmitQuiz.bind(this)} variant="contained">
                submit
              </Button>
            </Grid>
          </React.Fragment>
        );
        break;

      default:
        InstanceView = <div></div>;
    }
    return (
      <Card
        style={{
          padding: "15px"
        }}
        elevation={10}
      >
        <Grid
          xs
          item
          container
          direction="column"
          spacing={3}
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <IconButton
              onClick={() => props.setEditableMode(props.index, false)}
            >
              <RemoveIcon />
            </IconButton>
          </Grid>

          {InstanceView}
        </Grid>
      </Card>
    );
  };
  return <RenderViews />;
}
