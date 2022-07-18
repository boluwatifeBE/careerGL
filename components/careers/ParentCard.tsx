import { Drawer } from '../Drawer';
import React, { useState } from 'react';
import {
  convertNameToUrl,
  getFromLocalStorage,
  OpinionTick,
} from './RenderFunctions';

function ParentCard(item) {
  const [isOpen, setIsOpen] = useState(false);
  const nameUrl = convertNameToUrl(item.name);
  const isDone = getFromLocalStorage(nameUrl) === 'done';

  return (
    <div className=' '>
      <div
        className={`relative flex items-center text-lg font-semibold  leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-12`}
      >
        {item.path === '' && item.name}
        {item.path !== '' && (
          <div
            suppressHydrationWarning={true}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className=' w-full cursor-pointer '
          >
            {!isDone && item.name}
            {isDone && (
              <div
                suppressHydrationWarning={true}
                className=' text-gray-500 line-through'
              >
                {item.name}{' '}
              </div>
            )}
          </div>
        )}
        <div className=''>
          {!item.opinion ||
            (Object.values(item.opinion).length != 0 && (
              <OpinionTick {...item.opinion} />
            ))}
        </div>
      </div>

      <Drawer
        name={item.name}
        path={item.path}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position='right'
        removeWhenClosed={true}
      />
    </div>
  );
}

export default ParentCard;
