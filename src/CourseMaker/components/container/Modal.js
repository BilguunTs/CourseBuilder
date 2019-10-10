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

export default function SimpleModal() {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [hascontent, setHasContent] = React.useState();
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
        instance = (
          <BaseModal
            closethis={handleClose}
            submit={setHasContent}
            jumpto={0}
          />
        );
        break;
      case "article":
        instance = (
          <BaseModal
            closethis={handleClose}
            submit={setHasContent}
            jumpto={1}
          />
        );
        break;
      case "book":
        instance = (
          <BaseModal
            closethis={handleClose}
            submit={setHasContent}
            jumpto={2}
          />
        );
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
      {hascontent ? (
        <h1>has content</h1>
      ) : (
        <Grid item xs container direction="row">
          {["video", "article", "book"].map((o, i) => {
            return (
              <Grid key={i} item>
                <div
                  style={{ padding: "10px" }}
                  onClick={handleOpen.bind(this, o)}
                >
                  <IconButton title={o} width="100%"></IconButton>
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
      <RenderModalViews />
    </div>
  );
}
