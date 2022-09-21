import Link from '@/components/Link';

import Image from 'next/image';

export const FeaturedBlogAndAdsSection = () => {
  return (
    <section className='mt-20 flex w-full flex-col px-3 pt-20 lg:flex-row lg:space-x-0'>
      <div className='relative mr-20 h-[400px] overflow-hidden rounded-lg bg-slate-700 md:h-[600px] lg:w-4/6'>
        <div
          className='absolute top-0 left-0 z-20 rounded-br-lg bg-useGL-main p-3 px-10
              text-xs font-semibold text-gray-200'
        >
          <span className='cursor-pointer '>Featured</span>
        </div>
        <Link className='relative block h-full cursor-pointer'>
          <div className='absolute top-0 left-0 z-10 h-full w-full  bg-gradient-to-tr from-useGL-secondary' />
          <Image
            src={'/static/blogs/careerGL-post.png'}
            width={200}
            height={200}
            alt=''
            layout='fill'
            className='object-cover object-center'
            // objectFit='cover'
          />
        </Link>
        <div className='absolute bottom-0 left-0 z-10 max-w-2xl p-5 text-slate-100 md:p-10'>
          <Link className='relative flex w-full flex-col'>
            <span className='false false text-[0.65rem]  font-semibold  uppercase  tracking-widest text-slate-100 md:text-sm'>
              Emerging Tech Africa
            </span>
            <p className='mt-5 cursor-pointer text-xl font-extrabold md:text-3xl'>
              How Kemisola Bolarinwa invented a smart bra to detect cancer and
              save lives globally
            </p>
          </Link>
          <div className='mt-10 flex gap-4'>
            <div className='ml-2 flex flex-wrap items-center gap-2 text-[0.63rem] text-gray-400 lg:text-sm'>
              <div className='z-10 h-[20px] w-[20px] rounded-full bg-useGL-main shadow-[0_0_0_2px_#fff] dark:shadow-[0_0_0_2px_#0a3167]'>
                pic
              </div>
              <p className=''>Author name</p>
            </div>
            <p>Time</p>
          </div>
        </div>
      </div>

      <div className='bg-useGL-secondary lg:w-4/12'></div>
    </section>
  );
};
