import Comments from '@/components/comments';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import Share from '@/components/Share';
import Tag from '@/components/Tag';
import TOCInline from '@/components/TOCInline';
import siteMetadata from '@/data/siteMetadata';
import Image from 'next/image';
import { ReactNode } from 'react';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import { PostFrontMatter } from 'types/PostFrontMatter';
import { Toc } from 'types/Toc';
import { OnScrollProgressbar } from '@/components/OnScrollProgressbar';

const editUrl = fileName =>
  `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
const discussUrl = slug =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`,
  )}`;

const postDateTemplate: Intl.DateTimeFormatOptions = {
  // weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface Props {
  frontMatter: PostFrontMatter;
  authorDetails: AuthorFrontMatter[];
  next?: { slug: string; title: string };
  prev?: { slug: string; title: string };
  toc?: Toc;
  children: ReactNode;
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  toc,
  children,
}: Props) {
  const { slug, fileName, date, title, tags, readingTime, images } =
    frontMatter;

  const banner = images?.[0];

  const url = `${siteMetadata.siteUrl}/blog/${slug}`;

  return (
    <>
      <SectionContainer>
        <BlogSEO url={url} authorDetails={authorDetails} {...frontMatter} />
        <OnScrollProgressbar />
        <ScrollTopAndComment />
        <article className='fade-in'>
          <div className=' xl:divide-y xl:divide-gray-100 xl:dark:divide-gray-800'>
            <header className=' pt-20 pb-10'>
              <div className='space-y-3 '>
                <div className='flex flex-wrap items-center justify-between space-x-2 space-y-3 sm:space-x-5 sm:space-y-0 '>
                  <div className='flex flex-wrap'>
                    {tags.map(tag => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <div className='flex items-center justify-center space-x-2'>
                    <dt className='sr-only'>Published on</dt>
                    <div className='text-sm font-normal text-gray-500 dark:text-gray-400 '>
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(
                          siteMetadata.locale,
                          postDateTemplate,
                        )}
                      </time>
                    </div>
                    <div className='text-base font-light text-gray-500 dark:text-gray-400'>
                      •
                    </div>
                    <p className=' text-sm font-normal leading-6 text-gray-500 dark:text-gray-400'>
                      {readingTime?.text}
                    </p>
                  </div>
                </div>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>

                <div className=''>
                  <Share title={title} url={url} />
                </div>
              </div>
            </header>
            <div className='divide-y divide-gray-100 pb-8 dark:divide-gray-800 '>
              <div className='divide-y-2 divide-gray-100 dark:divide-gray-800 xl:col-span-3 xl:row-span-2 xl:pb-0'>
                {banner && (
                  <img
                    src={banner}
                    className='rounded-lg object-cover object-center'
                    alt='banner'
                  />
                )}
                <div className='flex flex-col'>
                  {/* <div className='xl:grid xl:grid-cols-4 xl:gap-x-6'> */}
                  <div className='prose max-w-none !border-t-0 pt-6 pb-8 dark:prose-dark xl:col-span-3'>
                    <div className=''>
                      <TOCInline toc={toc} asDisclosure />
                    </div>
                    {children}
                  </div>
                  {/* <div className='sticky top-4 hidden  xl:top-8 xl:block '>
                    <TOCInline toc={toc} asDisclosure />
                  </div> */}
                  {/* </div> */}
                  <div className=' pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300'>
                    <div className=''>
                      <dt className='sr-only'>Authors</dt>
                      <dd>
                        <ul>
                          {authorDetails.map(author => (
                            <li
                              className='flex items-start space-x-3'
                              key={author.name}
                            >
                              <div>
                                {author.avatar && (
                                  <Image
                                    src={author.avatar}
                                    width='50px'
                                    height='50px'
                                    alt='avatar'
                                    className='h-10 w-[20%] rounded-full'
                                  />
                                )}
                              </div>
                              <dl className='w-[90%] whitespace-normal text-sm font-medium leading-5'>
                                <div>
                                  <dt className='sr-only'>Name</dt>
                                  <dd className='text-xl font-semibold'>
                                    {author.twitter && (
                                      <Link
                                        href={author.twitter}
                                        className='text-gray-700 hover:underline dark:text-gray-300 '
                                      >
                                        {author.name}
                                      </Link>
                                    )}
                                  </dd>
                                </div>
                                <div>
                                  <dt className='sr-only'>Description</dt>
                                  <p className='break-words'>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Earum sed enim, magnam
                                    incidunt voluptate voluptatum impedit animi.
                                    Nostrum ducimus, sapiente ipsum natus
                                    possimus vel, repudiandae eius ea
                                    consequatur, culpa voluptatem.
                                  </p>
                                  {/* <p className=''>{author.bio}</p> */}
                                </div>
                              </dl>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className='mt-6 text-right'>
                      <Link href={discussUrl(slug)} rel='nofollow'>
                        {'Discuss on Twitter'}
                      </Link>
                      {` • `}
                      <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
                    </div>
                  </div>

                  <Comments frontMatter={frontMatter} />
                </div>
              </div>

              <footer>
                <div className=' divide-gray-100  text-sm font-medium leading-5 dark:divide-gray-800  '>
                  {(next || prev) && (
                    <div className='flex items-center justify-between py-4  xl:py-8'>
                      <div>
                        {prev && (
                          <div>
                            <div className='text-appColor-200 hover:text-appColor-50 dark:hover:text-appColor-50'>
                              <Link href={`/blog/${prev.slug}`}>
                                ← {prev.title}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {next && (
                          <div>
                            <div className='text-appColor-200 hover:text-appColor-50 dark:hover:text-appColor-50'>
                              <Link href={`/blog/${next.slug}`}>
                                {next.title} →
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* <div className='pt-4 xl:pt-8'>
                <Link
                  href='/blog'
                  className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                >
                  &larr; Back to the blog
                </Link>
              </div> */}
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  );
}
