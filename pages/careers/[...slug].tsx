import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import Career from '@/components/careers/CareerPage';
import { CareerMapType, getAllCareers, getCareerById, getCareerByParentId } from 'config/careers/careerType';
import { InferGetStaticPropsType } from 'next';
import { careerConfig } from 'config/careers';

// type CareerProps = {
//   careermap: CareerMapType[];
// };

// type StaticPathItem = {
//   params: {
//     slug: string[];
//   };
// };

export async function getStaticPaths() {
  const careers = getAllCareers();
  const paths = careers.map((career) => ({
    params: { slug: [career.parentId] },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

type ContextType = {
  params: {
    slug: string;
  };
};

export async function getStaticProps(context: ContextType) {
  
  const slug1: string = context?.params.slug.toString();
  const career = config.careers.find(career => career.slug === slug1);

  return {
    props: {
      slug: career,
      slug1
    },
  };
}

export default function Careers(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  const { slug, slug1 } = props;
  const { title, description } = slug;
  const careerContents = getAllCareers().filter((careermap) => careermap.parentId === slug1);

  return (
    <>
      <PageSEO
        title={title}
        description={description}
        imageUrl={`/static/careers/${slug1}/banner.png`}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title} subtitle={description} />
        <Career slug={slug1} careermaps={careerContents} />
      </div>
    </>
  );
}