import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContentTree from "./SideTree";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function ProgressBar(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title="Course title goes here"
        subheader="course creator or something"
      />
      <CardContent>
        <Typography>this is course about something</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" color="primary">
          publish
        </Button>
      </CardActions>
    </Card>
  );
}
