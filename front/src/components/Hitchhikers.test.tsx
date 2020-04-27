import React from "react";
import { render } from "@testing-library/react";
import Hitchhikers from "./Hitchhikers";

test("basic", () => {
  const { getByText } = render(<Hitchhikers list={[{ name: "aaaa" }]} />);
  const linkElement = getByText(/aaaa/i);
  expect(linkElement).toBeInTheDocument();
});
