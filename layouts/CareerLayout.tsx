import { Header } from '@/components/Form';
import { ComponentProps, useEffect, useState } from 'react';
import { Career } from 'config/careers/careers';
import config from 'config';
import Pagination from '@/components/Pagination';
import Link from '@/components/Link';
import { BsFilterLeft as FilterIcon } from 'react-icons/bs';
import Card from '@/components/Card';
import SearchInput from '@/components/SearchInput';

interface Props {
  title: string;
  posts: Career[];
  initialDisplayPosts?: Career[];
  // pagination?: ComponentProps<typeof Pagination>;
  // value: number;
}

function CareerLayout({
  title,
  posts,
  initialDisplayPosts = [],
}: // pagination,
Props) {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(2);

  const filteredCareerCards = posts.filter(careerTitle => {
    const searchContent = careerTitle.title;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  //   If initialDisplayPosts exist, display it if no searchValue is specified


  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue
      ? initialDisplayPosts
      : filteredCareerCards;


  // const showLoadMoreBtn = visible < displayPosts.length

  const handleOnChange = ({ target }) => setSearchValue(target.value);

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 1);
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
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
          {!filteredCareerCards.length && (
            <p className='mt-8 text-center'>No posts found</p>
          )}

          {displayPosts.slice(0, visible).map((careerTitle, index) => {
            const { slug, title, description, banner } = careerTitle;
            return (
              <Card
                key={slug}
                title={title}
                description={description}
                banner={banner}
                href={`/careers/${slug}`}
              />
            );
          })}
        </div>
        <div className=' item-center flex content-center justify-center  pt-8	'>
          {visible < displayPosts.length && (
            <button
              className=' content-between rounded-md border 
      border-gray-200 bg-transparent py-2 px-4 font-semibold text-gray-900 hover:border-transparent
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

export default CareerLayout;
