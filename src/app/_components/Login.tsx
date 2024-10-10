"use client";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../GlobalRedux/features/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RootState } from "../GlobalRedux/store";
import { useFormik } from "formik";
import Link from "next/link";

export default function Login() {
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
    <div>
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
