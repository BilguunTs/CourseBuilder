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

/*<TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>*/
