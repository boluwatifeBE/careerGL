import React from 'react'

const Parent = (item) => (
    <a href={item.path}>
        <h1 className={`${item.level} text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14`}>
            {item.name}
        </h1>
    </a>
);

const Child = (item) => (
    <>
        <p key={item.name} className={item.level}>
            {item.name}
        </p>
        {item.children.map((child) => (
            <div key={child.name} className={child.level}>
                <Child {...child} />
            </div>
        ))}
    </>
);

export default function Tree(props) {
    return (
        <>
            {
                props.data.map((item) => (
                    <div key={item.name}>
                        <Parent {...item} />
                        <ul key={item.name}>
                            {item.children.map((child) => (
                                <li key={child.name}><Child {...child} /></li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </>
    );
}