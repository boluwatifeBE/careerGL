import React from 'react';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import config from 'config';
import Card from '@/components/Card';
import Link from '@/components/Link';
import Slider from '@/components/Slider';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import ScrollContainer from 'react-indiana-drag-scroll';

const MAX_DISPLAY = 4;

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <ScrollTopAndComment hide={false} />

      <section className='relative flex  w-full flex-col  py-10 lg:flex-row lg:space-x-0'>
        <img
          src={'/static/banner.png'}
          className='rounded-2xl object-cover shadow-[-13px_13px_0_rgba(28,28,28)] dark:shadow-[-13px_13px_0_rgba(246,246,246)] lg:w-2/4'
          alt='banner'
        />

        <div className='absolute left-1/4 right-0 top-0 -z-10 h-full opacity-40 '>
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

        <div className='mt-20 flex w-full flex-col pt-5 lg:mt-0 lg:w-2/4 lg:px-12 xl:px-12  2xl:px-20'>
          <div className='mb-20 xl:mb-28'>
            <p className='text-[2.125rem] font-bold leading-[1.2] md:text-[2.75rem]'>
              Find work that's worth it.
            </p>
            <p className='mt-6 text-base md:text-lg'>
              Make a career match where the people, perks and values align with
              your needs.
            </p>
          </div>

          <div className=' hidden grid-cols-1 gap-6 sm:grid-cols-1  xl:visible xl:grid xl:grid-cols-2'>
            {!config.careers.length && 'No careers found.'}
            {config.careers
              .slice(0, MAX_DISPLAY)
              .map(({ slug, title, description }) => (
                <Card
                  key={slug}
                  title={title}
                  description={description}
                  href={`/careers/${slug}`}
                />
              ))}
          </div>
          <div className='hidden lg:flex xl:hidden'>
            <Slider slides={config.careers} />
          </div>
          <ScrollContainer
            className='list mb-1 flex gap-4 overflow-auto lg:hidden'
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
      </section>

      <section className='mt-36 flex w-full'>
        <div className='h-[500px] bg-useGL-main lg:w-3/4'></div>
        <div className='bg-useGL-secondary lg:w-1/4'></div>
      </section>
    </>
  );
}
