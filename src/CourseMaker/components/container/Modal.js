import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "../utils/IconButtons";
import Grid from "@material-ui/core/Grid";
import BaseModal from "../ModalViews";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: "10px"
    //padding: theme.spacing(2, 4, 3)
  }
}));

export default function ContentManager(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState();
  const handleOpen = type => {
    setType(type);
    setOpen(true);
  };
  const RenderModalViews = () => {
    let instance;
    switch (type) {
      case "video":
        instance = <BaseModal {...props} closethis={handleClose} jumpto={0} />;
        break;
      case "article":
        instance = <BaseModal {...props} closethis={handleClose} jumpto={1} />;
        break;
      case "book":
        instance = <BaseModal {...props} closethis={handleClose} jumpto={2} />;
        break;
      default:
        instance = null;
    }
    return instance;
  };
  const handleClose = () => {
    setType(null);
    setOpen(false);
  };

  return (
    <div>
      <Grid item xs container direction="row" justify="center">
        {["video", "article", "book"].map((o, i) => {
          return (
            <Grid key={i} onClick={handleOpen.bind(this, o)} item xs>
              <IconButton title={o} width="100%"></IconButton>
            </Grid>
          );
        })}
      </Grid>

      <RenderModalViews />
    </div>
  );
}
