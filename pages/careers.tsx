import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import config from 'config';
import { ComponentProps } from 'react';
import CareerGridLayout from '@/layouts/CareerGridLayout';

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  author: AuthorFrontMatter;
  careers: ComponentProps<typeof CareerGridLayout>['careers'];
  initialDisplayCareers: ComponentProps<
    typeof CareerGridLayout
  >['initialDisplayCareers'];
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', [
    'default',
  ]);
  const careers = await config.careers;

  const { frontMatter: author } = authorDetails;

  return { props: { author, careers } };
};

export default function Home({
  careers,
  initialDisplayCareers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Careers - ${siteMetadata.author}`}
        description={
          'Step by step guides and paths to learn different tools or technologies'
        }
      />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <CareerGridLayout
          careers={careers}
          title={'Career'}
          initialDisplayCareers={initialDisplayCareers}
        />
      </div>
    </>
  );
}
