export type AuthorFrontMatter = {
  layout?: string;
  name: string;
  bio?: string;
  shortname: string;
  avatar?: string;
  occupation: string;
  company: string;
  resume?: string;
  url?: {
    email?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  }
};
