import { GlobalPageSEO } from '@/components/SEO';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { BannerSection } from '@/components/homepage-section/BannerSection';
import FeaturedBlogAndAdsSection from '@/components/homepage-section/FeaturedBlogAndAdsSection';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ComponentProps } from 'react';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import BlogGrid from '@/components/blogs/BlogGrid';
import { BlogGridWrapper } from '@/components/blogs/BlogGridWrapper';

const SLUG = 'home';

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof BlogGrid>['posts'];
}> = async () => {
  const posts = await getAllFilesFrontMatter('blog');
  return { props: { posts } };
};

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <GlobalPageSEO slug={SLUG} />
      <ScrollTopAndComment hide={false} />
      <section className='divide-y-2 divide-slate-200 dark:divide-slate-800'>
        {/* Hero Banner */}
        <BannerSection />

        {/* Feaured blog */}
        <FeaturedBlogAndAdsSection posts={posts} />

        {/* All blogs */}
        <section className="mt-20 pt-20">
          <BlogGridWrapper title={"Latest Articles"}>
            <BlogGrid posts={posts} maxDisplay={3} />
          </BlogGridWrapper>
        </section>
      </section>
    </>
  );
}
