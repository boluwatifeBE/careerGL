import React from 'react';

type ResourceGroupTitleProps = {
  children: React.ReactNode;
};

export function ResourceGroupTitle(props: ResourceGroupTitleProps) {
  const { children } = props;

  return (
    <h2 className='mt-5 mb-3 border-b border-gray-100 pb-[5px] text-sm font-bold uppercase text-gray-800  dark:border-gray-700 dark:text-gray-100'>
      {children}
    </h2>
  );
}
