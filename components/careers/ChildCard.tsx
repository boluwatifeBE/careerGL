import React, { useState } from 'react'
import Link from 'next/link';
import { Drawer } from '../Drawer';
import { formatSlugTolink, OpinionTick, setOrUdateLocalStorage } from './RenderFunctions';

function ChildCard(item) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div key={item.name} className={`${item.level}`}>
                {!item.opinion || Object.values(item.opinion).length != 0 && <OpinionTick {...item.opinion} />}
                <Link href={`/careers/${item.careermap}/${item.page}/${formatSlugTolink(item.path, item.parentId, item.grandParentId)}`}>
                    {item.name}
                </Link>
                {/* <button
                    onClick={() => {
                        setOrUdateLocalStorage('path', item.path);
                        setIsOpen(!isOpen);
                    }}
                > */}
                {/* {item.name} */}
                {/* </button> */}
            </div>
            {item.children.length > 0 && (
                <div className='  mt-2 mx-2 box-border flex  flex-wrap '>
                    {!item.children.opinion || Object.values(item.children.opinion).length != 0 && <OpinionTick {...item.children.opinion} />}
                    {item.children.map(child => (
                        <div
                            key={child.name}
                            className={`${child.level} mx-[3px] mt-[6px] box-border w-full flex-grow justify-between space-x-1 rounded-lg border-2 border-gray-800 bg-appColor-50 px-3 py-1 font-semibold text-black dark:border-gray-500 md:w-[40%] `}
                        >
                            <ChildCard careermap={item.careermap} page={item.page} {...child} />
                        </div>
                    ))}
                </div>
            )}

            {/* <Drawer
                careermap={item}
                name={item.name}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                position="right"
                removeWhenClosed={true}
            >
                <CareerContent {...item.path} />
            </Drawer> */}
        </>
    )
}

export default ChildCard