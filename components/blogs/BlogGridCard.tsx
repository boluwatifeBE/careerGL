import Image from 'next/image';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import formatDate from '@/lib/utils/formatDate';

type BlogGridCardProps = {
  banner?: string[];
  tags?: string[];
  title: string;
  summary?: string;
  hrefSlug?: string,
  date?: string;
};

function BlogGridCard(props: BlogGridCardProps): React.ReactElement {
  const {
    banner,
    tags,
    title,
    summary,
    hrefSlug,
    date,
  } = props;
  const image = banner?.[0];

  const bannerImage = (
    <Image
      alt={title}
      src={image}
      className='object-cover object-center md:h-36 lg:h-48 '
      width={544}
      height={306}
      style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
    />
  );

  return (
    <div className=' ' style={{ maxWidth: '544px' }}>
      <div
        className={`${
          banner && 'h-full'
        }  onHover overflow-hidden  rounded-lg border-slate-100 border-opacity-60  bg-slate-50 dark:border-slate-800 dark:bg-slate-700`}
      >
        {banner &&
          (hrefSlug ? (
            <Link href={hrefSlug} aria-label={`Link to ${title}`}>
              {bannerImage}
            </Link>
          ) : (
            { bannerImage }
          ))}
        <div className='px-3 pt-2 pb-4'>
          <p className='mb-3 cursor-pointer text-[0.58rem] font-semibold uppercase tracking-widest text-useGL-main md:text-[0.80rem]'>
            <Link href={`/topics/${tags}`} aria-label={`Link to ${tags}`}>
              {tags.map(tag => (
                <Tag key={tag} text={tag} />
              ))}
            </Link>
          </p>
          <h2 className="mb-4 text-base font-bold leading-[26.4px] text-slate-800  dark:text-slate-200 md:text-[22px]">
            {hrefSlug && (
              <Link href={hrefSlug} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            )}
          </h2>
          <p className='mb-10 max-w-none text-sm text-slate-500 line-clamp-2 dark:text-slate-400'>
            {summary}
          </p>
          <div className='text-[0.63rem] text-slate-400 lg:text-[0.75rem]'>
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogGridCard;
