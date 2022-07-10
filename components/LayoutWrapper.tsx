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
import AppHeader from './AppHeader';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      <SectionContainer>
        <div className='flex h-screen flex-col justify-between pt-20'>
          <main className='mb-auto'>{children}</main>

          <Footer />
        </div>
      </SectionContainer>
    </>
  );
};

export default LayoutWrapper;
