import BlogGridCard from '@/components/blogs/BlogGridCard';
import { PostFrontMatter } from '@/types/PostFrontMatter';
import { MaxDisplay } from '@/types/enums';

interface Props {
  posts: PostFrontMatter[];
  maxDisplay?: number;
}

export default function BlogGrid({ posts, maxDisplay }: Props) {
  const maximumDisplay: number = !maxDisplay ? maxDisplay : MaxDisplay.POSTS_PER_PAGE;
  return (
    <>
      {!posts.length && <p className='mt-8 text-center'>No posts found</p>}

      {posts
        .slice(0, maximumDisplay)
        .map(({ title, summary, slug, tags, images, date }) => (
          <>
            <BlogGridCard
              key={slug}
              banner={images}
              title={title}
              tags={tags}
              summary={summary}
              hrefSlug={`/blog/${slug}`}
              date={date}
            />
          </>
        ))}
    </>
  );
}
