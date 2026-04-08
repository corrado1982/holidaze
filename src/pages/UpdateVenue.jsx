import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { submitModifiedVenue } from "../auth/submitModifiedVenue";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../constants/api";

const updateVenueSchema = yup.object({
  name: yup.string().trim().min(3).required(),
  description: yup.string().trim().required(),
  media: yup.string().url("Please enter a valid URL").nullable(),
  price: yup.number().min(1).required(),
  maxGuests: yup.number().min(1).required(),
  rating: yup.number().min(0).max(5).default(0),
  meta: yup.object({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object({
    address: yup.string().nullable(),
    city: yup.string().nullable(),
    zip: yup.string().nullable(),
    country: yup.string().nullable(),
    continent: yup.string().nullable(),
  }),
});

function UpdateVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updateVenueSchema),
  });

  const url = `${BASE_URL}/holidaze/venues/${id}`;

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setVenue(json.data);
          // Pre-compila il form con i dati esistenti
          reset({
            ...json.data,
            // Estraiamo solo l'URL dalla prima immagine per l'input
            media: json.data.media?.[0]?.url || "",
          });
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id, reset, url]);

  const onSubmit = (data) => {
    // Trasformiamo i dati nel formato v2 prima di inviarli
    const formattedData = {
      ...data,
      media: data.media ? [{ url: data.media, alt: data.name }] : [],
      price: Number(data.price),
      maxGuests: Number(data.maxGuests),
    };
    submitModifiedVenue(id, formattedData);
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-10 text-red-600">Error loading venue.</div>
    );

  return (
    <div className="bg-sky-50 min-h-screen p-5">
      <div className="flex gap-4 mb-4">
        <Link className="text-blue-800 underline" to="/myvenue">
          My venues
        </Link>
        <Link
          className="text-blue-800 underline"
          to={`/myvenue/myvenuedetail/${id}`}
        >
          Back to detail
        </Link>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">Modify Venue</h1>

          <div>
            <label className="block font-semibold">Name</label>
            <input
              {...register("name")}
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              {...register("description")}
              className="w-full border p-2 rounded"
              rows="4"
            />
            <p className="text-red-500 text-sm">
              {errors.description?.message}
            </p>
          </div>

          <div>
            <label className="block font-semibold">Image URL (Media)</label>
            <input
              {...register("media")}
              className="w-full border p-2 rounded"
              placeholder="https://..."
            />
            <p className="text-red-500 text-sm">{errors.media?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                {...register("price")}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Max Guests</label>
              <input
                type="number"
                {...register("maxGuests")}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold mb-2">Location</h3>
            <div className="grid grid-cols-1 gap-2">
              <input
                {...register("location.address")}
                placeholder="Address"
                className="border p-2 rounded"
              />
              <input
                {...register("location.city")}
                placeholder="City"
                className="border p-2 rounded"
              />
              <input
                {...register("location.country")}
                placeholder="Country"
                className="border p-2 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-800 mt-6"
          >
            Update Venue
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateVenue;
