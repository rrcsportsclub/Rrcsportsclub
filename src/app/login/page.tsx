"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../GlobalRedux/store";
import { loginSuccess } from "../GlobalRedux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      emailOrMobileNo: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginSuccess(true));

      console.log(values);
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/auction");
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);

  return (
    <div className="px-[30px] py-[220px] w-screen flex items-center justify-center">
      <div className="w-[400px] flex flex-col items-center justify-center gap-4">
        <div>
          <h1 className=" text-[25px] font-semibold text-[#000000] text-center">
            LOGIN
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            className={`w-full rounded-lg mt-1 border-[1px] px-4 h-[40px] mb-4 text-gray-600`}
            value={formik.values.emailOrMobileNo}
            onChange={formik.handleChange}
            id="emailOrMobileNo"
            type="string"
            placeholder="Mobile number or email address *"
          />

          <input
            className={`w-full rounded-lg mt-1 border-[1px] px-4 h-[40px] mb-4 text-gray-600`}
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            type="string"
            placeholder="Password *"
          />

          <button
            // disabled={isSubmitting}
            type="submit"
            // onClick={handleSubmit}
            className={`rounded-lg text-center w-full py-1 bg-black text-[#FFFFFF] my-2 font-medium text-base cursor-pointer h-10 `}
          >
            Login
            {/* {isLoading ? (
              <p className="flex justify-center items-center py-1">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </p>
            ) : (
              <p>Login</p>
            )} */}
          </button>
        </form>
      </div>
    </div>
  );
}

{
  /* <div className="px-[30px] py-[220px] w-screen flex items-center justify-center">
      <div className="w-[400px] flex flex-col items-center justify-center gap-4">
        <div>
          <h1 className=" text-[25px] font-semibold text-[#000000] text-center">
            LOGIN
          </h1>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="email" className=" my-4">
            Email
          </label>
        <input
          className={`w-full rounded-lg mt-1 border-[1px] px-4 h-[40px] mb-4 text-gray-600`}
          // value={values.email}
          // onChange={handleChange}
          id="email"
          type="string"
          placeholder="Mobile number or email address *"
          // onBlur={handleBlur}
        />

        <label htmlFor="password" className=" my-4">
            Password
          </label>
        <input
          className={`w-full rounded-lg mt-1 border-[1px] px-4 h-[40px] mb-4 text-gray-600`}
          // value={values.password}
          // onChange={handleChange}
          id="password"
          type="string"
          placeholder="Password *"
          // onBlur={handleBlur}
        />

        <div className="w-full cursor-pointer flex justify-end items-center gap-9">
          <div className="flex items-center gap-2">
            <input
              className="border-0 border-[#B9B5B5] w-5 h-5 "
              type="checkbox"
            />
            <label className="text-sm text-[#959DA3]">Remember me?</label>
          </div>
          <div className="text-sm text-[#000000]">
            <p>Forgot password</p>
          </div>
        </div>

        <button
          // disabled={isSubmitting}
          type="submit"
          // onClick={handleSubmit}
          className={`rounded-lg text-center w-full py-1 bg-black text-[#FFFFFF] my-2 font-medium text-base cursor-pointer h-10 `}
        >
          Login
          {isLoading ? (
              <p className="flex justify-center items-center py-1">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </p>
            ) : (
              <p>Login</p>
            )}
        </button>
        </form>

        <div className="w-full cursor-pointer flex justify-center gap-2">
          <span className=" text-sm text-[#828282]">Not a member?</span>
          <h1 className="hover:underline hover:text-[#EC355B] text-sm">
            <Link href="/register">Register</Link>
          </h1>
        </div>
      </div>
    </div> */
}
