import { contact, Contact } from './contact';
import { Course, courses } from './courses';
import { Career, careers } from './careers';
import { Project, projects } from './projects';

interface Config {
  contact: Contact;
  projects: Project[];
  courses: Course[];
  careers: Career[];
}

const config: Config = {
  contact,
  projects,
  courses,
  careers,
};

export const POSTS_PER_PAGE = 8;

export default config;
