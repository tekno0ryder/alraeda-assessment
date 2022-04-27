import { Career, CareersFiltersType } from "../util/types";

export const URL = process.env.REACT_APP_API_URL;

export const fetchCareerList = async (
  search?: CareersFiltersType
): Promise<Career[]> => {
  const searchParams = new URLSearchParams();
  if (search?.title) {
    searchParams.append("title_like", search.title);
  }
  if (search?.city) {
    searchParams.append("city", search.city);
  }

  const response = await fetch(`${URL}/careers?${searchParams}`);
  const json = await response.json();

  return json;
};

export const fetchCareerById = async (id: string): Promise<Career> => {
  const searchParams = new URLSearchParams({ id });

  const response = await fetch(`${URL}/careers?${searchParams}`);
  const json = await response.json();

  return json[0];
};

export default { fetchCareerList, fetchCareerById };
