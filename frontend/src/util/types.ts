export type User = {
  id: number;
  name: string;
  username: string;
  password?: string;
  isAdmin?: boolean;
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

export type Base64File = {
  name: string;
  type: string;
  content: any;
};

export type ApplicationRequest = {
  userId: number;
  careerId: number;
  resume: Base64File;
  files: Base64File[];
  skills: string[];
  status?: string;
};

export type Application = ApplicationRequest & {
  id: number;
  status: string;
  // Populated relations from backend
  user: User;
  career: Career;
};

export type Evaluation = {
  application: Application;
  linkedIn: string;
  score: number;
};
