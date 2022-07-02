import { MDXLayoutRenderer } from '@/components/MDXComponents';
import generateRss from '@/lib/generate-rss';
import {
  formatSlug,
  getFileBySlug,
  getContentPathString,
  getAllFilesFrontMatter,
  readCareerContentsFilePath,
  getFiles,
} from '@/lib/mdx';
import fs from 'fs';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllCareers } from 'config/careers/careerType';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { CareerFrontMatter } from 'types/CareerFrontMatter';
import { Toc } from 'types/Toc';
import { 
  removeNull, 
  recursiveSearch, 
  getUniqueStringValueOfArray, 
} from '@/components/careers/RenderFunctions';

const DEFAULT_LAYOUT = 'CareerLayout';
const careermaps = getAllCareers();

type StaticPathItem = {
  params: {
    careermap: string;
    page: string;
    slug: string[];
  };
};

export async function getStaticPaths() {
  const paramsList: StaticPathItem[] = careermaps.flatMap(career => {
    const objectData = readCareerContentsFilePath(careermaps, career.id);
    const cleanObject = removeNull(objectData);
    const nameArray: string[] = recursiveSearch(cleanObject, 'path');
    const uniqueArray = getUniqueStringValueOfArray(nameArray);
    const careerContentFiles = getContentPathString(uniqueArray);
    const careerSlug = getFiles(careerContentFiles);

    return (
      careerSlug.map(slug => ({
        params: {
          careermap: career.parentId,
          page: career.id,
          slug: formatSlug(slug).split('/')
        },
      }))
    );
  });

  return {
    paths: paramsList,
    fallback: false,
  };
}

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  career: { mdxSource: string; toc: Toc; frontMatter: CareerFrontMatter };
  authorDetails: AuthorFrontMatter[];
}> = async ({ params }) => {
  const careermapId: string = (params?.careermap as string);
  const pageId: string = (params?.page  as string);
  const slug = (params?.slug as string[]).join('/');
  const fullPath = `careers/${careermapId}/${pageId}/content`;
  const allCareers = await getAllFilesFrontMatter(fullPath);
  const career = await getFileBySlug<CareerFrontMatter>(fullPath, slug);

  // @ts-ignore
  const authorList = career.frontMatter.authors || ['default'];
  const authorPromise = authorList.map(async author => {
    const authorResults = await getFileBySlug<AuthorFrontMatter>('authors', [
      author,
    ]);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  // rss
  if (allCareers.length > 0) {
    const rss = generateRss(allCareers);
    fs.writeFileSync('./public/feed.xml', rss);
  }

  return {
    props: {
      career,
      authorDetails,
    },
  };
}


export default function CareerContentPage({
  career,
  authorDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = career;

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        toc={toc}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        authorDetails={authorDetails}
      />
    </>
  );
}