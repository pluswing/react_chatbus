import React, { useState, useCallback } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageBox: {
    marginTop: "20px",
  },
}));

interface Props {
  onSend: (input: string) => void;
}

const Input: React.FC<Props> = ({ onSend }: Props) => {
  const classes = useStyles();

  const [input, setInput] = useState<string>("");

  const onChange = useCallback((event: any) => {
    setInput(event.target.value);
  }, []);

  const onSendWapper = useCallback(() => {
    onSend(input);
    setInput("");
  }, [input, onSend]);

  return (
    <React.Fragment>
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
        <Button variant="contained" color="primary" onClick={onSendWapper}>
          SEND
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Input;
