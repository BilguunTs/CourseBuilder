import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function ContentNavigator({ data }) {
  const classes = useStyles();
  const RenderTree = () => {
    return data.sections.map((section, i) => {
      return (
        <TreeItem nodeId={i} key={i} label={section.title}>
          {section.contents.length > 0 ? (
            <>
              {section.contents.map((content, i) => (
                <TreeItem nodeId={i} key={i} label={content.title} />
              ))}
            </>
          ) : null}
        </TreeItem>
      );
    });
  };
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <RenderTree />
    </TreeView>
  );
}


