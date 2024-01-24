import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BASE_URL } from "../constants/api";
import { REGISTER_URL } from "../constants/api";
// import { object, string, number, date, InferType } from "yup";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Your first name should be at least 3 characters.")
      .max(10, "Your first name cannot be longer than 10 characters.")
      .required("Please enter your first name"),

    email: yup
      .string()
      .email()
      .required("Please enter your email!")
      .matches(/(stud.noroff.no)/),

    avatar: yup.string().url().typeError("Please use an URL"),

    password: yup
      .string()
      .min(4, "Your password must be more then 4 character")
      .max(100, "Your password must be 100 or lower")
      .required("Please enter a password"),
  })
  .required();

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    event.preventDefault();
    console.log(data);
    const response = await fetch(BASE_URL + REGISTER_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(response);
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input {...register("name")} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register("email")} type="email" />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="avatar">Avatar Url</label>
          <input {...register("avatar")} type="url" />
          <p>{errors.avatar?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} type="password" />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <input {...register("venueManager")} type="checkbox" />
          <label htmlFor="checkbox">Register as a manager</label>
        </div>
        {/* <button type="submit" placeholder="Register" /> */}
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default RegisterPage;
