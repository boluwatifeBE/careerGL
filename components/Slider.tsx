import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "./Card";

const Slider = ({ slides }) => {
  const [state, setState] = useState(0);
  const { slug, title, description } = slides[state];

  const length = slides.length;

  const Next = () => {
    setState((state + 1) % length);
  };

  const Prev = () => {
    const newState = state - 1;
    if (newState < 0) {
      setState(length - 1);
    } else {
      setState(state - 1);
    }
  };

  return (
    <>
      <Card
        key={slug}
        title={title}
        description={description}
        href={`/careers/${slug}`}
      />

      <FaChevronLeft
        className="absolute top-30 cursor-pointer"
        onClick={Prev}
      />
      <FaChevronRight
        className="absolute right-5 cursor-pointer"
        onClick={Next}
      />
    </>
  );
};

export default Slider;
