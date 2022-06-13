import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
// import { getAllFilesFrontMatter } from '@/lib/mdx';
import config, { POSTS_PER_PAGE } from 'config';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
// import { PostFrontMatter } from 'types/PostFrontMatter';
import CareerLayout from '@/layouts/CareerLayout';
import { ComponentProps, useState } from 'react';

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const totalPosts = await config.careers;

  console.log(totalPosts);

  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof CareerLayout>['posts'];
  initialDisplayPosts: ComponentProps<
    typeof CareerLayout
  >['initialDisplayPosts'];
  pagination: { currentPage: number; totalPages: number };
}> = async context => {
  const {
    params: { page },
  } = context;
  const posts = await config.careers;
  const pageNumber = parseInt(page as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  };
};

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <CareerLayout
        posts={posts}
        title={'All Career'}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  );
}
