import Link from './Link';

function Card({ title, description, href }): React.ReactElement {
  return (
    <Link href={href} aria-label={`Link to ${title}`}>
      <div
        className={`h-36 w-[265px] overflow-hidden rounded-md border border-gray-800 border-opacity-60 bg-gray-100 p-4 duration-200 ease-linear hover:translate-x-2 hover:shadow-[-6px_6px_0_rgba(28,28,28)] dark:border-gray-400 dark:bg-gray-800 dark:hover:shadow-[-6px_6px_0_rgba(246,246,246)] lg:w-full `}
      >
        <h2 className='mb-3 text-lg font-bold leading-8 tracking-tight text-gray-800 dark:text-gray-200'>
          {title}
        </h2>
        <p className='max-w-none text-sm text-gray-500 line-clamp-2 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </Link>
  );
}

export default Card;
