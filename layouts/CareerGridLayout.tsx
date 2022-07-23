import { Header } from '@/components/Form';
import { useState } from 'react';
import { Career } from 'config/careers/careers';
import Card from '@/components/Card';
import SearchInput from '@/components/SearchInput';

interface Props {
  title: string;
  careers: Career[];
  initialDisplayCareers?: Career[];
}

function CareerGridLayout({
  title,
  careers,
  initialDisplayCareers = [],
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(3);

  const filteredCareerCards = careers.filter(careerTitle => {
    const searchContent = careerTitle.title;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  //   If initialDisplayCareers exist, display it if no searchValue is specified

  const displayCareers =
    initialDisplayCareers.length > 0 && !searchValue
      ? initialDisplayCareers
      : filteredCareerCards;

  const handleOnChange = ({ target }) => setSearchValue(target.value);
  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 3);
  };

  return (
    <>
      <Header title={title}>
        <SearchInput
          onChange={handleOnChange}
          placeholder={'Search Career'}
          filterIcon={false}
        />
      </Header>

      <div className='container py-12'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {!filteredCareerCards.length && (
            <p className='mt-8 text-center'>No careers found</p>
          )}

          {displayCareers.slice(0, visible).map((careerTitle) => {
            const { slug, title, description } = careerTitle;
            return (
              <Card
                key={slug}
                title={title}
                description={description}
                href={`/careers/${slug}`}
              />
            );
          })}
        </div>
        <div className=' item-center flex content-center justify-center  pt-8	'>
          {visible < displayCareers.length && (
            <button
              className=' content-between rounded-md border border-gray-200 bg-transparent py-2 px-4 font-semibold text-gray-900 hover:border-transparent 
              hover:bg-appColor-50 dark:border-gray-700 dark:text-gray-50 dark:hover:text-gray-900'
              onClick={showMoreItems}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CareerGridLayout;
