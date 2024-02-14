import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { submitVenue } from "../auth/submitVenue";
import { Link } from "react-router-dom";

const defaultMedia = "https://source.unsplash.com/1600x900";
const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .min(3, "Your first name should be at least 3 characters.")
      .max(100, "Your first name cannot be longer than 10 characters.")
      .required("Please enter your first name"),

    description: yup
      .string()
      .trim()
      .min(3, "Your description should be at least 3 characters.")
      .max(200, "Your description cannot be longer than 200 characters.")
      .required("Please enter a description"),

    media: yup
      .array()
      .nullable()
      .transform((value, originalValue) =>
        Array.isArray(originalValue)
          ? originalValue
          : value
          ? [value]
          : [defaultMedia]
      )
      .optional(),

    price: yup.number().required("Please enter a price"),

    maxGuests: yup.number().required("How many Guests?"),

    rating: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? 0 : value))
      .max(5)
      .optional(),

    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      country: yup.string(),
      continent: yup.string(),
      // lat: yup.number().min(-90).max(90),
      // lng: yup.number().min(-180).max(180),
    }),
  })
  .required();
function CreateVenue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="my-5 card-bg size-1/2 m-auto">
      <form className="py-5" onSubmit={handleSubmit(submitVenue)}>
        <h1 className="mx-auto flex justify-center my-10">Create a venue</h1>
        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="name">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.name?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="description">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.description?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="media" className="m-auto">
            media
          </label>
          <input
            {...register("media")}
            type="url"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.media?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="price" className="m-auto">
            price
          </label>
          <input
            {...register("price")}
            type="number"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.price?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="maxGuests" className="m-auto">
            maxGuests
          </label>
          <input
            {...register("maxGuests")}
            type="number"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.maxGuests?.message}</p>
        </div>

        {/* OPTIONAL */}

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="location.address">
            Address
          </label>
          <input
            {...register("location.address")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.address?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="location.city">
            City
          </label>
          <input
            {...register("location.city")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.city?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="location.zip">
            Zip
          </label>
          <input
            {...register("location.zip")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.zip?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="location.country">
            Country
          </label>
          <input
            {...register("location.country")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.country?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label className="m-auto" htmlFor="location.continent">
            Continent
          </label>
          <input
            {...register("location.continent")}
            type="text"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.continent?.message}</p>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="rating" className="m-auto">
            Rating (max 5)
          </label>
          <input
            {...register("rating")}
            type="number"
            className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          />
          <p>{errors.rating?.message}</p>
        </div>

        {/* CheckBox */}
        <div className="flex justify-center">
          <input {...register("meta.wifi")} type="checkbox" className="" />
          <label htmlFor="checkbox" className="">
            wifi
          </label>
        </div>

        <div className="flex justify-center">
          <input {...register("meta.breakfast")} type="checkbox" className="" />
          <label htmlFor="checkbox" className="">
            breakfast
          </label>
        </div>

        <div className="flex justify-center">
          <input {...register("meta.parking")} type="checkbox" className="" />
          <label htmlFor="checkbox" className="">
            parking
          </label>
        </div>

        <div className="flex justify-center">
          <input {...register("meta.pets")} type="checkbox" className="" />
          <label htmlFor="checkbox" className="">
            pets
          </label>
        </div>

        <button type="submit" className="btn-primary m-auto my-10 flex">
          Create
        </button>
      </form>
    </div>
  );
}
export default CreateVenue;
