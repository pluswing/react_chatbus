import React, { useState } from "react";
import { Container, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

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
          bus
        </Grid>
        <Grid item xs={6}>
          main
        </Grid>
        <Grid item xs={3}>
          users
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
