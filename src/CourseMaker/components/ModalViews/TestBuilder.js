import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TestBuilder from "../../dragabbletest";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
    <Card elevation={10} style={{ background: "#f5f5f5", margin: "5px" }}>
      <CardHeader
        title="Test title"
        action={
          <IconButton
            variant="extended"
            size="medium"
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>
        }
        subheader="test by"
      ></CardHeader>
      <CardContent>
        <TestBuilder />
      </CardContent>
      <CardActions>
        <Button variant="text" fullWidth color="primary">
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
/**old
 * <Grid
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
 */
