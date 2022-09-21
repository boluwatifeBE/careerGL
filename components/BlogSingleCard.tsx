import Image from 'next/image';
import Link from './Link';

// banner, slug/href, date, title, summary, tags, authorName, authorPicture ;

function BlogSingleCard({
  href,
  banner,
  tags,
  title,
  summary,
  authorPicture,
  authorName,
  date,
}): React.ReactElement {
  const bannerImage = (
    <Image
      alt={title}
      src={banner}
      className='object-cover object-center md:h-36 lg:h-48 '
      width={544}
      height={306}
      style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
    />
  );
  const authorImage = (
    <Image
      alt={title}
      src={authorPicture}
      className='object-cover object-center'
      width={20}
      height={20}
      style={{ borderRadius: '50%' }}
    />
  );

  return (
    <div className='md p-3' style={{ maxWidth: '544px' }}>
      <div
        className={`${
          banner && 'h-full'
        }  overflow-hidden rounded-lg  border-slate-100 border-opacity-60 bg-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 `}
      >
        {banner &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {bannerImage}
            </Link>
          ) : (
            { bannerImage }
          ))}
        <div className='px-4 pt-2 pb-4'>
          <p className='mb-3 cursor-pointer text-[0.58rem] font-semibold uppercase tracking-widest text-useGL-main md:text-[0.80rem]'>
            <Link href={`/tags/${tags}`} aria-label={`Link to ${tags}`}>
              {tags}
            </Link>
          </p>
          <h2 className='mb-4 text-base font-bold leading-[26.4px] text-slate-800  dark:text-slate-200 md:text-[22px]'>
            {href && (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            )}
          </h2>
          <p className='mb-10 max-w-none text-sm text-slate-500 line-clamp-2 dark:text-slate-400'>
            {summary}
          </p>
          {href && (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className='flex items-center'
            >
              <div>{authorImage}</div>
              <div className='ml-2 flex flex-wrap items-center text-[0.63rem] text-slate-400 lg:text-[0.75rem]'>
                <p className='mr-2'>{authorName}</p> ·{' '}
                <time className='ml-2' dateTime={date}>
                  {date}
                </time>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogSingleCard;
