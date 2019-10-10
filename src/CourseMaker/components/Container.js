import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Grid, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//===============
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import StepConnector from "@material-ui/core/StepConnector";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    /* "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }*/
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [steps, setSteps] = React.useState([{ content: "i am 1" }]);

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };
  const addStep = () => {
    let all = steps.length;
    setActiveStep(all);
    setSteps(steps.concat({ content: `i am ${all + 1}` }));
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowX: "scroll",
            boxSizing: "content-box"
          }}
        >
          <Stepper
            alternativeLabel
            connector={<ColorlibConnector />}
            activeStep={activeStep}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              for (let i = 0; i <= steps.length; i++) {
                if (activeStep !== steps[i]) {
                  stepProps.completed = false;
                }
              }
              return (
                <Step key={index} {...stepProps}>
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    style={{ cursor: "pointer" }}
                    onClick={setActiveStep.bind(this, index)}
                    {...labelProps}
                  ></StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>

      <div>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={1}>
            <IconButton
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              <ChevronLeft />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography className={classes.instructions}>
              {steps.map((o, i) => {
                return activeStep === i ? <Paper>{o.content}</Paper> : null;
              })}
            </Typography>
            <Button variant="contained" onClick={addStep}>
              Add
            </Button>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              disabled={activeStep === steps.length - 1 ? true : false}
              variant="contained"
              onClick={handleNext}
              className={classes.button}
            >
              <ChevronRight />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
