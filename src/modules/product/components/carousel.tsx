import { useEffect, useState } from "react";
import { ApImage } from "../../../components";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCarouselProps {
  images: Array<{ uri: string; name: string }>;
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
  autoplay?: boolean;
}

export const ProductCarousel = ({
  images,
  selectedImageIndex,
  onImageChange,
  autoplay = true,
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);

  useEffect(() => {
    setCurrentIndex(selectedImageIndex);
  }, [selectedImageIndex]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        onImageChange(nextIndex);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, autoplay, images.length, onImageChange]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {images.length > 0 ? (
            <ApImage
              src={images[currentIndex]?.uri}
              alt={images[currentIndex]?.name}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center"
            />
          ) : (
            <div className="w-full md:h-[300px] bg-primary flex justify-center items-center">
              <h1 className="text-4xl font-semibold">No Images Available</h1>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface ProductThumbnailProps {
  images: Array<{ uri: string; name: string }>;
  selectedImageIndex: number;
  onThumbnailClick: (index: number) => void;
}

export const ProductThumbnail = ({
  images,
  selectedImageIndex,
  onThumbnailClick,
}: ProductThumbnailProps) => {
  return (
    <div className="flex justify-center mt-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`cursor-pointer p-1 border-2 rounded-md ${
            selectedImageIndex === index
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => onThumbnailClick(index)}
          whileHover={{ scale: 1.1 }}
        >
          <ApImage
            src={image.uri}
            alt={image.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductThumbnail;
