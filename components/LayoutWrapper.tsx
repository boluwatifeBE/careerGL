import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
import Logo from '@/data/logo.svg';
import Logo2 from '@/data/logo2.svg';
import { ReactNode } from 'react';
import Footer from './Footer';
import Link from './Link';
import MobileNav from './MobileNav';
import SectionContainer from './SectionContainer';
import ThemeSwitch from './ThemeSwitch';
import Image from 'next/image';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className='flex h-screen flex-col justify-between'>
        <header className='flex items-center justify-between py-10'>
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
        </header>
        <main className='mb-auto'>{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
