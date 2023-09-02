import React from "react";

import Header from "./components/Header";

import { PrismaClient, Cuisine, Location, PRICE } from "@prisma/client";
import RestaurantCard from "./components/RestaurantCard";

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  price: PRICE;
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 lg:px-36 px-0 mt-10 flex flex-wrap justify-center">
        {restaurants &&
          restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} />
          ))}
      </div>
    </main>
  );
}
