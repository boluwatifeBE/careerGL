
import { output } from 'config/careers';

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
    parentId?: string;
    pdfUrl?: string;
};

export type CareerTreeType = {
  name?: string;
  path?: string;
  children?: {
      name?: string;
      path?: string;
      opinion?: string[];
  }[];
  opinion?: string []
};

export function getCareerById(id: string): CareerMapType | undefined {
  return (output as CareerMapType[]).find((careermap) => careermap.id === id);
}

export function getCareerByParentId(parentId: string): CareerMapType | undefined {
  return (output as CareerMapType[]).find((careermap) => careermap.parentId === parentId);
}

export function getAllCareers(): CareerMapType[] {
  return output as CareerMapType[];
}

export function getFeaturedCareers(): CareerMapType[] {
  const careermaps: CareerMapType[] = getAllCareers();

  return careermaps.filter((careermap) => careermap.featured);
}

export function isInteractiveCareer(id: string): boolean {
  return ['frontend', 'backend'].includes(id);
}