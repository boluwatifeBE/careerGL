
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
    featured?: boolean;
    contentPathsFilePath?: string;
    pdfUrl?: string;
    id?: string;
    parentId?: string;
    isCommunity?: boolean;
    isUpcoming?: boolean;
};

export type CareerTreeType = {
  id?: string;
  name?: string;
  path?: string;
  parentId?: string;
  grandParentId?: string;
  children?: {
      id?: string;
      name?: string;
      path?: string;
      parentId?: string;
      grandParentId?: string;
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