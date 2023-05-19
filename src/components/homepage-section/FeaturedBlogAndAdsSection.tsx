// import Link from '@/components/Link';
// import Tag from '@/components/Tag';
// import formatDate from '@/lib/utils/formatDate';
// import Image from 'next/image';
import FeatureBlogCard from './FeatureBlogCard';
import { PostFrontMatter } from '@/types/PostFrontMatter';
import { MaxDisplay } from '@/types/enums';

interface Props {
  posts: PostFrontMatter[];
}

export default function FeaturedBlogAndAdsSection({ posts }: Props) {
  return (
    <section className='mt-20 flex w-full flex-col px-3 pt-20 lg:flex-row lg:space-x-0'>
      {/* <FeatureBlogCard title={''} href={''} slug={''} /> */}
      {posts
        .slice(0, MaxDisplay.FEATURED_POST)
        .map(({ title, summary, slug, tags, images, date }) => (
          <>
            <FeatureBlogCard
              key={slug}
              banner={images}
              title={title}
              tags={tags}
              summary={summary}
              href={`/projects/${slug}`}
              slug={slug}
              date={date}
            />
          </>
        ))}

      <div className='bg-useGL-secondary lg:ml-5 lg:w-4/12'></div>
    </section>
  );
}
