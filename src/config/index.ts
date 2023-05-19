import { contact, Contact } from './contact';
import { Course, courses } from './courses';
import { Career, careers } from './careers/careers';
import { Project, projects } from './projects';
import { SeoHeading, seocontent } from './seo';

interface Config {
  contact: Contact;
  projects: Project[];
  courses: Course[];
  careers: Career[];
  seocontent: SeoHeading[];
}

const config: Config = {
  contact,
  projects,
  courses,
  careers,
  seocontent,
};

export default config;
