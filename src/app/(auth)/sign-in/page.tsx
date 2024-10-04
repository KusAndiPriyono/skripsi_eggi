/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .refine((value) => value !== "wrong_password", {
      message: "Incorrect password",
    }),
});

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.promise(
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, values, {})
        .then((response) => {
          const { token, nama, username, role_id } = response.data.data;

          // Ensure cookies and local storage are correctly set
          document.cookie = `token=${token}; path=/;`;
          document.cookie = `role_id=${role_id}; path=/;`;

          console.log("Token and Role ID set:", token, role_id);

          localStorage.setItem("token", token);
          localStorage.setItem("nama", nama);
          localStorage.setItem("username", username);
          localStorage.setItem("role_id", role_id);
          if (role_id == 1) {
            localStorage.setItem("role", "admin");
          } else {
            localStorage.setItem("role", "user");
          }

          // Debugging: Log role_id and redirect URL
          console.log("Role ID:", role_id);

          if (role_id === 2) {
            console.log("Redirecting to /dashboard-user");
            router.refresh();
            router.push("/dashboard-user");
          } else {
            console.log("Redirecting to /dashboard");
            router.push("/dashboard");
          }

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          throw new Error("Login failed. Please try again.");
        }),
      {
        loading: "Loading...",
        success: "Login successful!",
        error: "Login failed. Please try again.",
      }
    );
  };

  return (
    <div className="min-h-screen bg-login-banner bg-cover bg-center">
      <div className="flex flex-col items-center justify-center gap-6 pt-24">
        <div>
          <img src="/logo/logo.webp" alt="logo" className="h-[25vh] w-auto" />
        </div>

        <div className="bg-white rounded-2xl flex flex-col gap-4 justify-center p-6 w-full max-w-sm">
          <h1 className="w-full text-center text-3xl font-medium">
            Log in to SSNI
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="relative">
                    <p className="font-semibold text-lg translate-y-2">
                      Username
                    </p>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder="Email address"
                          type="text"
                          {...field}
                          className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <p className="font-semibold text-lg translate-y-2">
                      Password
                    </p>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                          className="p-6 bg-[#C6DBE0] placeholder:text-xl placeholder:text-zinc-600 text-primary text-xl rounded-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4 w-full flex gap-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#C6DBE0] rounded-full text-xl text-center text-black hover:bg-[#C6DBE0]/80 font-medium"
                >
                  Login
                </button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          <p className="text-white text-xl -translate-y-4">
            Copyright © 2024 - YEPJ SIPLah Inventory Asset
          </p>
        </div>
      </div>
    </div>
  );
}
