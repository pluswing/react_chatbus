import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
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
    api.subscribe({
      name: "bus_list",
      callback: (list: string[]) => {
        setChatBus(list.map(name => ({ name, selected: false })));
      }
    });
    api.subscribe({
      name: "hitchhicker_list",
      callback: (data: string[]) => {
        setHitchhikers(data.map(name => ({ name })));
      }
    });
    api.subscribe({
      name: "open",
      callback: () => {
        api.busList();
        api.hitchhickerList();
      }
    });
  }, [props]);

  const [input, setInput] = useState<string>("");
  const onChange = useCallback(
    (event: any) => {
      setInput(event.target.value);
    },
    [setInput]
  );
  const onSend = useCallback(() => {
    if (api.isEmptyName()) {
      setUserName();
      return;
    }
    api.chat(input);
    setInput("");
  }, [setInput, input]);

  const setUserName = () => {
    const name = prompt("username?", "");
    if (name) {
      api.username(name);
    }
  };

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
          <Grid container>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    aaaaaaaaaaaa
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Message"
                multiline
                rows="4"
                fullWidth
                value={input}
                variant="outlined"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" onClick={onSend}>
                SEND
              </Button>
            </Grid>
          </Grid>
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
