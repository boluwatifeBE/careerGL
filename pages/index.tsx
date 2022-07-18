import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import config from 'config';
import Card from '@/components/Card';
import Link from '@/components/Link';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';

const MAX_DISPLAY = 6;

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
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <ScrollTopAndComment hide={false} />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <Banner frontMatter={author} />
        <div className='container py-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {!config.careers.length && 'No careers found.'}
            {config.careers
              .slice(0, MAX_DISPLAY)
              .map(({ slug, title, description, banner }) => (
                <Card
                  key={slug}
                  title={title}
                  description={description}
                  banner={banner}
                  href={`/careers/${slug}`}
                />
              ))}
          </div>

          {config.careers.length > MAX_DISPLAY && (
            <div className='flex justify-end text-base font-medium leading-6'>
              <Link
                href='/careers'
                className='text-[14px] font-medium leading-6 text-appColor-200 hover:text-appColor-50 dark:hover:text-appColor-50'
                aria-label='all careers'
              >
                All Careers &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
