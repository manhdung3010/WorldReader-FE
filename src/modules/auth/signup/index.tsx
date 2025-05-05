"use client";

import React, { useState } from "react";
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
import { register, registerGoogle } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Spinner from "@/shared/Spinner";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  fullName: Yup.string().required("Full name is required"),
});

const PageSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (data: any) => register(data),
    onSuccess: (response: any) => {
      if (!response.data) {
        toast.error(response.message || "Registration failed");
        return;
      }

      toast.success("Account created successfully! Please login.");
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      toast.error(errorMessage);
    },
  });

  // Google signup handler
  const googleRegisterMutation = useMutation({
    mutationFn: (googleData: any) => registerGoogle(googleData),
    onSuccess: (response: any) => {
      if (!response.data) {
        toast.error(response.message || "Google registration failed");
        return;
      }

      toast.success("Account created with Google successfully! Please login.");
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Google registration failed";
      toast.error(errorMessage);
    },
  });

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);

      // Decode the credential to get user info
      const decodedUser: any = jwtDecode(credentialResponse.credential);

      // Prepare Google profile data for backend
      const googleProfile = {
        googleId: decodedUser.sub,
        email: decodedUser.email,
        displayName: decodedUser.name,
        photo: decodedUser.picture,
        username: decodedUser.email.split("@")[0],
      };

      // Call backend
      await googleRegisterMutation.mutateAsync(googleProfile);
    } catch (error) {
      console.error("Google registration error:", error);
      toast.error("Failed to register with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await registerMutation.mutateAsync(data);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        Signup
      </h2>
      <div className="max-w-md mx-auto space-y-6">
        <div className="grid gap-3">
          <GoogleOAuthProvider clientId="123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.error("Google registration error:");
                toast.error("Failed to register with Google");
              }}
              theme="filled_blue"
              shape="rectangular"
              width="100%"
              text="signup_with"
              logo_alignment="center"
            />
          </GoogleOAuthProvider>
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
              Username
            </span>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-1"
                  placeholder="johndoe"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </label>

          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Full Name
            </span>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-1"
                  placeholder="John Doe"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </label>

          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="email"
                  {...field}
                  className="mt-1"
                  placeholder="example@example.com"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </label>

          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
            </span>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  className="mt-1"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </label>

          <ButtonPrimary type="submit">
            {isLoading ? <Spinner /> : "Create Account"}
          </ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
          <Link className="text-green-600" href="/login">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageSignUp;
