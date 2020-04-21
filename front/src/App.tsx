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
  Button,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Send as SendIcon, Add as AddIcon } from "@material-ui/icons";
import ChatBus, { SubscribeType } from "./api";

interface Props {}

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.grey[500],
  },
  selected: {
    backgroundColor: theme.palette.grey[200],
  },
  messageBox: {
    marginTop: "20px",
  },
}));

const api = new ChatBus("ws://localhost:9090/ws");

interface Bus {
  name: string;
  selected: boolean;
}

interface Hitchhiker {
  name: string;
}

interface Message {
  text: string;
  sender: string;
}

type MessageDict = {
  [key: string]: Message[];
};

const App: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [chatBus, setChatBus] = useState<Bus[]>([]);
  const [currentBusName, setCurrentBusName] = useState<string>("default");
  const [hitchhikers, setHitchhikers] = useState<Hitchhiker[]>([]);
  const [messages, setMessages] = useState<MessageDict>({});

  const subscribes: SubscribeType[] = [
    {
      name: "bus_list",
      callback: (list: string[]) => {
        setChatBus(
          list.map((name) => ({ name, selected: currentBusName === name }))
        );
      },
    },
    {
      name: "bus_subscribed",
      callback: (busName: string) => {
        setCurrentBusName(busName);
        api.busList();
      },
    },
    {
      name: "hitchhicker_list",
      callback: (data: string[]) => {
        setHitchhikers(data.map((name) => ({ name })));
      },
    },
    {
      name: "chat",
      callback: (message: Message) => {
        const list = messages[currentBusName] || [];
        const newMessages = { ...messages };
        newMessages[currentBusName] = [...list, message];
        setMessages(newMessages);
      },
    },
    {
      name: "username_error",
      callback: () => {
        alert("username error!");
      },
    },
    {
      name: "username",
      callback: (userName: string) => {
        api.setUserName(userName);
      },
    },
    {
      name: "open",
      callback: () => {
        api.busList();
        api.hitchhickerList();
      },
    },
  ];

  useEffect(() => {
    subscribes.forEach((s) => {
      api.subscribe(s);
    });
    return () => {
      subscribes.forEach((s) => {
        api.unsubscribe(s);
      });
    };
  });

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

  const addChatBus = useCallback(() => {
    const name = prompt("busname?", "");
    if (name) {
      api.addBus(name);
    }
  }, []);

  const moveBus = (busName: string) => {
    api.busSubscribed(busName);
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
            {chatBus.map((bus) => (
              <ListItem
                button
                key={bus.name}
                className={bus.selected ? classes.selected : classes.list}
                onClick={() => moveBus(bus.name)}
              >
                <ListItemText primary={bus.name} />
              </ListItem>
            ))}
            <ListItem>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add" onClick={addChatBus}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              {(messages[currentBusName] || []).map((m) => (
                <Card variant="outlined" key={`${m.sender}_${m.text}`}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {m.sender}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {m.text}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Grid item xs={9} className={classes.messageBox}>
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
            <Grid item xs={3} className={classes.messageBox}>
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
            {hitchhikers.map((h) => (
              <ListItem button key={h.name}>
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
