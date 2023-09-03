import React from "react";

export default function loading() {
  return (
    <div>
      <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
        <div className="text-left text-lg px-5 py-3 m-auto flex justify-center">
          <input
            className="rounded  mr-3 p-2 w-[450px]"
            type="text"
            placeholder="State, city or town"
          />
          <button className="rounded bg-red-600 px-9 py-2 text-white">
            Let's go
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <div className="w-1/5">
            <div className="border-b pb-4 flex flex-col">
              <h1 className="mb-2">Region</h1>
              <div className="font-light text-reg">
                <div
                  className="
              bg-slate-200 w-[100px] h-16 rounded
              animate-pulse
              "
                ></div>
              </div>
            </div>
            <div className="border-b pb-4 mt-3 flex flex-col">
              <h1 className="mb-2">Cuisine</h1>
              <div className="font-light text-reg">
                <div
                  className="
                bg-slate-200 w-[100px] h-16 rounded
                animate-pulse
                "
                ></div>
              </div>
            </div>
            <div className="mt-3 pb-4">
              <h1 className="mb-2">Price</h1>
              <div className="flex">
                <div>
                  <div
                    className="
                  bg-slate-200 w-[100px] h-16 rounded
                  animate-pulse
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
