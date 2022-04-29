import React from "react";
import { render } from "@testing-library/react";
import { mockData } from "../util/testsConfig";
import CareerItemContent from "./CareerItemContent";

test("Render evaluation item correctly", async () => {
  const career = mockData.careers[0];

  const { getByTestId } = render(<CareerItemContent career={career} />);

  const title = getByTestId("title");
  const city = getByTestId("city");
  const subTitle = getByTestId("subTitle");

  expect(title).toHaveTextContent(career.title);
  expect(city).toHaveTextContent(career.city);
  expect(subTitle).toHaveTextContent(career.subTitle);
});
