import config from 'config';
import Card from '@/components/Card';
import Link from '@/components/Link';
import Slider from '@/components/Slider';
import ScrollContainer from 'react-indiana-drag-scroll';

const MAX_DISPLAY = 4;

export const BannerSection = () => {
  return (
    <section className='relative flex  w-full flex-col  py-10 lg:flex-row lg:space-x-0'>
      <div className='lg-px-0 flex h-[18rem] py-4 pl-6 pr-6 sm:h-[25rem] md:h-[28rem] lg:h-[25rem] lg:w-2/4 xl:h-[35rem]'>
        <div className=' w-full rounded-2xl bg-light-banner  bg-cover bg-no-repeat object-cover shadow-[-8px_8px_0_rgba(15,23,42)] duration-200 ease-linear dark:bg-dark-banner dark:shadow-[-8px_8px_0_rgba(241,245,249)] md:shadow-[-13px_13px_0_rgba(15,23,42)] md:dark:shadow-[-13px_13px_0_rgba(241,245,249)]' />
      </div>

      <div className='absolute left-1/4 right-0 top-0 -z-10 h-full opacity-30 '>
        <svg width='100%' height='100%'>
          <pattern
            id='pattern-circles'
            x='0'
            y='0'
            width='30'
            height='30'
            patternUnits='userSpaceOnUse'
            patternContentUnits='userSpaceOnUse'
          >
            <circle
              id='pattern-circle'
              cx='10'
              cy='10'
              r='1.6257413380501518'
              className='fill-slate-700 dark:fill-slate-500'
            ></circle>
          </pattern>

          <rect
            id='rect'
            x='0'
            y='0'
            width='100%'
            height='100%'
            fill='url(#pattern-circles)'
          ></rect>
        </svg>
      </div>

      <div className='lg:w-2/4'>
        <div className='mt-20 flex w-full flex-col  lg:mt-0  lg:px-12 xl:px-12  2xl:px-20'>
          <div className='xl:mb-26 mb-20'>
            <p className='text-[2.125rem] font-bold leading-[1.2] text-slate-900 dark:text-slate-50 md:text-[2.75rem]'>
              Find work that's worth it.
            </p>
            <p className='mt-6 text-base md:text-lg'>
              Make a career match where the people, perks and values align with
              your needs.
            </p>
          </div>

          <div className=' hidden grid-cols-1 gap-6 sm:grid-cols-1  xl:visible xl:grid xl:grid-cols-2'>
            {config.careers
              .slice(0, MAX_DISPLAY)
              .map(({ slug, title, description }) => (
                <Card
                  key={slug}
                  title={title}
                  description={description}
                  href={`/careers/${slug}`}
                  className={'h-36 w-[265px] '}
                />
              ))}
          </div>
          <div className='hidden lg:flex xl:hidden'>
            <Slider slides={config.careers} />
          </div>
          <ScrollContainer
            className='list  flex gap-4 overflow-auto pl-2 pb-6 lg:hidden'
            hideScrollbars={true}
          >
            {config.careers
              .slice(0, MAX_DISPLAY)
              .map(({ slug, title, description }) => (
                <Card
                  key={slug}
                  title={title}
                  description={description}
                  href={`/careers/${slug}`}
                  className={'h-36 w-[265px] '}
                />
              ))}
          </ScrollContainer>

          <div>
            <Link
              href='/careers'
              className=' float-right mt-6 rounded-md p-2 text-[14px] font-semibold leading-6 text-useGL-main hover:bg-useGL-secondary/20 dark:text-useGL-darkMain dark:hover:bg-useGL-darkSecondary/20'
              aria-label='all careers'
            >
              Browse all careers &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
