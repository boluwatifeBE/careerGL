import React from 'react'

const Parent = (item) => (
    <a href={`${item.path}`}>
        <h1 className="parent text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
            {item.name}
        </h1>
    </a>
);

const Child = (item) => (
    <a href={`${item.path}`}>
        <p className='child'>
            {item.name}
        </p>
        {item.children.map((ch) => (
            <span className='grand-child'>
                <Child {...ch} />
            </span>
        ))}
    </a>
);

export default function Tree(props) {
    return (
        <>
            {
                props.data.map((item) => (
                    <div>
                        <Parent {...item} />
                        <ul>
                            {item.children.map((ch) => (
                                <li><Child {...ch} /></li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </>
    );
}