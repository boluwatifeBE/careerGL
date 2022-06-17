import React from 'react';

const opinionHas = (values, string: string): boolean => {
    return Object.values(values).includes(string);
}

const OpinionTick = (opinionValue) => {
    return (
        <>
            {
                opinionHas(opinionValue, 'personal') &&
                <div className='z-10 rounded-xl bg-red-200 py-2 font-bold dark:bg-red-600'></div>
            }
            {
                opinionHas(opinionValue, 'alternative') &&
                <div className='z-10 rounded-xl bg-green-200 py-2 font-bold dark:bg-green-600'></div>
            }
            {
                opinionHas(opinionValue, 'order') &&
                <div className='z-10 rounded-xl bg-pink-200 py-2 font-bold dark:bg-pink-600'></div>
            }
            {
                opinionHas(opinionValue, 'never') &&
                <div className='z-10 rounded-xl bg-blue-200 py-2 font-bold dark:bg-blue-600'></div>
            }
        </>
    );
}

const Parent = (item) => (
    <>
        {!item.opinion || Object.values(item.opinion).length != 0 && <OpinionTick {...item.opinion} />}
        <a href={item.path}>
            <h1
                className={`text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14`}
            >
                {item.name}
            </h1>
        </a>
    </>
);

const Child = (item) => (
    <>
        <div key={item.name} className={`${item.level}`}>
            {!item.opinion || Object.values(item.opinion).length != 0 && <OpinionTick {...item.opinion} />}
            {item.name}
        </div>
        {item.children.length > 0 && (
            <div className='  mt-2 mx-2 box-border flex  flex-wrap '>
                {!item.children.opinion || Object.values(item.children.opinion).length != 0 && <OpinionTick {...item.children.opinion} />}
                {item.children.map(child => (
                    <div
                        key={child.name}
                        className={`${child.level} mx-[3px] mt-[6px] box-border w-full flex-grow justify-between space-x-1 rounded-lg border-2 border-gray-800 bg-appColor-50 px-3 py-1 font-semibold text-black dark:border-gray-500 md:w-[40%] `}
                    >
                        {/* {!child.opinion || Object.values(child.opinion).length != 0 && <OpinionTick {...child.opinion} />} */}
                        <Child {...child} />
                    </div>
                ))}
            </div>
        )}
    </>
);

export const RenderTree = ({ items }) => {
    if (!items || !items.data) {
        return null
    }

    return (
        <div className='px-30 mx-auto my-auto flex  max-w-lg flex-col  space-y-10 '>
            {
                items.data.map(item => (
                    <div
                        key={item.name}
                        className='rounded-xl border-[3px] border-gray-800 p-4  dark:border-gray-50'
                    >
                        <Parent {...item} />
                        {item.children.length > 0 && (
                            <div key={item.name} className={`mx-2 mt-3 space-y-5`}>
                                {item.children.map(child => (
                                    <div
                                        key={child.name}
                                        className={`rounded-lg  border-2 border-gray-700 bg-gray-100 p-2 font-bold text-black dark:border-gray-100 dark:bg-gray-800  dark:text-white`}
                                    >
                                        <Child {...child} />
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
