import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import { InferGetStaticPropsType } from 'next';
import { FaCheckCircle, FaDotCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
  CareerMapType,
  CareerTreeType,
  getAllCareers,
} from '@/config/careers/careerType';
import { readCareerContentsFilePath } from '@/lib/mdx';
import { CareerTreeRender } from '@/components/careers/CareerTreeRender';
import React from 'react';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { OnScrollProgressbar } from '@/components/OnScrollProgressbar';

type ContentProps = {
  contents?: CareerMapType[];
};

const HeaderContent = (props: ContentProps) => {
  const { contents } = props;

  return (
    <>
      {contents.map((content: CareerMapType) => (
        <div key={content.title}>
          <PageSEO
            title={content.seo.title}
            description={content.seo.description}
            keywords={content.seo.keywords}
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
    <div>
      <ScrollTopAndComment hide={false} />
      <div className='fade-in '>
        <div className='mt-5 flex flex-col items-center border-b-2 border-b-gray-200 pb-10  dark:border-b-gray-700 sm:flex-row md:justify-between md:space-x-2'>
          <OnScrollProgressbar />
          <div className='sm:w-[70%]'>
            <HeaderContent contents={careerContents} />
          </div>
          <div className='sm:w-[30%]'>
            <motion.div
              animate={{ rotate: -6 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <div className='  h-28 w-40 origin-bottom -rotate-3  border-[2px] border-gray-800 bg-gray-100 p-3  text-xs font-normal text-gray-800 dark:border-gray-50 dark:bg-gray-800 dark:text-gray-200 '>
                <div className=' space-y-1'>
                  <div className='flex items-center'>
                    <FaCheckCircle color={'darkgoldenrod'} size={13} />
                    <span className='ml-1'>Personal opinion</span>
                  </div>
                  <div className='flex items-center'>
                    <FaCheckCircle color={'rebeccapurple'} size={13} />
                    <span className='ml-1'>Alternative option</span>
                  </div>
                  <div className='flex items-center'>
                    <FaDotCircle color={'lightslategray'} size={13} />
                    <span className='ml-1'>Learn anytime</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='h-3 w-3 rounded-sm border-2 border-dashed  border-gray-400 bg-gray-400/20' />
                    <span className='ml-1'>Not recommend</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className=' mx-auto -mt-4 flex max-w-sm items-center justify-center border-2 border-gray-200 bg-green-200 py-1  text-center  dark:border-gray-700'>
          <span className='ml-1 text-sm font-semibold text-black sm:text-base'>
            Click any nodes to see useful reasources ☝️ 🖱️
          </span>
        </div>

        <div className='relative'>
          <div className='before:border-3 relative  border-b-2 border-b-gray-200 py-32 before:absolute before:left-0 before:right-0  before:top-0 before:bottom-0 before:-z-10 before:m-auto before:w-3 before:bg-gray-400 dark:border-b-gray-700 dark:before:bg-gray-700'>
            <CareerTreeRender careermap={careermap} page={page} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
