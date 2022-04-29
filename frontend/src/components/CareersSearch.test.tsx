import React from "react";
import { render } from "@testing-library/react";
import CareersSearch from "./CareersSearch";
import { ionFireEvent } from "@ionic/react-test-utils/dist/ionFireEvent";

test("Render Career search correctly", async () => {
  const { getByTestId } = render(
    <CareersSearch onFiltersChange={() => Promise.resolve()} />
  );

  const searchBarInput = getByTestId("searchBar");

  ionFireEvent.ionChange(searchBarInput, "product designer");
  expect(searchBarInput).toHaveAttribute("value", "product designer");

  const filterCityButton = getByTestId("filterCity");
  expect(filterCityButton).toBeInTheDocument();
});
