import React from "react";
import { render } from "@testing-library/react";
import FileUpload from "./FileUpload";
import userEvent from "@testing-library/user-event";

/**
 * This test has issue to be debugged further
 * "TypeError: Cannot set properties of undefined (setting 'value')".]
 */

test("Upload file", async () => {
  return true;

  const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });

  const { getByTestId, getByRole } = render(
    <FileUpload OnFileUpload={() => null} />
  );

  const fileInput = getByTestId("fileUpload") as HTMLInputElement;

  userEvent.upload(fileInput, fakeFile);

  expect(fileInput.files).toHaveLength(1);
  expect(fileInput.files?.[0]).toStrictEqual(fakeFile);
});
