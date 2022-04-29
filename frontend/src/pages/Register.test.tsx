import React from "react";
import { render } from "@testing-library/react";
import { ionFireEvent } from "@ionic/react-test-utils/dist/ionFireEvent";
import Register from "./Register";

test("Render register form correctly", async () => {
  const { findByTestId } = render(<Register />);
  const nameInput = await findByTestId("name");
  const usernameInput = await findByTestId("username");
  const passwordInput = await findByTestId("password");
  const submitButton = await findByTestId("submit");

  ionFireEvent.ionChange(nameInput, "The rock");
  ionFireEvent.ionChange(usernameInput, "user");
  ionFireEvent.ionChange(passwordInput, "123");

  expect(nameInput).toHaveAttribute("value", "The rock");
  expect(usernameInput).toHaveAttribute("value", "user");
  expect(passwordInput).toHaveAttribute("value", "123");
  expect(submitButton).toBeInTheDocument();
});
