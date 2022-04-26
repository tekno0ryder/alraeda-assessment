export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
};

export type Career = {
  id: number;
  title: string;
  subTitle: string;
  body: string;
  skills: string[];
  city: string;
};

export type CareersFiltersType = {
  title?: string;
  city?: string;
};
