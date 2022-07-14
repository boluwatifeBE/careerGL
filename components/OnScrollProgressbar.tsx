import { useEffect, useState } from 'react';
import { motion, useViewportScroll, useSpring, useScroll } from 'framer-motion';

export const OnScrollProgressbar = () => {
  const { scrollYProgress } = useViewportScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <div className=''>
        <motion.div
          className='fixed top-[65px] left-0 right-0 z-40 h-[3px] origin-[0%] bg-appColor-100'
          style={{ scaleX }}
        />
      </div>
    </>
  );
};

// export default OnScrollProgressbar;
