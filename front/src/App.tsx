import React, { useState, useEffect, useCallback } from "react";
import { Container, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import ChatBus, { SubscribeType } from "./api";
import { Bus, Hitchhiker, Message, MessageDict } from "./types";
import Hitchhikers from "./Hitchhikers";
import ChatBusView from "./ChatBus";
import ChatHistory from "./ChatHistory";
import InputView from "./Input";

interface Props {}

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.grey[500],
  },
}));

const api = new ChatBus("ws://localhost:9090/ws");

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

  const onSend = useCallback((input: string) => {
    if (api.isEmptyName()) {
      setUserName();
      return;
    }
    api.chat(input);
  }, []);

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

  const moveBus = useCallback((busName: string) => {
    api.busSubscribed(busName);
  }, []);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.list}>
          <ChatBusView list={chatBus} add={addChatBus} move={moveBus} />
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <ChatHistory list={messages[currentBusName] || []} />
            </Grid>
            <InputView onSend={onSend} />
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.list}>
          <Hitchhikers list={hitchhikers} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
