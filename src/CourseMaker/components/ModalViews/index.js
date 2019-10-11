import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import VideoIcon from "@material-ui/icons/VideoLabel";
import ArticleIcon from "@material-ui/icons/ChromeReaderMode";
import BookIcon from "@material-ui/icons/Book";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CssBaseline from "@material-ui/core/CssBaseline";
import VideoModalview from "./VideoM";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box style={{ padding: 0 }} p={3}>
        {children}
      </Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `modal-type-${index}`,
    "aria-controls": `modal-type-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MainModal(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.jumpto);
  const urlRef = React.useRef(false);
  const [error, setError] = React.useState();
  const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { jumpto, closethis, addContent, rootindex, innerindex } = props;
  let instance = {
    type: "",
    content: ""
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const HandleSubmit = () => {
    let text = urlRef.current;
    if (regex.test(text.value) === true) {
      addContent(rootindex, innerindex, text.value);
      setOpen(false);
      return closethis();
    } else {
      return (text.error = true);
    }
  };
  const handleCloseModal = () => {
    setOpen(false);
    closethis();
  };
  return (
    <Dialog maxWidth="md" fullWidth={true} open={open} fullScreen={fullScreen}>
      <CssBaseline />
      <DialogTitle style={{ padding: 0 }}>
        <AppBar elevation={5} position="static" color="primary">
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            textColor="default"
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="video"
              icon={<VideoIcon style={{ color: "#eee" }} />}
              {...a11yProps(0)}
            />
            <Tab
              label="article"
              icon={<ArticleIcon style={{ color: "#eee" }} />}
              {...a11yProps(1)}
            />
            <Tab
              label="book"
              icon={<BookIcon style={{ color: "#eee" }} />}
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
      </DialogTitle>
      <DialogContent style={{ padding: 0, margin: 0 }}>
        <TabPanel value={value} index={0}>
          <VideoModalview ref={urlRef} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          article goes here
        </TabPanel>
        <TabPanel value={value} index={2}>
          book goes here
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseModal.bind(this)}>
          {" "}
          cancel
        </Button>
        <Button color="primary" onClick={HandleSubmit.bind(this)}>
          {" "}
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
