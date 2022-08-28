import CardWithBanner from '@/components/CardWithBanner';
import { Header } from '@/components/Form';
import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import config from 'config';

export default function Courses(): React.ReactElement {
  return (
    <>
      <PageSEO
        title={`Courses - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className='fade-in divide-y-2 divide-gray-100 dark:divide-gray-800'>
        <Header title='Courses' />
        <div className='container py-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {config.courses.map(({ slug, title, description, banner }) => (
              <CardWithBanner
                key={slug}
                title={title}
                description={description}
                banner={banner}
                href={`/courses/${slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
