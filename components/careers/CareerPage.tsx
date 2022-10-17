import { CareermapItem } from './CareermapItem';
import { CareerMapType } from 'config/careers/careerType';

type CareerProps = {
  careermaps?: CareerMapType[];
  slug?: string;
};
export default function CareerPage(props: CareerProps) {
  const { slug, careermaps } = props;

  return (
    <div className=' py-12'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {careermaps.map((careermap: CareerMapType) => (
          <CareermapItem
            isUpcoming={careermap.isUpcoming}
            url={`/careers/${slug}/${careermap.id}`}
            key={careermap.id}
            title={careermap.featuredTitle}
            isCommunity={careermap.isCommunity}
            subtitle={careermap.featuredDescription}
          />
        ))}
      </div>
    </div>
  );
}
