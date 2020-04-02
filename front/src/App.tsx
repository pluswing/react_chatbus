import React, { useState } from "react";
import { Container, CssBaseline } from "@material-ui/core";

interface Props {}

const App: React.FC<Props> = props => {
  const [count, setCount] = useState<number>(0);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      hello!
    </Container>
  );
};

export default App;
