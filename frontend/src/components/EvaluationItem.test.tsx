import React from "react";
import { render } from "@testing-library/react";
import { mockData } from "../util/testsConfig";
import EvaluationItem from "./EvaluationItem";

test("Render evaluation item correctly", async () => {
  const index = 0;
  const evaluation = mockData.evaluations[0];
  const { getByTestId } = render(
    <EvaluationItem evaluation={evaluation} index={index} />
  );

  const rank = getByTestId("rank");
  const name = getByTestId("name");
  const reusme = getByTestId("resume");
  const trophy = getByTestId("trophy");
  const score = getByTestId("score");

  expect(rank).toHaveTextContent(`${index + 1}`);
  expect(name).toHaveTextContent(evaluation.application.user.name);
  expect(reusme).toHaveAttribute("href", evaluation.application.resume.content);
  expect(trophy).toBeInTheDocument();
  expect(score).toHaveStyle("color:green");
});
