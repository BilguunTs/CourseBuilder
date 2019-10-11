import React from "react";
import Grid from "@material-ui/core/Grid";
import DefaultView from "../../contents/defaultContentView";
import LectureView from "../../contents/Lecture";
import QuizView from "../../contents/Quiz";
export const RenderContent = props => {
  const { content, ...rest } = props;
  let instance;
  let container = (
    <React.Fragment>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          {instance}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  switch (content.type) {
    case "lecture":
      instance = <LectureView {...props} />;

      break;
    case "Quiz":
      instance = <QuizView {...content} />;
      break;
    case "article":
      instance = <div>I am article</div>;
    default:
      return instance;
  }
  return instance;
};
