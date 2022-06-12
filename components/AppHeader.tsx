import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Image from 'next/image';
import { memo, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const AppHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <header className={`${isScrolled && 'backdrop-blur-md backdrop-filter'}`}>
      <div className='mx-auto flex  max-w-3xl  items-center justify-between py-10 px-4 sm:px-6 xl:max-w-5xl xl:px-0'>
        <div>
          <Link href='/' aria-label={siteMetadata.headerTitle}>
            <div className='flex items-center justify-between'>
              <div className='mr-3'>
                <Image
                  src={'/static/images/logo.png'}
                  width={38}
                  height={38}
                  layout='fixed'
                  // objectFit='contain'
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
        <div className='flex items-center text-base leading-5'>
          <div className='hidden sm:block'>
            {headerNavLinks.map(link => (
              <Link
                key={link.title}
                href={link.href}
                className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default memo(AppHeader);
