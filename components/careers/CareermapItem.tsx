import Link from 'next/link';

type CareermapGridItemProps = {
  title: string;
  subtitle: string;
  isCommunity?: boolean;
  isUpcoming?: boolean;
  colorIndex?: number;
  url: string;
};

export function CareermapItem(props: CareermapGridItemProps) {
  const {
    title,
    subtitle,
    isCommunity,
    colorIndex = 0,
    url,
    isUpcoming,
  } = props;

  return (
    <div className='md  p-3 ' style={{ maxWidth: '544px' }}>
      <div
        className={`relative overflow-hidden rounded-md border-2 border-gray-100 border-opacity-60 bg-gray-100 p-4 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700`}
      >
        {/* {isCommunity && (<div>Community contribution</div>)} */}

        <div>
          <h2 className='mb-3 text-[21px] font-bold leading-8 tracking-tight text-gray-800 dark:text-gray-200'>
            {url ? (
              <Link href={url} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className='mb-3 max-w-none text-[14px] tracking-tight text-gray-500 dark:text-gray-400'>
            {url ? (
              <Link href={url} aria-label={`Link to ${title}`}>
                {subtitle}
              </Link>
            ) : (
              subtitle
            )}
          </p>
        </div>

        {isUpcoming && (
          <div className=' absolute inset-y-0 inset-x-0 flex items-center justify-center bg-gray-500/75  dark:bg-gray-900/75'>
            <p className='z-10 rounded-xl bg-gray-200 py-2 px-[17px] font-bold drop-shadow-lg dark:bg-gray-600'>
              Upcoming
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
