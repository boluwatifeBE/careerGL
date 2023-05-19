import { Header } from "@/components/Form";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { ComponentProps, useState } from "react";
import { PostFrontMatter } from "types/PostFrontMatter";
import BlogGrid from "@/components/blogs/BlogGrid";
import { BlogGridWrapper } from "@/components/blogs/BlogGridWrapper";

interface Props {
  posts: PostFrontMatter[];
  title: string;
  initialDisplayPosts?: PostFrontMatter[];
  pagination?: ComponentProps<typeof Pagination>;
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: Props) {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(" ");
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredBlogPosts;

  const handleOnChange = ({ target }) => setSearchValue(target.value);

  return (
    <>
      <div className="fade-in divide-y-2 divide-slate-200 dark:divide-slate-800">
        <Header title={title}>
          <SearchInput
            onChange={handleOnChange}
            placeholder={"Search Career"}
            filterIcon={true}
          />
        </Header>
        <div>
          {!filteredBlogPosts.length && (
            <p className="mt-8 text-center">No posts found</p>
          )}
          <BlogGridWrapper>
            <BlogGrid posts={displayPosts} />
          </BlogGridWrapper>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          type={"blog"}
        />
      )}
    </>
  );
}
