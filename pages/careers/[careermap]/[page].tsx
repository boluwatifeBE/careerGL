import fs from 'fs';
import path from 'path';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import { InferGetStaticPropsType } from 'next';
import CareerTree from '@/components/careers/CareerTree';
import { CareerMapType, CareerTreeType, getAllCareers } from 'config/careers/careerType';

type StaticPathItem = {
  params: {
    careermap: string;
    page: string;
  };
};

const careermaps = getAllCareers();

const readCareerContentsFilePath = (careermaps: CareerMapType[], pageId: string): CareerTreeType[] => {
  const careerFilePath = careermaps.find(career => career.id === pageId).contentPathsFilePath;

  if (!careerFilePath) {
    return null;
  }

  // Remove trailing slashes
  const contentsPathsFilePath = careerFilePath.replace(/^\//, '');
  const filePath = path.join(process.cwd(), 'data', contentsPathsFilePath);
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
};

export async function getStaticPaths() {
  const paramsList: StaticPathItem[] = careermaps.flatMap((career) => {
    return {
      params: {
        careermap: career.parentId,
        page: career.id
      },
    };
  });

  return {
    paths: paramsList,
    fallback: false,
  };
}

type ContextType = {
  params: {
    careermap: string;
    page: string;
    data: CareerTreeType[];
  };
};

export async function getStaticProps(context: ContextType) {
  const careermapId: string = context?.params?.careermap;
  const pageId: string = context?.params?.page;
  const objectData = readCareerContentsFilePath(careermaps, pageId);

  return {
    props: {
      careermap: careermapId,
      page: pageId,
      data: objectData,
    },
  };
}

export default function CareerSingle(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  const { careermap, page, data } = props;
  
  return (
    <>
      <PageSEO
        title={page}
        description={page}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={page} subtitle={careermap} />
        <CareerTree data={data} />
      </div>
    </>
  );
}