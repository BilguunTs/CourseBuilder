/**
 * ===============================
 *   ****** Test Builder********
 * This app is inspired by google
 * survey and form builder powered
 * by MIT licenses
 *
 * ==============================
 */
import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import MainView from "./sortablelistdrag/draghandle";
import { ContextWrapper, Contextulize } from "./all/Context";
import Fab from "@material-ui/core/Fab";
//import SideButton from "./card/components/SideButtons";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
class DragTest extends Component {
  render() {
    return (
      <ContextWrapper>
        <Contextulize.Consumer>
          {ct => {
            return (
              <Fragment>
                <Grid
                  container
                  justify="center"
                  alignItems="stretch"
                  direction="row"
                >
                  <Grid item xs={12}>
                    <MainView />
                  </Grid>
                  <Grid item style={{ position: "sticky", right: "20px" }}>
                    <Fab onClick={ct.addForm.bind(this)} color="primary">
                      <SpeedDialIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Fragment>
            );
          }}
        </Contextulize.Consumer>
      </ContextWrapper>
    );
  }
}

export default DragTest;
/**
 * <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.primary}
                          secondary={item.secondary}
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
 * 
 * 
 *  <ListItem
                  {...provided.droppableProps}
                  innerRef={provided.innerRef}
                  style={{ border: "1px solid black", padding: "0" }}
                  dense={true}
                  alignItems="center"
                  autoFocus={true}
                  key={index}
                  role={undefined}
                >
                  {<FormField key={index} id={task.id} index={index} />}
                  {provided.placeholder}
                </ListItem>
 */
