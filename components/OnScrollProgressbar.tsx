import React, { useEffect, useState } from 'react';

export const OnScrollProgressbar = () => {
  const [scrollBar, setScrollBar] = useState(0);

  useEffect(() => {
    const progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;

      setScrollBar(scroll);
    };

    window.addEventListener('scroll', progressBarHandler);

    return () => window.removeEventListener('scroll', progressBarHandler);
  });

  return (
    <div className='fixed top-[65px] left-0 z-40 h-1 w-full '>
      <div
        className='h-[3px] origin-top-left scale-0   bg-useGL-acent transition-transform duration-300 ease-linear '
        style={{ transform: `scale(${scrollBar}, 1)` }}
      />
    </div>
  );
};
