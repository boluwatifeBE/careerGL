import config from 'config';
import careerConfig from 'config/careers';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import { InferGetStaticPropsType } from 'next';
import Career from '@/components/careers/CareerPage';

const SLUG = 'teaching';

export function getStaticProps() {
  const career = config.careers.find(career => career.slug === SLUG);

  return { props: { career } };
}

export default function Go(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): React.ReactElement {
  const { career } = props;
  const { title, description } = career;

  return (
    <>
      <PageSEO
        title={title}
        description={description}
        imageUrl={`/static/careers/${SLUG}/banner.png`}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title={title} subtitle={description} />
        <Career careermaps={careerConfig.teaching} />
      </div>
    </>
  );
}
