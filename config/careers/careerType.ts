export type CareerMapType = {
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
    title?: string;
    description?: string;
    featuredTitle?: string;
    featuredDescription?: string;
    isTextHeavy?: boolean;
    author?: {
      name?: string;
      url?: string;
    };
    featured?: boolean;
    detailed?: boolean;
    imageUrl?: string;
    jsonUrl?: string;
    landingPath?: string;
    resourcesPath?: string;
    versions?: string[];
    contentPathsFilePath?: string;
    metaPath?: string;
    isCommunity?: boolean;
    isUpcoming?: boolean;
    id?: string;
    pdfUrl?: string;
};