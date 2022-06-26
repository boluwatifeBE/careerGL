import { CareerMapType, CareerTreeType } from 'config/careers/careerType';
import React from 'react';
import { ChildCard, ParentCard } from './includes/RenderFunctions';

type CareerTreeRenderType = {
    data: CareerTreeType[]
}

export const CareerTreeRender = (props: CareerTreeRenderType) => {
    const { data } = props;

    if (!data) {
        return null
    }

    return (
        <div className='px-30 mx-auto my-auto flex  max-w-lg flex-col  space-y-10 '>
            {
                data.map(item => (
                    <div
                        key={item.name}
                        className='rounded-xl border-[3px] border-gray-800 p-4  dark:border-gray-50'
                    >
                        <ParentCard {...item} />
                        {item.children.length > 0 && (
                            <div key={item.name} className={`mx-2 mt-3 space-y-5`}>
                                {item.children.map(child => (
                                    <div
                                        key={child.name}
                                        className={`rounded-lg  border-2 border-gray-700 bg-gray-100 p-2 font-bold text-black dark:border-gray-100 dark:bg-gray-800  dark:text-white`}
                                    >
                                        <ChildCard {...child} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    )
}
