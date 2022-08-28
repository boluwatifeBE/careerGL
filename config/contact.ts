import siteMetadata from '@/data/siteMetadata';

export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  youtube = 'youtube',
  email = 'email',
  // buymeacoffee = 'buymeacoffee',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: siteMetadata.url.twitterUsername,
  site: siteMetadata.url.webDomain,
  calendly: siteMetadata.url.calendly,
  links: {
    github: siteMetadata.url.repo,
    linkedin: siteMetadata.url.linkedin,
    twitter: siteMetadata.url.twitter,
    youtube: siteMetadata.url.youtube,
    email: `mailto:contact${siteMetadata.url.webDomain}`,
    // buymeacoffee: 'https://www.buymeacoffee.com/karanps'
  },
};
