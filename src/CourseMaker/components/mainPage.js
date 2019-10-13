import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StreamPage from "./StreamPage";
import CurriculumPage from "./Curriculum";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideTree from "./container/SideTree";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      style={{ padding: "0 0 500px 0" }}
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Stream" href="/s" {...a11yProps(0)} />
          <LinkTab label="Curriculum" href="/c" {...a11yProps(1)} />
          <LinkTab label="Students" href="/p" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <StreamPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CurriculumPage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Students
      </TabPanel>
    </Paper>
  );
}
