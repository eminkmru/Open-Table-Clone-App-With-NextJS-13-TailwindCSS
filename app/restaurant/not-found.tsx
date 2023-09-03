"use client";

import errorMascot from "../../public/error.png";
import Image from "next/image";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="Error" width={200} height={200} />
      <div className="bg-white px-9 py-14 shadow-lg rounded-3xl mt-4 mx-7">
        <h3 className="text-3xl font-bold mt-3">
          Well, this is embarrassing...
        </h3>
        <p className="font-semibold text-xl">
          We couldn't find the restaurant you were looking for.
        </p>
        <p className="mt-6 text-sm font-light">Error Code: 404</p>
      </div>
    </div>
  );
}
