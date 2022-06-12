import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import config from 'config';
import Card from '@/components/Card';

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  author: AuthorFrontMatter;
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', [
    'default',
  ]);

  const { frontMatter: author } = authorDetails;

  return { props: { author } };
};

const Banner = dynamic(import('@/components/Banner'));

export default function Home({
  author,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={`Careers - ${siteMetadata.author}`}
        description={'Step by step guides and paths to learn different tools or technologies'}
      />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        {/* <Banner frontMatter={author} /> */}
        <div className='container py-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {config.careers.map(({ slug, title, description, banner }) => (
              <Card
                key={slug}
                title={title}
                description={description}
                banner={banner}
                href={`/careers/${slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
