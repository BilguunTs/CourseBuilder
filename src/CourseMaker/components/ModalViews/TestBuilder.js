import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TestBuilder from "../../dragabbletest";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
  list: {},
  fullList: {
    width: "auto"
  }
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open === false) {
      setOpen(open);
      props.showdrawer(false);
    }
    setOpen(open);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        spacing={4}
        justify="center"
      >
        <SwipeableDrawer
          transitionDuration={10}
          style={{ zIndex: "0" }}
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <Grid item>
            <IconButton
              variant="extended"
              size="small"
              onClick={toggleDrawer(false)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TestBuilder />
          </Grid>
        </SwipeableDrawer>
      </Grid>
    </div>
  );
}
