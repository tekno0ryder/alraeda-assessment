import React from "react";
import { render } from "@testing-library/react";
import { mockData } from "../util/testsConfig";
import FileItem from "./FileItem";

test("Render File item correctly", async () => {
  const file = mockData.applications[0].resume;
  const { getByTestId, getByRole } = render(
    <FileItem file={file} onFileDelete={() => null} />
  );

  const link = getByRole("link");

  expect(link).toHaveTextContent(file.name);
  expect(link).toHaveAttribute("download", file.name);
  expect(link).toHaveAttribute("href", file.content);

  const remove = getByTestId("remove");
  expect(remove).toBeInTheDocument();
});
