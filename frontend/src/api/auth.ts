import { User } from "../util/types";

const URL = process.env.REACT_APP_API_URL;

const login = async (username: string, password: string): Promise<User> => {
  const searchParams = new URLSearchParams({ username, password });

  const response = await fetch(`${URL}/users?${searchParams}`);
  const json = await response.json();

  return json[0];
};

const register = async (
  username: string,
  password: string,
  userInfo: {
    name: string;
  }
): Promise<User> => {
  // #1 Check if user doesn't exists before
  const searchParams = new URLSearchParams({
    username,
  });

  const checkExistsResponse = await fetch(`${URL}/users?${searchParams}`);
  const checkExistsJson = await checkExistsResponse.json();

  if (checkExistsJson[0]) {
    throw Error("Username already exists");
  }

  // #2 Check if user doesn't exists before
  const body = { username, password, ...userInfo, isAdmin: false };

  const regiserResponse = await fetch(`${URL}/users`, {
    method: "post",
    headers: { "content-Type": " application/json" },
    body: JSON.stringify(body),
  });
  const registerJson = await regiserResponse.json();

  return registerJson;
};

export default { login, register };
