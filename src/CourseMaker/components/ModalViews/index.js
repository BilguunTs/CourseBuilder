import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UploadView from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MyComponent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const urlRef = React.useRef(false);
  const [error, setError] = React.useState();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const HandleSubmit = () => {
    if (urlRef.current.value.trim() === "") {
      return setError(true);
    }
    console.log(urlRef.current.value);
    setError(false);
  };

  return (
    <Dialog maxWidth="md" fullWidth={true} open={open} fullScreen={fullScreen}>
      <CssBaseline />
      <DialogTitle style={{ padding: 0 }}>
        <AppBar color="default" position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="url" {...a11yProps(0)} />
            <Tab label="upload" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
      </DialogTitle>
      <DialogContent>
        <TabPanel value={value} index={0}>
          <Grid
            container
            justify="center"
            direction="row"
            spacing={5}
            alignItems="center"
          >
            <Grid item xs>
              <TextField
                error={error}
                inputRef={urlRef}
                required
                label="video url"
                fullWidth
                placeholder="youtube.com/videoID etc "
                variant="outlined"
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UploadView />
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
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
