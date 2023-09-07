"use client";
import { galleryImages, slides } from "@constants/constants";
import Image from "next/image";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(
    galleryImages.map(() => false)
  );

  return (
    <div className="w-full">
      <div className="grid flex-wrap h-full grid-cols-3 gap-4 px-32 py-12 lg:px-16 md:px-8 md:grid-cols-2">
        {galleryImages.map((image, index) => {
          return (
            <div
              key={index}
              className="relative w-full aspect-[4_/_3] shadow-card select-none transition-all duration-300 ease-in-out cursor-pointer group hover:transform hover:scale-105"
              onClick={() => {
                setOpen(true);
                setImageIndex(index);
              }}
            >
              <Image
                src={image}
                alt="Gallery Image"
                fill
                onLoad={() => {
                  let arr = [...isImageLoaded];
                  arr[index] = true;
                  setIsImageLoaded(arr);
                  console.log(image, "loaded")
                }}
              />
              <div className="absolute w-full h-full bg-black/0 transition-all duration-300 group-hover:bg-black/70"></div>
              {isImageLoaded[index] || (
                <div className="absolute flex items-center justify-center w-full h-full text-white bg-black/60">
                  <div className="animate-pulse">Loading ...</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Lightbox
        open={open}
        index={imageIndex}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        slides={slides}
      />
    </div>
  );
};

export default Gallery;
