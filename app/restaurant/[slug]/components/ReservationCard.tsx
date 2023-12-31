"use client";

import React, { useState } from "react";
import { partySize as partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { convertToDisplayTime } from "../../../../utils/convertToDisplayTime";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selecetedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>(openTime);
  const [partySize, setPartySize] = useState<string>("2");
  const [day, setDay] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { data, error, fetchAvailabilities, loading } = useAvailabilities();

  console.log({ data });

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const day = date.toISOString().split("T")[0];
      setDay(day);
      return setSelectedDate(date);
    } else {
      return setSelectedDate(null);
    }
  };

  const fitlerTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  const handeClickFindATime = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  return (
    <div className="md:fixed w-[15%] bg-white rounded p-3 shadow min-w-[200px] top-80">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selecetedDate}
            onChange={handleChangeDate}
            className="py-3 border-b font-light text-reg w-[5.4rem]"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {fitlerTimeByRestaurantOpenWindow().map((time, index) => (
              <option value={time.time} key={index}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={handeClickFindATime}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Find a Table"
          )}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3 text-center">
                  <p className="text-sm font-bold">
                    {" "}
                    {convertToDisplayTime(time.time)}
                  </p>
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
