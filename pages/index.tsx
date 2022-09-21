import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';

import { BannerSection } from '@/components/homepage-section/BannerSection';
import { FeaturedBlogAndAdsSection } from '@/components/homepage-section/FeaturedBlogAndAdsSection';

import config from 'config';
import BlogSingleCard from '@/components/BlogSingleCard';

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <ScrollTopAndComment hide={false} />
      <section className='divide-y-2 divide-slate-200 dark:divide-slate-800'>
        {/* Hero Banner */}
        <BannerSection />

        {/* Feaured blog */}
        <FeaturedBlogAndAdsSection />

        {/* All blogs */}
        <section className='mt-20 pt-20'>
          <h3 className='ml-3 py-16 text-5xl font-bold'>Latest Articles</h3>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {config.projects.map(({ slug, title, description, banner }) => (
              <BlogSingleCard
                key={slug}
                title={title}
                summary={description}
                banner={banner}
                href={`/projects/${slug}`}
                tags={'Marketing'}
                authorPicture={'/static/blogs/careerGL-post.png'}
                authorName={'CareerGL official'}
                date={'15 hours ago'}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
