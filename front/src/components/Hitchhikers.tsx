import React from "react";
import { List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";
import { Send as SendIcon } from "@material-ui/icons";
import { Hitchhiker } from "../types";

interface Props {
  list: Hitchhiker[];
}

const Hitchhikers: React.FC<Props> = ({ list }: Props) => {
  return (
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
      {list.map((h) => (
        <ListItem button key={h.name}>
          <ListItemText primary={h.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Hitchhikers;
