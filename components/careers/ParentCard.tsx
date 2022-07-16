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
    <div className='flex items-center  '>
      <h1
        className={`text-lg font-semibold   leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-12`}
      >
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
                className=' text-gray-500 line-through'
              >
                {item.name}{' '}
              </div>
            )}
          </div>
        )}
      </h1>

      <div className='ml-2 flex space-x-1'>
        {!item.opinion ||
          (Object.values(item.opinion).length != 0 && (
            <OpinionTick {...item.opinion} />
          ))}
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
