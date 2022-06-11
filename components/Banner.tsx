import Link from '@/components/Link';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';
import { memo } from 'react';
import { RoughNotation } from 'react-rough-notation';
import { AuthorFrontMatter } from 'types/AuthorFrontMatter';
import siteMetadata from '@/data/siteMetadata';

interface BannerProps {
  frontMatter: AuthorFrontMatter;
}

function Banner(props: BannerProps): React.ReactElement {
  const { frontMatter } = props;
  const [aboutColor] = useRandomColorPair();

  return (
    <div className='fade-in  flex  flex-col justify-center px-6 py-10 dark:text-white lg:px-10'>
      <h1 className='text-3xl font-bold dark:text-white lg:text-5xl'>
        Hi there
      </h1>
      <p className='my-2 text-lg lg:my-4 lg:text-2xl'>
        {siteMetadata.description}
      </p>
      <p className='font-light lg:text-xl'>
        We also have a{' '}
        <Link
          className='ml-2 mr-2 font-normal text-black'
          href={siteMetadata.youtube}
        >
          <RoughNotation
            show
            type='highlight'
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
