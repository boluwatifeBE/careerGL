import Card from '@/components/Card';
import CauseContent from '@/components/CourseContent';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import config from 'config';
import { InferGetStaticPropsType } from 'next';

const SLUG = 'programming';

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

        <div className='container py-12'>
          <div className='-m-4 flex flex-wrap'>
            {config.careers.map(({ slug, title, description, banner }) => (
              <Card
                key={slug}
                title={title}
                description={description}
                banner={banner}
                href={`/careers/${slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
