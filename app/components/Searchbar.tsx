"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Searchbar = () => {
  const [location, setLocation] = useState<string>("");
  const router = useRouter();

  return (
    <div className="text-left text-lg px-5 py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          if (location === "") return;
          router.push(`/search?city=${location}`);
          setLocation("");
        }}
      >
        Let's go
      </button>
    </div>
  );
};

export default Searchbar;
