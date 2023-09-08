"use client";
import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";
import { AuthenticationContext } from "../../../context/AuthContext";

const Form = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const { data } = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState({
    bookerFirstName: data?.firstName ? data.firstName : "",
    bookerLastName: data?.lastName ? data.lastName : "",
    bookerPhone: data?.phone ? data.phone : "",
    bookerEmail: data?.email ? data.email : "",
    bookerOccasion: "",
    bookerRequests: "",
  });
  const [day, time] = date.split("T");
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { createReservation, error, loading } = useReservation();

  useEffect(() => {
    if (Object.values(inputs).every((input) => input !== "")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickReservationButton = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequests,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div className="flex bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-screen h-36 text-center justify-center items-center">
          <div>
            <h1 className="font-bold text-2xl">You are all booked up</h1>
            <p className="text-md">Enjoy your reservation</p>
          </div>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="bookerFirstName"
            onChange={handleChange}
            value={inputs.bookerFirstName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="bookerLastName"
            onChange={handleChange}
            value={inputs.bookerLastName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="bookerPhone"
            onChange={handleChange}
            value={inputs.bookerPhone}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerEmail"
            onChange={handleChange}
            value={inputs.bookerEmail}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            onChange={handleChange}
            value={inputs.bookerOccasion}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerRequests"
            onChange={handleChange}
            value={inputs.bookerRequests}
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClickReservationButton}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
