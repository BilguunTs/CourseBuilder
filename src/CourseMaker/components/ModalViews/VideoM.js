import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UploadView from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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

const VideoModal = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section style={{ margin: 0 }}>
      <AppBar color="default" elevation={0} position="relative">
        <CssBaseline />
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="url" {...a11yProps(0)} />
          <Tab label="upload" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

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
              autoFocus
              inputRef={ref}
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
    </section>
  );
});
export default VideoModal;
