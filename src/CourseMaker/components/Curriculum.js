import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import MainButton from "./utils/Button";
import MainSection from "./container/MainSection";
import update from "immutability-helper";
import SideTree from "./container/SideTree";
import ProgressBar from "./container/ProgressBar";
class Curriculum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [
        {
          editablemode: false,
          targetIndex: 0,
          title: "week1",
          contents: [
            {
              type: "lecture",
              title: "bb",
              description: "dummy",
              content: null,
              editable: false
            },
            {
              type: "lecture",
              title: "aa",
              description: "dummy",
              content: null,
              editable: false
            },
            {
              type: "lecture",
              title: "cxc",
              description: "dummy",
              content: null,
              editable: false
            },
            {
              type: "Quiz",
              title: "",
              content: [
                {
                  question: "What is pi?",
                  options: [
                    { id: "", value: "it is movie" },
                    { id: "", value: "number" },
                    { id: "", value: "word" },
                    { id: "", value: "above all" }
                  ]
                },
                {
                  question: "What ne?",
                  options: [
                    { id: "", value: "it is movie" },
                    { id: "", value: "number" },
                    { id: "", value: "word" },
                    { id: "", value: "above all" }
                  ]
                }
              ],
              editable: false
            }
          ]
        }
      ]
    };
  }
  addSection = title => {
    this.setState({
      sections: this.state.sections.concat({
        title: title,
        targetIndex: 0,
        contents: [],
        editablemode: false
      })
    });
  };
  handleAdd = (indexof, obj) => {
    let instance = { type: "", content: null, editable: true };
    this.setState({
      sections: update(this.state.sections, {
        [indexof]: {
          editablemode: { $set: true },
          contents: { $push: [obj || instance] }
        }
      })
    });
  };
  setEditable = (rootindex, innerindex, boolean) => {
    this.setState({
      sections: update(this.state.sections, {
        [rootindex]: {
          contents: { [innerindex]: { editable: { $set: false } } }
        }
      })
    });
  };
  addContent = (sectionIndex, rootIndex, contentValue) => {
    this.setState({
      sections: update(this.state.sections, {
        [sectionIndex]: {
          contents: { [rootIndex]: { content: { $set: contentValue } } }
        }
      })
    });
  };
  setEditableMode = (index, boolean) => {
    this.setState({
      sections: update(this.state.sections, {
        [index]: { editablemode: { $set: boolean === true ? true : false } }
      })
    });
  };
  addChoiceforQuiz = (sectionIndex, contentIndex, innercontentIndex, value) => {
    this.setState({
      sections: update(this.state.sections, {
        [sectionIndex]: {
          contents: {
            [contentIndex]: {
              content: {
                [innercontentIndex]: { options: { $push: [[value]] } }
              }
            }
          }
        }
      })
    });
  };
  removeChoicefromQuiz = (
    sectionIndex,
    contentIndex,
    innercontentIndex,
    targetindexinsideinnerIndex
  ) => {
    this.setState({
      sections: update(this.state.sections, {
        [sectionIndex]: {
          contents: {
            [contentIndex]: {
              content: {
                [innercontentIndex]: {
                  options: { $splice: [[targetindexinsideinnerIndex, 1]] }
                }
              }
            }
          }
        }
      })
    });
  };
  render() {
    return (
      <div>
        <Grid container direction="row" justify="center" spacing={3}>
          {" "}
          <Grid
            lg={2}
            sm={12}
            item
            style={{ zIndex: 1, position: "sticky", top: 50, height: " 25vh" }}
          >
            <ProgressBar {...this.state} />
          </Grid>
          <Grid item xs container direction="column" justify="center">
            <Grid item xs>
              <MainSection
                addChoice={this.addChoiceforQuiz}
                removeChoice={this.removeChoicefromQuiz}
                addContent={this.addContent}
                handleAdd={this.handleAdd}
                setEditable={this.setEditable}
                setEditableMode={this.setEditableMode}
                {...this.state}
              />
            </Grid>
            <Grid item xs>
              <MainButton addSection={this.addSection} />
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            style={{ zIndex: 1, position: "sticky", top: 50, height: " 25vh" }}
          >
            <SideTree {...this.state} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Curriculum;
