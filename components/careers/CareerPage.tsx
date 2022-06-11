import { CareermapItem } from './CareermapItem';
import { CareerMapType } from 'config/careers/careerType';

type CareerProps = {
    careermaps?: CareerMapType[];
};
export default function CareerPage(props: CareerProps) {
    const { careermaps } = props;

    return (
        <div className='container py-12'>
            <div className='-m-4 flex flex-wrap'>
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
    )
}