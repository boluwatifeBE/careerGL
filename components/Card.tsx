import Link from './Link';
import clsx from 'clsx';

interface BaseProps {
  className?: string;
  title: string;
  description: string;
  href: string;
}

function Card(props: BaseProps): React.ReactElement {
  const { title, description, href, className } = props;

  return (
    <Link href={href} aria-label={`Link to ${title}`}>
      <div
        className={clsx(
          'overflow-hidden rounded-md border border-slate-800 border-opacity-60 bg-slate-50 p-4 duration-200 ease-linear hover:translate-x-2 hover:shadow-[-6px_6px_0_rgba(15,23,42)] dark:border-slate-50 dark:bg-slate-700 dark:hover:shadow-[-6px_6px_0_rgba(241,245,249)] lg:w-full ',
          className,
        )}
      >
        <h2 className='mb-3 text-lg font-bold leading-8 tracking-tight text-slate-800 dark:text-slate-50'>
          {title}
        </h2>
        <p className='max-w-none text-sm text-slate-500 line-clamp-2 dark:text-slate-400'>
          {description}
        </p>
      </div>
    </Link>
  );
}

export default Card;
