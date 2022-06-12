import { CareermapItem } from './CareermapItem';
import { CareerMapType } from 'config/careers/careerType';

type CareerProps = {
  careermaps?: CareerMapType[];
};
export default function CareerPage(props: CareerProps) {
  const { careermaps } = props;

  return (
    <div className='container py-12'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
        {careermaps.map((careermap: CareerMapType, counter: number) => (
          <CareermapItem
            isUpcoming={careermap.isUpcoming}
            url={`/${careermap.id}`}
            key={careermap.id}
            colorIndex={counter}
            title={careermap.featuredTitle}
            isCommunity={careermap.isCommunity}
            subtitle={careermap.featuredDescription}
          />
        ))}
      </div>
    </div>
  );
}
