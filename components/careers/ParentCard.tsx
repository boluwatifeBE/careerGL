import Link from 'next/link';
import { Drawer } from '../Drawer';
import React, { useState } from 'react';
import {
  convertNameToUrl,
  formatSlugTolink,
  getFromLocalStorage,
  OpinionTick,
} from './RenderFunctions';

function ParentCard(item) {
  const [isOpen, setIsOpen] = useState(false);
  const nameUrl = convertNameToUrl(item.name);
  const isDone = getFromLocalStorage(nameUrl) === 'done';

  return (
    <div className='flex items-center '>
      <div
        className={`text-lg font-semibold   leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-12`}
      >
        {/* <Link
          href={`/careers/${item.careermap}/${item.page}/${formatSlugTolink(
            item.path,
            item.parentId,
            item.grandParentId,
          )}`}
        >
          {item.name}

        </Link> 
        
        { } | { } */}

        { item.path === '' && item.name }

        { item.path !== '' &&
          <div suppressHydrationWarning={true} onClick={() => { setIsOpen(!isOpen) }}>
            {!isDone && (
              item.name
            )}
            {isDone && (
              <div suppressHydrationWarning={true} className=' bg-appColor-50 text-black dark:border-gray-500'>{item.name} </div>
            )}
          </div>
        }


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
        position="right"
        removeWhenClosed={true}
      />
    </div>
  );
}

export default ParentCard;
