import config from 'config';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import { InferGetStaticPropsType } from 'next';
import Career from '@/components/careers/CareerPage';
import { getAllCareers } from 'config/careers/careerType';

type StaticPathItem = {
  params: {
    slug: string[];
  };
};

export async function getStaticPaths() {
  const careers = getAllCareers();
  const paramsList: StaticPathItem[] = careers.flatMap((career) => {
    return {
      params: {
        slug: [career.parentId]
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
    slug: string;
  };
};

export async function getStaticProps(context: ContextType) {
  const slug: string = context?.params.slug.toString();
  const career = config.careers.find(career => career.slug === slug);

  return {
    props: { careerObject: career, slug },
  };
}

export default function CareerSlug(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  
  const { careerObject, slug } = props;
  const { title, description } = careerObject;
  const careerContents = getAllCareers().filter((careermap) => careermap.parentId === slug);

  return (
    <>
      <PageSEO
        title={title}
        description={description}
        imageUrl={`/static/careers/banner.png`}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title} subtitle={description} />
        <Career slug={slug} careermaps={careerContents} />
      </div>
    </>
  );
}