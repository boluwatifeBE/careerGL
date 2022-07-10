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
import Image from 'next/image';

type HeadContentProps = {
  contents?: CareerMapType[];
};

const HeaderContent = (props: HeadContentProps) => {
  const { contents } = props;

  return (
    <>
      {contents.map((content: CareerMapType) => (
        <div key={content.title}>
          <PageSEO
            title={content.seo.title}
            description={content.seo.description}
          />
          <Header title={content.title} subtitle={content.description} />
        </div>
      ))}
    </>
  );
};

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
  const careerContents = careermaps.filter(careermap => careermap.id === page);

  return (
    <>
      <div className='fade-in  divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <div className='mb-7 mt-5 flex flex-col items-center sm:flex-row md:justify-between md:space-x-2'>
          <div className='sm:w-[70%]'>
            <HeaderContent contents={careerContents} />
          </div>
          <div className='sm:w-[30%]'>
            <div className='  h-28 w-40 origin-bottom  -rotate-6 border-[2px] border-gray-800 bg-gray-100 p-3  text-xs font-normal text-gray-800 dark:border-gray-50 dark:bg-gray-800 dark:text-gray-200 '>
              <div className=' space-y-1'>
                <div className='flex items-center'>
                  <div className='mr-1 h-3 w-3 rounded-full bg-[#a3875f]'></div>
                  Personal opinion
                </div>
                <div className='flex items-center'>
                  <div className='mr-1 h-3 w-3 rounded-full bg-green-700'></div>
                  Alternative option
                </div>
                <div className='flex items-center'>
                  <div className='mr-1 h-3 w-3 rounded-full bg-red-600'></div>
                  Not recommend
                </div>
                <div className='flex items-center'>
                  <div className='mr-1 h-3 w-3 rounded-full bg-gray-600'></div>
                  Learn anytime
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative '>
          <div
            className=' absolute -z-10 h-full w-full  '
            // style={{
            //   backgroundImage: 'url(/static/images/Lineee.svg)',
            //   backgroundSize: 'cover',
            //   objectFit: 'cover',
            // }}
          >
            <img
              src={'/static/images/Lineee.svg'}
              className='mx-auto h-full object-fill'
            />
          </div>
          <div className='z-50 py-32'>
            <CareerTreeRender careermap={careermap} page={page} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
