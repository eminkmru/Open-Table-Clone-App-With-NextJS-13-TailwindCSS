import React from "react";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

interface RestaurantType {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white md:w-[70%] w-[100%] rounded p-3 shadow mb-9">
        <RestaurantNavbar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description desc={restaurant.description} />
        <Images images={restaurant.images} name={restaurant.name} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
