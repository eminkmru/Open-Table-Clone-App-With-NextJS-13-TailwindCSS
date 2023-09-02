import { PrismaClient } from "@prisma/client";
import React from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

const prisma = new PrismaClient();

const fetchRestaurantsByCity = async (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  if (!city) return prisma.restaurant.findMany({ select });

  return await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};

const Seach = async ({ searchParams }: { searchParams: { city: string } }) => {
  debugger;
  const restaurants = await fetchRestaurantsByCity(searchParams.city);

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          {restaurants.length > 0 ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
          ) : (
            <p>No restaurants found in {searchParams.city}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Seach;
