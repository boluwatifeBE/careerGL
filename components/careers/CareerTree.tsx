import React from 'react';

const Parent = item => (
  <a href={item.path}>
    <h1
      className={`${item.level} text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14`}
    >
      {item.name}
    </h1>
  </a>
);

const Child = item => (
  <>
    <div key={item.name} className={`${item.level}`}>
      {item.name}
    </div>
    {item.children.length > 0 && (
      <div className='  mt-2 mx-2 box-border flex  flex-wrap '>
        {item.children.map(child => (
          <div
            key={child.name}
            className={`${child.level} mx-[3px] mt-[6px] box-border w-full flex-grow justify-between space-x-1 rounded-lg border-2 border-gray-800 bg-appColor-50 px-3 py-1 font-semibold text-black dark:border-gray-500 md:w-[40%] `}
          >
            <Child {...child} />
          </div>
        ))}
      </div>
    )}
  </>
);

export default function Tree(props) {
  return (
    <div className='px-30 mx-auto my-auto flex  max-w-lg flex-col  space-y-10 '>
      {props.data.map(item => (
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
      ))}
    </div>
  );
}
