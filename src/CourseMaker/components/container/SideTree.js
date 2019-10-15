import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function ContentNavigator({ sections }) {
  const classes = useStyles();
  const RenderTree = () => {
    return sections.map((section, i) => {
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
      defaultChecked={true}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultCollapseIcon={<ExpandMoreIcon />}
      className={classes.root}
    >
      <RenderTree />
    </TreeView>
  );
}


