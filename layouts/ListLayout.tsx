import { Header } from '@/components/Form';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import SearchInput from '@/components/SearchInput';
import Tag from '@/components/Tag';
import formatDate from '@/lib/utils/formatDate';
import { ComponentProps, useState } from 'react';
import { PostFrontMatter } from 'types/PostFrontMatter';
import BlogSingleCard from '@/components/BlogSingleCard';

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
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter(frontMatter => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
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
      <div className='fade-in divide-y-2 divide-slate-200 dark:divide-slate-800'>
        <Header title={title}>
          <SearchInput
            onChange={handleOnChange}
            placeholder={'Search Career'}
            filterIcon={true}
          />
        </Header>
        <div>
          {displayPosts.map(frontMatter => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <BlogSingleCard
                key={slug}
                title={title}
                summary={summary}
                banner={undefined}
                href={`/projects/${slug}`}
                tags={tags}
                authorPicture={'/static/blogs/careerGL-post.png'}
                authorName={'CareerGL official'}
                date={formatDate(date)}
              />
            );
          })}
        </div>

        <ul>
          {!filteredBlogPosts.length && (
            <p className='mt-8 text-center'>No posts found</p>
          )}
          {displayPosts.map(frontMatter => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className='py-4'>
                <article className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-slate-500 dark:text-slate-400'>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className='space-y-3 xl:col-span-3'>
                    <div>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-slate-900 dark:text-slate-100'
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className='flex flex-wrap'>
                        {tags.map(tag => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className='prose max-w-none text-slate-500 dark:text-slate-400'>
                      {summary}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          type={'blog'}
        />
      )}
    </>
  );
}
