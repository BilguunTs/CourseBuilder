import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import IconButton from "../utils/IconButtons";
import Grid from "@material-ui/core/Grid";
import VideoModal from "../ModalViews";
import CssBaseline from "@material-ui/core/CssBaseline";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${50}%`,
    left: `${50}%`
    // transform: `translate(-${top}%, -${left}%)`
  };
}

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
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
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
        instance = <VideoModal />;
        break;
      case "article":
        instance = <div> instance</div>;
        break;
      case "book":
        instance = <div>book</div>;
        break;
    }
    return instance;
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid item xs container direction="row">
        <Grid item>
          <div
            style={{ padding: "20px" }}
            onClick={handleOpen.bind(this, "video")}
          >
            <IconButton title="video" width="100%"></IconButton>
          </div>
        </Grid>
        <Grid item>
          <div style={{ padding: "20px" }}>
            <IconButton title="article" width="100%"></IconButton>
          </div>
        </Grid>
        <Grid item>
          <div style={{ padding: "20px" }}>
            <IconButton title="book" width="100%"></IconButton>
          </div>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div style={modalStyle} className={classes.paper}>
          <CssBaseline />
          <RenderModalViews />
        </div>
      </Modal>
    </div>
  );
}
