import { StaticImageData } from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Custom Carousel Component
interface IProps {
  images: { id: number; uri: StaticImageData; name: string }[];
  interval?: number;
}
export const Carousel: React.FC<IProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef<any>();

  // Start the autoplay
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay(); // Cleanup when the component unmounts
    };
  }, [currentIndex]);

  // Function to go to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Start the autoplay interval
  const startAutoPlay = () => {
    stopAutoPlay(); // Clear any existing intervals
    slideInterval.current = setInterval(goToNextSlide, interval);
  };

  // Stop the autoplay interval
  const stopAutoPlay = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  return (
    <div className="relative w-full h-64 lg:h-96 overflow-hidden">
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            image.id === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.uri.src}
            alt={image.name}
            className="object-cover w-full h-full"
          />
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ◀
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ▶
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
