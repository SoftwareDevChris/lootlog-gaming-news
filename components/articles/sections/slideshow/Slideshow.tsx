"use client";

import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { TArticleContent } from "@/types/types";

import { Slide } from "./Slide";

export const Slideshow: React.FC<{ slides: TArticleContent[] }> = ({
  slides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideAnimationClasses = {
    initial: "transform transition duration-500 ease-in-out",
    next: "translate-x-full",
    previous: "-translate-x-full",
  };

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  };

  // Timer for automatic slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 7000);

    // Clean up the timer when the component is unmounted or before the next render
    return () => clearInterval(timer);
  }, [goToNextSlide]);

  return (
    <div className="max-w-1300 mx-auto w-full">
      <div className="relative">
        <div className="absolute left-0 top-1/2 flex w-full items-center justify-between">
          <button
            title="Previous slide"
            className="absolute left-2 top-[calc(50%-20px)] z-10 mr-2 -translate-y-1/2 rounded-full bg-gray-500 p-2 text-white sm:top-1/2"
            onClick={goToPreviousSlide}
          >
            <FaArrowLeft className="text-sm sm:text-xl" />
          </button>
          <button
            title="Next slide"
            className="absolute right-2 top-[calc(50%-20px)] z-10 ml-2 -translate-y-1/2 rounded-full bg-gray-500 p-2 text-white sm:top-1/2"
            onClick={goToNextSlide}
          >
            <FaArrowRight className="text-sm sm:text-xl" />
          </button>
        </div>
        <div className="relative flex w-full overflow-hidden rounded-xl pt-[56.25%]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute left-0 top-0 h-full w-full bg-gray-200 ${
                slideAnimationClasses.initial
              } ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? slideAnimationClasses.previous
                    : slideAnimationClasses.next
              }`}
            >
              <Slide content={slide} />
            </div>
          ))}
        </div>
        <div className="bottom-0 flex w-full justify-center space-x-2 py-4 sm:absolute">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-4 rounded-sm ${
                index === currentSlide ? "bg-custom-amber-800" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
