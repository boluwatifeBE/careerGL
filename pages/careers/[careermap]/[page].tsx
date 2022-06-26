import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import { InferGetStaticPropsType } from 'next';
import {
  CareerMapType,
  CareerTreeType,
  getAllCareers,
} from 'config/careers/careerType';
import { readCareerContentsFilePath } from '@/lib/mdx';
import { CareerTreeRender } from '@/components/careers/CareerTreeRender';

type HeadContentProps = {
  contents?: CareerMapType[];
};

const HeaderContent = (props: HeadContentProps) => {
  const { contents } = props;

  return (
    <>
      {
        contents.map((content: CareerMapType) => (
          <div key={content.title}>
            <PageSEO title={content.seo.title} description={content.seo.description} />
            <Header title={content.title} subtitle={content.description} />
          </div>
        ))
      }
    </>
  );
}

const careermaps = getAllCareers();

type StaticPathItem = {
  params: {
    careermap: string;
    page: string;
  };
};

export async function getStaticPaths() {
  const paramsList: StaticPathItem[] = careermaps.flatMap(career => {
    return {
      params: {
        careermap: career.parentId,
        page: career.id,
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
  const careerContents = careermaps.filter((careermap) => careermap.id === page);

  return (
    <>
      <div className='fade-in  divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <div className='flex justify-between mb-7 mt-5'>
          <HeaderContent contents={careerContents} />
          <div className=' my-3 origin-bottom -rotate-6 rounded-2xl border-[4px] p-10 '>
            <ul>
              <li>Personal Recommendation / Opinion</li>
              <li>I wouldn't recommend</li>
              <li>Order in roadmap not strict (Learn anytime)</li>
              <li>Alternative Option - Pick this or purple</li>
            </ul>
          </div>
        </div>
        <div className='pt-16'>
          <CareerTreeRender careermap={careermap} page={page} data={data} />
        </div>
      </div>
    </>
  );
}
