import { Application, ApplicationRequest } from "../util/types";

const URL = process.env.REACT_APP_API_URL;

const fetchApplication = async (id: number | string): Promise<Application> => {
  const searchParams = new URLSearchParams();
  searchParams.append("_expand", "user");
  searchParams.append("_expand", "career");

  const response = await fetch(`${URL}/applications/${id}?${searchParams}`);

  const json = await response.json();

  return json;
};

const fetchApplications = async (): Promise<Application[]> => {
  const searchParams = new URLSearchParams();
  searchParams.append("_expand", "user");
  searchParams.append("_expand", "career");

  const response = await fetch(`${URL}/applications?${searchParams}`);

  const json = await response.json();

  return json;
};

const searchApplication = async ({
  userId,
  careerId,
}: {
  userId: number | string;
  careerId: number | string;
}): Promise<Application> => {
  const searchParams = new URLSearchParams({
    userId: userId.toString(),
    careerId: careerId.toString(),
  });

  const response = await fetch(`${URL}/applications?${searchParams}`);

  const json = await response.json();

  return json[0];
};

const submitApplication = async (application: ApplicationRequest) => {
  const response = await fetch(`${URL}/applications`, {
    method: "post",
    body: JSON.stringify(application),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();

  return json;
};

const updateApplication = async (
  id: number,
  newFields: Object
): Promise<Application> => {
  const response = await fetch(`${URL}/applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newFields),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();

  return json;
};

export default {
  submitApplication,
  searchApplication,
  fetchApplication,
  fetchApplications,
  updateApplication,
};
