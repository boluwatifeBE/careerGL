import Link from './Link';

function Card({ title, description, href }): React.ReactElement {
  return (
    <Link
      href={href}
      aria-label={`Link to ${title}`}
      className={`overflow-hidden rounded-md border-2 border-gray-100 border-opacity-60 bg-gray-100 p-6 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 `}
    >
      <h2 className='mb-3 text-[21px] font-bold leading-8 tracking-tight text-gray-800 dark:text-gray-200'>
        {title}
      </h2>
      <p className='  max-w-none text-[14px] text-gray-500 line-clamp-2 dark:text-gray-400'>
        {description}
      </p>
    </Link>
  );
}

export default Card;
