import React from "react";

import { Tabs, Tab, Paper, Typography, Grid } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Container from "./Container";
class BuilderTab extends React.PureComponent {
  state = {
    activeIndex: 0,
    Tabs: [
      { label: "week1", content: "one" },
      { label: "week2", content: "two" },
      { label: "week3", content: "three" }
    ]
  };

  handleAddWeek = () => {
    let num = this.state.Tabs.length;
    this.setState({
      Tabs: this.state.Tabs.concat({
        label: `week${num + 1}`,
        content: `I am ${num + 1}`
      })
    });
    return this.setState({ activeIndex: num });
  };
  handleChange = (_, activeIndex) => this.setState({ activeIndex });
  render() {
    const { activeIndex, Tabs } = this.state;
    console.log(activeIndex);
    return (
      <Paper>
        <Grid container justify="space-around" direction="row">
          <Grid item xs={3}>
            <VerticalTabs value={activeIndex} onChange={this.handleChange}>
              {this.state.Tabs.map((o, i) => (
                <MyTab key={i} label={o.label}></MyTab>
              ))}
              <MyTab onClick={this.handleAddWeek.bind(this)} label="+"></MyTab>
            </VerticalTabs>
          </Grid>
          <Grid item xs>
            {Tabs.map((o, i) => {
              return activeIndex === i ? (
                <TabContainer key={i}>{o.content}</TabContainer>
              ) : null;
            })}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: "column"
  },
  indicator: {
    display: "none"
  }
}))(Tabs);

const MyTab = withStyles(theme => ({
  selected: {
    color: "tomato",
    borderRight: "2px solid tomato"
  }
}))(Tab);

function TabContainer(props) {
  return (
    <div>
      <Container />
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    </div>
  );
}
export default BuilderTab;
