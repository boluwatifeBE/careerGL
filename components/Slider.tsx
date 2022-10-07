import { Career } from 'config/careers/careers';
import React, { createRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from './Card';

interface sliderProps {
  limit?: number;
  slides: Career[];
}

const Slider = ({ limit, slides }: sliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const refs = slides.reduce((acc, val, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToSlide = i => {
    setCurrentSlide(i);

    refs[i].current.scrollIntoView({
      behavior: 'smooth',

      block: 'nearest',

      inline: 'start',
    });
  };

  const slideLength = limit ?? slides.length;

  const nextImage = () => {
    if (currentSlide >= slideLength - 1) {
      scrollToSlide(0);
    } else {
      scrollToSlide(currentSlide + 1);
    }
  };

  const previousImage = () => {
    if (currentSlide === 0) {
      scrollToSlide(slideLength - 1);
    } else {
      scrollToSlide(currentSlide - 1);
    }
  };

  const arrowStyle = `absolute text-gray-600 dark:text-gray-200 text-2xl z-10    rounded-full h-10 w-10 opacity-25 hover:opacity-75 flex items-center justify-center`;

  const sliderControl = isLeft => (
    <button
      type='button'
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? '-left-10  ' : '-right-10 '}`}
      style={{ top: '30%' }}
    >
      <span role='img' aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? (
          <FaChevronLeft className='cursor-pointer' />
        ) : (
          <FaChevronRight className='cursor-pointer' />
        )}
      </span>
    </button>
  );

  return (
    <div className='flex w-full items-center justify-center  '>
      <div className='relative w-full '>
        <div className='carousel pl-2 pb-6'>
          {currentSlide === 0 ? sliderControl(false) : sliderControl(true)}

          {slides.slice(0, slideLength).map((slide, index) => (
            <div className='w-full flex-shrink-0' ref={refs[index]} key={index}>
              <Card
                key={slide.slug}
                title={slide.title}
                description={slide.description}
                href={`/careers/${slide.slug}`}
              />
            </div>
          ))}
          {currentSlide >= slideLength - 1
            ? sliderControl(true)
            : sliderControl(false)}
        </div>
      </div>
    </div>
  );
};

export default Slider;
