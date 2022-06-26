import Link from 'next/link';
import { Drawer } from '../Drawer';
import React, { useState } from 'react'
import { formatSlugTolink, OpinionTick, setOrUdateLocalStorage } from './RenderFunctions';

function ParentCard(item) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!item.opinion || Object.values(item.opinion).length != 0 && <OpinionTick {...item.opinion} />}
            <h1
                className={`text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14`}
            >
                <Link href={`/careers/${item.careermap}/${item.page}/${formatSlugTolink(item.path)}`}>
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
            </h1>

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
        </>
    )
}

export default ParentCard