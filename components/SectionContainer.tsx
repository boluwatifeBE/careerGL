import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return (
    <div className='container mx-auto px-5 md:max-w-full md:px-12 lg:max-w-screen-2xl lg:px-14 2xl:px-10'>
      {children}
    </div>
  );
}
