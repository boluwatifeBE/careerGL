import Link from 'next/link';
import { Drawer } from '../Drawer';
import React, { useState } from 'react';
import {
  formatSlugTolink,
  OpinionTick,
  setOrUdateLocalStorage,
} from './RenderFunctions';

function ParentCard(item) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex items-center '>
      <div
        className={`text-lg font-semibold   leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-2xl md:leading-12`}
      >
        <Link
          href={`/careers/${item.careermap}/${item.page}/${formatSlugTolink(
            item.path,
          )}`}
        >
          {item.name}
        </Link>
        {/* <button
                    onClick={() => {
                        setOrUdateLocalStorage('path', item.path);
                        setIsOpen(!isOpen);
                    }}
                > 
                    {item.name}
                </button> */}
      </div>
      <div className='ml-2 flex space-x-1'>
        {!item.opinion ||
          (Object.values(item.opinion).length != 0 && (
            <OpinionTick {...item.opinion} />
          ))}
      </div>

      {/* <Drawer
                careermap={item}
                name={item.name}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position="right"
                removeWhenClosed={true}
            >
                <CareerContent {...item} />
            </Drawer> */}
    </div>
  );
}

export default ParentCard;
