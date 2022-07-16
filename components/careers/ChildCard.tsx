import React, { useState } from 'react';
import { Drawer } from '../Drawer';
import {
  convertNameToUrl,
  getFromLocalStorage,
  OpinionTick,
} from './RenderFunctions';

function ChildCard(item) {
  const [isOpen, setIsOpen] = useState(false);
  const nameUrl = convertNameToUrl(item.name);
  const isDone = getFromLocalStorage(nameUrl) === 'done';

  return (
    <>
      <div key={item.name} className={'flex items-center'}>
        {item.path === '' && item.name}
        {item.path !== '' && (
          <div
            suppressHydrationWarning={true}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className='cursor-pointer'
          >
            {!isDone && item.name}
            {isDone && (
              <div
                suppressHydrationWarning={true}
                className=' text-gray-500 line-through '
              >
                {item.name}{' '}
              </div>
            )}
          </div>
        )}

        <div className='ml-2 flex space-x-1'>
          {!item.opinion ||
            (Object.values(item.opinion).length != 0 && (
              <OpinionTick {...item.opinion} />
            ))}
        </div>
      </div>
      {item.children.length > 0 && (
        <div className='mx-2 mt-2 box-border flex flex-wrap'>
          {!item.children.opinion ||
            (Object.values(item.children.opinion).length != 0 && (
              <OpinionTick {...item.children.opinion} />
            ))}
          {item.children.map(child => (
            <div
              key={child.name}
              className={`mx-[3px] mt-[6px] box-border w-full flex-grow justify-between space-x-1 rounded-lg border-2 border-gray-800 bg-[rgb(255,229,153)] px-3 py-1 font-semibold text-black dark:border-gray-500 md:w-[40%] `}
            >
              <ChildCard
                careermap={item.careermap}
                page={item.page}
                {...child}
              />
            </div>
          ))}
        </div>
      )}

      <Drawer
        name={item.name}
        path={item.path}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position='right'
        removeWhenClosed={true}
      />
    </>
  );
}

export default ChildCard;
