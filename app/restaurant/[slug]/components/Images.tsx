import React from "react";

interface ImagesType {
  images: string[];
  name: string;
}

const Images = ({ images, name }: ImagesType) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length > 1 ? (
          <span>{images.length} Photos</span>
        ) : (
          <span>{images.length} Photo</span>
        )}
      </h1>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <img
            key={index}
            className="w-56 h-44 mr-1 mb-1"
            src={image}
            alt={`${name} image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
