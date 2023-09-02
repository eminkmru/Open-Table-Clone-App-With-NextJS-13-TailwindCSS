import { Items } from "@prisma/client";
import React from "react";
import MenuCard from "./MenuCard";

const Menu = ({ menu }: { menu: Items[] }) => {
  console.log(menu);
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.length > 0 ? (
            menu.map((item) => <MenuCard key={item.id} item={item} />)
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <h1 className="text-4xl">No items in menu</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Menu;
