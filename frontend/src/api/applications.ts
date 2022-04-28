import { Application, Base64File } from "../util/types";

const URL = process.env.REACT_APP_API_URL;

const fetchApplication = async (
  userId: number | string,
  careerId: number | string
) => {
  const searchParams = new URLSearchParams({
    userId: userId.toString(),
    careerId: careerId.toString(),
  });

  const response = await fetch(`${URL}/applications?${searchParams}`);

  const json = await response.json();

  return json[0];
};

const fetchApplications = async () => {
  const searchParams = new URLSearchParams();
  searchParams.append("_expand", "user");
  searchParams.append("_expand", "career");

  const response = await fetch(`${URL}/applications?${searchParams}`);

  const json = await response.json();

  return json;
};

const submitApplication = async (application: Application) => {
  const response = await fetch(`${URL}/applications`, {
    method: "post",
    body: JSON.stringify(application),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();

  return json;
};

export default { submitApplication, fetchApplication, fetchApplications };
