import { STATUS_LIST, EVALUATION_SETTINGS } from "../util/constants";
import { Application, ApplicationRequest, Evaluation } from "../util/types";

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
  // Use created status as default
  const body = { ...application, status: STATUS_LIST.created };

  const response = await fetch(`${URL}/applications`, {
    method: "post",
    body: JSON.stringify(body),
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

const deleteApplication = async (id: number): Promise<Application> => {
  const response = await fetch(`${URL}/applications/${id}`, {
    method: "DELETE",
  });

  const json = await response.json();

  return json;
};

const evaluateResumes = async (): Promise<Evaluation[]> => {
  const applications = await fetchApplications();

  const evaluations = applications.map<Evaluation>((application) => ({
    application: application,
    linkedIn: "https://www.linkedin.com/in/ahmed-alsinan/",
    score: Math.floor(Math.random() * EVALUATION_SETTINGS.maxScore) + 1,
  }));

  // Descending order
  const evaluationsSorted = evaluations.sort((a, b) => b.score - a.score);

  return evaluationsSorted;
};

export default {
  submitApplication,
  searchApplication,
  fetchApplication,
  fetchApplications,
  updateApplication,
  evaluateResumes,
  deleteApplication,
};
