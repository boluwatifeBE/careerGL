import Image from 'next/image';
import Link from './Link';

function CardWithBanner({ title, description, banner, href }): React.ReactElement {
  const image = (
    <Image
      alt={title}
      src={banner}
      className='object-cover object-center md:h-36 lg:h-48'
      width={544}
      height={306}
    />
  );

  return (
    <div className='md p-3   ' style={{ maxWidth: '544px' }}>
      <div
        className={`${
          banner && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-100 border-opacity-60 bg-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 `}
      >
        {banner &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {image}
            </Link>
          ) : (
            image
          ))}
        <div className='p-6'>
          <h2 className='mb-3 text-[21px] font-bold leading-8 tracking-tight text-gray-800 dark:text-gray-200'>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className='prose mb-3 max-w-none text-[14px] text-gray-500 line-clamp-2 dark:text-gray-400'>
            {description}
          </p>
          {href && (
            <Link
              href={href}
              className='text-[14px] font-medium leading-6 text-appColor-200 hover:text-appColor-50 dark:hover:text-appColor-50'
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardWithBanner;
