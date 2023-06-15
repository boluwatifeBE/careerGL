import headerNavLinks from '@/data/headerNavLinks';
import { MouseEventHandler } from 'react';
import Link from '../Link';

type INav = {
  show: boolean;
  toggle: MouseEventHandler;
};

const MobileNav = (props: INav) => {
  return (
    <div
      className={` fixed inset-0 z-50 h-screen w-full transform justify-center  bg-white/90 backdrop-blur-md transition-transform duration-300 ease-in-out dark:bg-gray-900/90 sm:hidden ${
        props.show ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        type='button'
        className='fixed right-4 top-4 ml-1 mr-1 h-8 w-8 cursor-auto rounded py-1 focus:outline-none'
        aria-label='Toggle Menu'
        onClick={props.toggle}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='text-gray-900 dark:text-gray-100'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <nav className='fixed mt-12 h-full content-center'>
        {headerNavLinks.map(link => (
          <div key={link.title} className='px-12 py-4'>
            <Link
              href={link.href}
              className='text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100'
              onClick={props.toggle}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
