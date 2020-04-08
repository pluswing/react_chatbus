import React, { useState, useEffect } from "react";
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
import ChatBus from "./api";

interface Props {}

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.grey[500]
  }
}));

const api = new ChatBus("ws://localhost:9090/ws");

interface Bus {
  name: string;
  selected: boolean;
}

interface Hitchhiker {
  name: string;
}

const App: React.FC<Props> = props => {
  const classes = useStyles();

  const [chatBus, setChatBus] = useState<Bus[]>([]);
  const [hitchhikers, setHitchhikers] = useState<Hitchhiker[]>([]);

  useEffect(() => {
    api.subscribe("bus_list", (list: string[]) => {
      setChatBus(list.map(name => ({ name, selected: false })));
    });
    api.subscribe("hitchhiker_list", (data: any) => {
      console.log(data);
    });
    api.subscribe("open", (data: any) => {
      console.log("open!");
      api.busList();
      api.hitchhickerList();
    });
    // TODO websocketからデータをもらう
    setChatBus([
      { name: "aaa", selected: false },
      { name: "bbb", selected: false },
      { name: "ccc", selected: false }
    ]);
    setHitchhikers([{ name: "user1" }, { name: "user2" }, { name: "user3" }]);
  }, [props]);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.list}>
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
            {chatBus.map(bus => (
              <ListItem button>
                <ListItemText primary={bus.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          main
        </Grid>
        <Grid item xs={3} className={classes.list}>
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
            {hitchhikers.map(h => (
              <ListItem button>
                <ListItemText primary={h.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
