import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";
import { ionFireEvent } from "@ionic/react-test-utils/dist/ionFireEvent";

test("Render login form correctly", async () => {
  const { findByTestId } = render(<Login />);
  const usernameInput = await findByTestId("username");
  const passwordInput = await findByTestId("password");
  const submitButton = await findByTestId("submit");

  ionFireEvent.ionChange(usernameInput, "user");
  ionFireEvent.ionChange(passwordInput, "123");

  expect(usernameInput).toHaveAttribute("value", "user");
  expect(passwordInput).toHaveAttribute("value", "123");
  expect(submitButton).toBeInTheDocument();
});
