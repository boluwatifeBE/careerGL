export type SeoHeadingContent = {
  title: string;
  slug?: string;
  description?: string;
};

export interface SeoHeading {
  title: string;
  slug: string;
  banner: string;
  description: string;
  content?: SeoHeadingContent[];
}

export const seocontent: SeoHeading[] = [
  {
    title: "Home",
    slug: "home",
    banner: "",
    description: 'Career GuideLine is a hub of curated career roadmaps, guides, advices to help you choose a career path, and grow in your career',
    content: [],
  },
  {
    title: "Career Paths",
    slug: "careers",
    banner: "/static/tags/banner.png",
    description: `Life's too short to hate your career. But how do you know exactly which career you'll really love? 
      We've got advice on finding your passion, exploring different potential paths, and 
      choosing one that's the right fit for you.`,
  },
  {
    title: "All Topics",
    slug: "topics",
    banner: "",
    description:
      "Expand your knowledge. Whether you’re a beginner looking to define an industry term or an expert seeking strategic advice, there’s an article for everyone.",
    content: [
      {
        title: "Advice",
        slug: "advice",
        description: "Internet",
      },
    ],
  },
  {
    title: "Articles",
    slug: "blog",
    banner: "",
    description:
      "Your time is valuable. Cut through the noise and dive deep on a specific topic with one of our curated content hubs.",
    content: [],
  },
];
