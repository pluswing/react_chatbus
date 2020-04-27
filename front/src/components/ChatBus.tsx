import React from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Send as SendIcon, Add as AddIcon } from "@material-ui/icons";
import { Bus } from "../types";

const useStyles = makeStyles((theme) => ({
  unselected: {},
  selected: {
    backgroundColor: theme.palette.grey[200],
  },
}));

interface Props {
  list: Bus[];
  add: () => void;
  move: (name: string) => void;
}

const ChatBus: React.FC<Props> = ({ list, add, move }: Props) => {
  const classes = useStyles();
  return (
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
      {list.map((bus) => (
        <ListItem
          button
          key={bus.name}
          className={bus.selected ? classes.selected : classes.unselected}
          onClick={() => move(bus.name)}
        >
          <ListItemText primary={bus.name} />
        </ListItem>
      ))}
      <ListItem>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="add" onClick={add}>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
};

export default ChatBus;
