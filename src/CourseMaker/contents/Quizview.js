import React, { Fragment } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeStyles,
  Radio,
  RadioGroup,
  ListItem,
  ListItemIcon,
  IconButton,
  FormControlLabel,
  FormControl,
  List,
  Grid,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Input,
  Button,
  Typography,
  Paper
} from "@material-ui/core";
//import arrayMove from "array-move";
import Clear from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/AddOutlined";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 360
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 3)
  }
}));

function QuizView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("female");
  const { isEditable, id, context } = props;
  const [activeIndex, setActiveIntex] = React.useState(0);
  const theme = useTheme();
  const quistionRef = React.useRef();
  const choiceRef = React.useRef();
  const [array, setArray] = React.useState({ lists: [1, 2, 3, 4] });

  function handleChange(event) {
    setValue(event.target.value);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    /* setArray(({ lists }) => ({
      lists: arrayMove(lists, oldIndex, newIndex)
    }));*/
  };
  const SortableItem = SortableElement(({ value }) => {
    return (
      <FormControlLabel value={value} control={<Radio />} label="Female" />
    );
  });
  const addAnswer = () => {
    let instance = { id: "", value: "" };
    let _id =
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9);
    /* generates new instance of form
    let New = Object.assign({}, config.defaultAnswer);
    New.formID = _id;*/
    instance.id = _id;
    //  context.addAnswer(id, instance);
  };
  const renderEditable = () => {
    return (
      <SortableContainer
        onSortEnd={onSortEnd}
        lockAxis="y"
        onSortEnd={onSortEnd}
        useDragHandle
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.group}
            value={value}
            onChange={handleChange}
          >
            {array.lists.map((o, i) => {
              return <SortableItem key={i} value={o} index={i} />;
            })}
          </RadioGroup>
        </FormControl>
      </SortableContainer>
    );
  };
  const renderClient = () => {
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
      </FormControl>
    );
  };
  console.log(props);
  const [checked, setChecked] = React.useState([0]);

  const [mainIndex, setMainIndex] = React.useState(0);
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //let index;

  /* context.state.answers.find((o, i) => {
    if (o.formID == id) {
      return (index = i);
    }
  });*/
  function handlePre() {
    setMainIndex(prevActiveStep => prevActiveStep - 1);
  }
  function handleNext() {
    //setContent(myRef.current);
    setMainIndex(prevActiveStep => prevActiveStep + 1);
  }
  function handleAdd(e) {
    props.setOption();
    e.target.focus();
  }
  return (
    <Fragment>
      {props.editable === true ? (
        <Paper>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={mainIndex}
            onChangeIndex={() =>
              setMainIndex(prevActiveStep => prevActiveStep + 1)
            }
          >
            <div>
              {
                <Grid
                  container
                  direction="column"
                  justify="space-evenly"
                  alignItems="stretch"
                >
                  <TextField
                    autoFocus
                    style={{ margin: "3px", padding: "3px" }}
                    onChange={() => {
                      return (props.instancedata.content[0].question =
                        quistionRef.current.value);
                    }}
                    defaultValue={`${props.instancedata.content[0].question}`}
                    inputRef={quistionRef}
                    label="Quistion"
                    required
                  />
                  {props.instancedata.content[0].options.map((o, i) => {
                    const labelId = `checkbox-list-label-${i}`;

                    return (
                      <List key={labelId}>
                        <Grid item xs>
                          <ListItem
                            key={i}
                            role={undefined}
                            dense
                            button={false}
                          >
                            <ListItemText id={labelId}>
                              <TextField
                                autoFocus
                                inputRef={choiceRef}
                                onChange={e =>
                                  (props.instancedata.content[0].options[
                                    i
                                  ].value = e.target.value)
                                }
                                defaultValue={o.value}
                              />
                            </ListItemText>
                            <ListItemSecondaryAction>
                              <IconButton
                                onClick={props.deleteOption.bind(this, i)}
                                edge="end"
                                aria-label="comments"
                              >
                                <Clear />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Grid>
                      </List>
                    );
                  })}

                  <Button onClick={handleAdd.bind(this)}>
                    <AddIcon />
                  </Button>
                </Grid>
              }
            </div>
            <div> try me bitch</div>
          </SwipeableViews>
        </Paper>
      ) : (
        props.data.map((quiz, index) => {
          return (
            <List key={index} className={classes.root}>
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
                        <ListItem key={i} role={undefined} dense button={false}>
                          <ListItemText id={labelId}>
                            <Typography>{option.value}</Typography>
                          </ListItemText>
                        </ListItem>
                      </Grid>
                    );
                  })}
                </Grid>
              }
            </List>
          );
        })
      )}
    </Fragment>
  );
}
export default QuizView;
