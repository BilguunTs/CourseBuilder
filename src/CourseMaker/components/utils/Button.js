import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Cancel from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Testbuilder from "../ModalViews/TestBuilder";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const sectionRef = React.useRef();
  const [iserror, setError] = React.useState();
  const [showField, setShowField] = React.useState();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCreate = () => {
    if (sectionRef.current.value.trim() === "") {
      return setError(true);
    }

    props.addSection(sectionRef.current.value);
    setShowField(false);
    setError(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {showField === "section" ? (
        <div>
          <IconButton onClick={() => setShowField(false)}>
            <Cancel />
          </IconButton>
          <TextField
            autoFocus
            required
            variant="outlined"
            inputRef={sectionRef}
            error={iserror}
            label="section name"
          />
          <Button
            style={{ margin: "5px" }}
            onClick={handleCreate.bind(this)}
            variant="outlined"
          >
            Add
          </Button>
        </div>
      ) : showField === "test" ? (
        <Testbuilder open={true} />
      ) : (
        <React.Fragment>
          <Fab
            onClick={handleClick}
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.margin}
          >
            <AddIcon className={classes.extendedIcon} />
            Create
          </Fab>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClick={handleClose}
          >
            <StyledMenuItem onClick={() => setShowField("section")}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="new section" />
            </StyledMenuItem>
            <StyledMenuItem onClick={() => setShowField("test")}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Test" />
            </StyledMenuItem>
          </StyledMenu>{" "}
        </React.Fragment>
      )}
    </div>
  );
}
