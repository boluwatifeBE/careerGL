import ChildCard from './ChildCard';
import ParentCard from './ParentCard';
import { CareerTreeType } from 'config/careers/careerType';

type CareerTreeRenderType = {
  careermap: string;
  page: string;
  data: CareerTreeType[];
};

export const CareerTreeRender = (props: CareerTreeRenderType) => {
  const { careermap, page, data } = props;

  if (!data) {
    return null;
  }

  return (
    <div className='px-30 mx-auto my-auto flex  max-w-md flex-col  space-y-10 '>
      {data.map(item => (
        <div
          key={item.name}
          className='relative rounded-xl border-2 border-gray-700 bg-white p-4 before:absolute before:top-[-7px]  before:left-0 before:right-0 before:z-10 before:mx-auto before:h-4 before:w-4 before:rounded-full before:border-[6px] before:border-gray-400 before:bg-gray-100 dark:border-gray-100 dark:bg-gray-900 dark:before:border-gray-700 dark:before:bg-gray-200'
        >
          <ParentCard careermap={careermap} page={page} {...item} />
          {item.children.length > 0 && (
            <div key={item.name} className={`mx-2 mt-3  space-y-5`}>
              {item.children.map(child => (
                <div
                  key={child.name}
                  className={`rounded-lg  border-2 border-gray-700 bg-gray-100 p-2 font-semibold text-black dark:border-gray-100 dark:bg-gray-800  dark:text-white`}
                >
                  <ChildCard careermap={careermap} page={page} {...child} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
