import { ReactNode } from 'react';
import Footer from './Footer';
import SectionContainer from './SectionContainer';
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
