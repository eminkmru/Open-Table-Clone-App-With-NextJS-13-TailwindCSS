import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { calculateReviewRatingAverage } from "../../../utils/calculateReviewRatingAverage";
import Price from "../../components/Price";
import Stars from "../../components/Stars";
interface RestaurantCardProps {
  restaurant: {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[];
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);
    if (rating > 4) return "Awesome";
    else if (rating > 3) return "Great";
    else if (rating > 2) return "Good";
    else if (rating > 1) return "Okay";
  };
  return (
    <div className="border-b flex pb-5">
      <img
        src={restaurant.main_image}
        alt={restaurant.name}
        className="w-44 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl"> {restaurant.name} </h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
