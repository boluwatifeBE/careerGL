import React from 'react';

import Link from '@/components/Link';

type EditContentPageLinkProps = {
  href: string;
};

export function EditContentPageLink(props: EditContentPageLinkProps) {
  const { href } = props;

  return (
    <div className='mt-5 space-y-5 divide-y-2 divide-gray-100 border-t border-gray-100 dark:divide-gray-700 dark:border-gray-700'>
      <p className='text-sm font-medium  text-slate-500 dark:text-slate-400  '>
        This page is a work in progress. Help us by writing a small introduction
        to the topic and suggesting a few links to read more about this topic.
      </p>
      <div className='flex  py-6'>
        <Link
          href={href}
          className=' w-full  cursor-pointer rounded-lg bg-slate-200 px-6 py-[10px] text-center text-sm !font-semibold !text-slate-700 !no-underline hover:bg-slate-300  '
        >
          Edit this Page
        </Link>
      </div>
    </div>
  );
}
