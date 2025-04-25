"use client";

import React, { FC, useState } from "react";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Spinner from "@/shared/Spinner";
import { useAuth } from "@/contexts/AuthContext";

const loginSocials = [
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (data: any) => login(data),
    onSuccess: (response: any) => {
      if (!response.data) {
        toast.error(response.message || "Login failed");
        return;
      }

      console.log(response.data);

      authLogin(response.data.accessToken, { ...response.data });

      toast.success("Logged in successfully!");
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await loginMutation.mutateAsync(data);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        Login
      </h2>
      <div className="max-w-md mx-auto space-y-6">
        <div className="grid gap-3">
          {loginSocials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <Image
                className="flex-shrink-0"
                src={item.icon}
                alt={item.name}
                sizes="40px"
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                {item.name}
              </h3>
            </a>
          ))}
        </div>
        {/* OR */}
        <div className="relative text-center">
          <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
            OR
          </span>
          <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
        </div>
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Username or Email
            </span>

            <Controller
              name="identifier"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  autoFocus
                  {...field}
                  className="mt-1"
                  placeholder="example@example.com"
                  error={!!errors.identifier}
                  helperText={errors.identifier?.message}
                />
              )}
            />
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              <Link href="/forgot-pass" className="text-sm text-green-600">
                Forgot password?
              </Link>
            </span>

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  className="mt-1"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </label>
          <ButtonPrimary type="submit">
            {isLoading ? <Spinner /> : "Continue"}
          </ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <Link className="text-green-600" href="/signup">
            Create an account
          </Link>
        </span>
      </div>
    </div>
  );
}
