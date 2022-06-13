import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getFileBySlug } from '@/lib/mdx';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import config, { POSTS_PER_PAGE } from 'config';
import Card from '@/components/Card';
import CareerLayout from '@/layouts/CareerLayout';
import { ComponentProps, useState } from 'react';

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  author: AuthorFrontMatter;
  posts: ComponentProps<typeof CareerLayout>['posts'];
  initialDisplayPosts: ComponentProps<
    typeof CareerLayout
  >['initialDisplayPosts'];
  // pagination: ComponentProps<typeof CareerLayout>['pagination'];
}> = async () => {
  const authorDetails = await getFileBySlug<AuthorFrontMatter>('authors', [
    'default',
  ]);
  const posts = await config.careers;

  const { frontMatter: author } = authorDetails;

  return { props: { author, posts } };
};

const Banner = dynamic(import('@/components/Banner'));

export default function Home({
  posts,
  initialDisplayPosts,
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
        <CareerLayout
          posts={posts}
          title={'Career'}
          initialDisplayPosts={initialDisplayPosts}
        />
        {/* <Banner frontMatter={author} /> */}
      </div>
    </>
  );
}
