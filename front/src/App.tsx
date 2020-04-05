import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { Send as SendIcon } from "@material-ui/icons";

interface Props {}

const useStyles = makeStyles(theme => ({
  red: {
    backgroundColor: red[500]
  }
}));

const App: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.red}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <SendIcon />
                ChatBus
              </ListSubheader>
            }
          >
            <ListItem button>
              <ListItemText primary="room name" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          main
        </Grid>
        <Grid item xs={3}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <SendIcon />
                hitchhikers
              </ListSubheader>
            }
          >
            <ListItem button>
              <ListItemText primary="username" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
