import { PRICE } from "@prisma/client";
import React from "react";

const Price = ({ price }: { price: PRICE }) => {
  const renderPrice = () => {
    if (price === PRICE.CHEAP)
      return (
        <>
          <span className="font-medium">$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    if (price === PRICE.REGULAR) {
      return (
        <>
          <span className="font-medium">$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );
    }
    if (price === PRICE.EXPENSIVE) {
      return (
        <>
          <span className="font-medium">$$$$</span>
        </>
      );
    }
  };
  return <p className="flex mr-3">{renderPrice()}</p>;
};

export default Price;
