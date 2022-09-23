import BlogGridCard from "@/components/blogs/BlogGridCard";
import { PostFrontMatter } from "types/PostFrontMatter";

const MAX_DISPLAY = 3;

interface Props {
  posts: PostFrontMatter[];
}

export default function BlogGrid({ posts }: Props) {
  return (
    <>
      {!posts.length && <p className="mt-8 text-center">No posts found</p>}

      {posts
        .slice(0, MAX_DISPLAY)
        .map(({ title, summary, slug, tags, images, date, authors }) => (
          <>
            <BlogGridCard
              key={slug}
              banner={images}
              title={title}
              tags={tags}
              summary={summary}
              href={`/projects/${slug}`}
              slug={slug}
              authors={authors}
              date={date}
            />
          </>
        ))}
    </>
  );
}
