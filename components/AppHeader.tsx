import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

// interface Props {
//   children: ReactNode;
// }

const AppHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow(status => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <MobileNav show={navShow} toggle={onToggleNav} />
      <header
        className={`${
          isScrolled && ' shadow shadow-useGL-main/50 '
        }   fixed  top-0 z-30 w-full overflow-x-hidden bg-white/50 py-3  backdrop-blur-lg transition-all  dark:bg-gray-900/50  `}
      >
        <div className=' mx-auto flex items-center justify-between px-5 md:max-w-full md:px-12 lg:max-w-screen-2xl lg:px-20 2xl:px-10'>
          <div>
            <Link href='/' aria-label={siteMetadata.headerTitle}>
              <div className='flex items-center justify-between'>
                <div className='mr-2'>
                  <Image
                    src={'/static/images/logo.png'}
                    width={35}
                    height={35}
                    layout='fixed'
                    alt='logo'
                  />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className='hidden h-6 text-xl font-semibold sm:block'>
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className='hidden space-x-2 sm:block'>
            {headerNavLinks.map(link => (
              <Link
                key={link.title}
                href={link.href}
                className='rounded py-1 px-2 font-medium text-gray-900 dark:text-gray-100 sm:py-2 sm:px-3 '
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className='flex items-center text-base leading-5'>
            <ThemeSwitch />
            <button
              className='ml-2 mr-1 h-8 w-8 rounded sm:hidden'
              type='button'
              aria-label='Toggle Menu'
              onClick={onToggleNav}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='text-gray-900 dark:text-gray-100'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default memo(AppHeader);
