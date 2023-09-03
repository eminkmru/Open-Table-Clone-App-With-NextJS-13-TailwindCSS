import React from "react";
import fullStar from "../../public/full-star.png";
import halfStar from "../../public/half-star.png";
import emptyStar from "../../public/empty-star.png";

import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utils/calculateReviewRatingAverage";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const reviewRating = rating || calculateReviewRatingAverage(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= reviewRating) {
        stars.push(fullStar);
      } else if (i - reviewRating === 0.5) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }

    return stars.map((star, index) => (
      <Image
        key={index}
        src={star}
        alt=""
        className="w-4 h-4 mr-1 object-contain"
      />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
};

export default Stars;
