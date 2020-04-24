import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Message } from "./types";

interface Props {
  list: Message[];
}

const ChatHistory: React.FC<Props> = ({ list }: Props) => {
  return (
    <React.Fragment>
      {list.map((m) => (
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
    </React.Fragment>
  );
};

export default ChatHistory;
