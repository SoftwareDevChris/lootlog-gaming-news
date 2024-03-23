"use client";

import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Types
import { TArticle } from "@/types/types";

// Components
import { Slide } from "./Slide";

// Dummy Data
import { DUMMY_ARTICLES } from "@/utils/dummyData";

type Props = {
  articles: TArticle[];
};

export const Slideshow: React.FC<Props> = ({ articles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowArticles = articles
    ? articles.slice(0, 5)
    : DUMMY_ARTICLES.slice(0, 5);

  const slideAnimationClasses = {
    initial: "transform transition duration-500 ease-in-out",
    next: "translate-x-full",
    previous: "-translate-x-full",
  };

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowArticles.length);
  }, [slideshowArticles.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slideshowArticles.length - 1 : prevSlide - 1,
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
    <div className="mx-auto w-full max-w-[1300px] md:px-[50px]">
      <div className="relative">
        {/* Arrows */}
        <div className="absolute left-0 top-1/2 flex w-full items-center justify-between">
          <button
            title="Previous slide"
            className="absolute left-5 top-[calc(50%-20px)] z-10 mr-2 -translate-y-1/2 rounded-full bg-custom-amber-800 p-2 text-white sm:top-1/2 md:-left-[50px]"
            onClick={goToPreviousSlide}
          >
            <FaArrowLeft className="text-sm sm:text-xl" />
          </button>
          <button
            title="Next slide"
            className="absolute right-5 top-[calc(50%-20px)] z-10 ml-2 -translate-y-1/2 rounded-full bg-custom-amber-800 p-2 text-white sm:top-1/2 md:-right-[50px]"
            onClick={goToNextSlide}
          >
            <FaArrowRight className="text-sm sm:text-xl" />
          </button>
        </div>
        {/* Images */}
        <div className="relative flex w-full overflow-hidden rounded-xl pt-[56.25%]">
          {slideshowArticles.map((slide, index) => (
            <div
              key={index}
              className={`absolute left-0 top-0 h-full w-full ${
                slideAnimationClasses.initial
              } ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? slideAnimationClasses.previous
                    : slideAnimationClasses.next
              }`}
            >
              <Slide article={slide} />
            </div>
          ))}
        </div>
        {/* Bullet indicators */}
        <div className="-bottom-12 flex w-full justify-center space-x-2 py-4 sm:absolute lg:bottom-0">
          {slideshowArticles.map((_, index) => (
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
