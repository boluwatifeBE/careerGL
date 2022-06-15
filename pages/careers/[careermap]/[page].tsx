import Draft from '@/components/Draft';
import { Header } from '@/components/Form';
import { MDXLayoutRenderer } from '@/components/MDXComponents';
import { PageSEO } from '@/components/SEO';
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from '@/lib/mdx';
import { CareerMapType, getAllCareers } from 'config/careers/careerType';
import { InferGetStaticPropsType } from 'next';

type StaticPathItem = {
  params: {
    careermap: string;
    page: string;
  };
};

export async function getStaticPaths() {
  const careermaps = getAllCareers();
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
  };
};

export async function getStaticProps(context: ContextType) {
  const careermapId: string = context?.params?.careermap;
  const pageId: string = context?.params?.page;

  return {
    props: {
      careermap: careermapId,
      page: pageId,
    },
  };
}

export default function CareerSingle(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  const { careermap, page } = props;

  return (
    <>
      <PageSEO
        title={page}
        description={page}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={page} subtitle={careermap} />
      </div>
    </>
  );
}