import Image from 'next/image';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import formatDate from '@/lib/utils/formatDate';

type BlogGridCardProps = {
  banner?: string[];
  tags?: string[];
  title: string;
  summary?: string;
  href: string;
  slug: string;
  date?: string;
};

function FeatureBlogCard(props: BlogGridCardProps): React.ReactElement {
  const { banner, tags, title, summary, href, slug, date } = props;
  const image = banner?.[0];

  const bannerImage = (
    <Image
      alt={title}
      src={image}
      className='object-cover object-center'
      width={544}
      height={306}
      layout='fill'
    />
  );

  return (
    <div className='onHover relative h-[400px] overflow-hidden rounded-lg bg-slate-700 md:h-[600px] lg:mr-8 lg:w-4/6 xl:mr-20'>
      <div
        className='absolute top-0 left-0 z-20 rounded-br-lg bg-useGL-main p-3 px-10
              text-xs font-semibold text-gray-200'
      >
        <Link href={`/topics/${tags}`} aria-label={`Link to ${tags}`}>
          <span className='cursor-pointer '>Featured</span>
        </Link>
      </div>
      {banner &&
        (href ? (
          <Link
            href={`blog/${slug}`}
            aria-label={`Link to ${title}`}
            className='relative block h-full cursor-pointer'
          >
            <div className='absolute top-0 left-0 z-10 h-full w-full  bg-gradient-to-tr from-useGL-secondary' />
            {bannerImage}
          </Link>
        ) : (
          { bannerImage }
        ))}

      <div className='absolute bottom-0 left-0 z-10 max-w-2xl p-5 text-slate-100 md:p-10'>
        <Link className='relative flex w-full flex-col'>
          <span className='false false text-[0.65rem]  font-semibold  uppercase  tracking-widest text-slate-100 md:text-sm'>
            {tags.map(tag => (
              <Tag key={tag} text={tag} />
            ))}
          </span>
          <h2 className='mt-5 cursor-pointer text-xl font-extrabold md:text-3xl'>
            {slug && (
              <Link href={`blog/${slug}`} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            )}
          </h2>
        </Link>
        <div className='mt-10 flex gap-4'>
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
      </div>
    </div>
  );
}

export default FeatureBlogCard;
