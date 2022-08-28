import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import siteMetadata from '@/data/siteMetadata';

function Banner(): React.ReactElement {

  return (
    <div className='fade-in  flex  flex-col justify-center px-4 py-10 dark:text-white '>
      <h1 className='text-2xl font-bold dark:text-white lg:text-3xl'>
        Hi there
      </h1>
      <p className='text-md my-2 lg:my-4 lg:text-lg'>
        {siteMetadata.description}
      </p>
      <p className='text-sm font-light lg:text-base'>
        We also have a
        <Link
          className=' ml-2 mr-2 px-1 font-normal text-gray-800 underline decoration-red-600 decoration-2 underline-offset-[3px] dark:text-gray-300 lg:text-lg'
          href={siteMetadata.url.youtube}
        >
          YouTube channel
        </Link>
        which we hope you are going to love.
      </p>
    </div>
  );
}

export default memo(Banner);
