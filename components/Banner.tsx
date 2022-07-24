import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import siteMetadata from '@/data/siteMetadata';

function Banner(): React.ReactElement {
  const [aboutColor] = useRandomColorPair();

  return (
    <div className='fade-in  flex  flex-col justify-center px-4 py-10 dark:text-white '>
      <h1 className='text-2xl font-bold dark:text-white lg:text-3xl'>
        Hi there
      </h1>
      <p className='text-md my-2 lg:my-4 lg:text-lg'>
        {siteMetadata.description}
      </p>
      <p className='text-md font-light lg:text-lg'>
        We also have a{' '}
        <Link
          className='text-md ml-2 mr-2 dark:text-white lg:text-lg'
          href={siteMetadata.url.youtube}
        >
          <RoughNotation
            show
            type='underline'
            animationDelay={250}
            animationDuration={2000}
            color={aboutColor}
          >
            YouTube channel
          </RoughNotation>
        </Link>{' '}
        which we hope you are going to love.
      </p>
    </div>
  );
}

export default memo(Banner);
