"use client";

import Icon from "@/assets/Icon";
import Logo from "@/assets/Logo";
import { ErrorMessageInput } from "@/components/error-message";
import Button from "@/components/ui/button";
import { inputVariants } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { z } from "zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type formSchema = z.infer<typeof schema>;

export default function SignIn({}: Props) {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: formSchema) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the sign-in hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      const messages = err.errors[0].longMessage;
      console.error("error", err.errors[0].longMessage);

      if (messages.includes("Password is incorrect")) {
        return setError("password", { message: messages });
      } else if (messages.includes("Couldn't find your account")) {
        return setError("email", { message: messages });
      }

      setError("root", { message: messages });
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <Image
        src={"/auth-top.webp"}
        width={1000}
        height={400}
        alt="top-auth-image"
        className="absolute left-0 top-0 -z-50 hidden w-full md:block"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[370px] flex-col items-center justify-center px-4"
      >
        <Logo className="md:hidden" />
        <h2 className="mb-4 mt-6 font-bold">
          Sign in with your Instagram account
        </h2>
        <input
          {...register("email")}
          className={inputVariants({ variant: "auth" })}
          placeholder="Email"
        />
        <ErrorMessageInput error={errors.email} />
        <input
          type="password"
          {...register("password")}
          className={inputVariants({ variant: "auth" })}
          placeholder="Password"
        />
        <ErrorMessageInput error={errors.password} />
        <Button className="flex h-[56px] items-center justify-center">
          {isSubmitting ? (
            <RotatingLines
              visible={true}
              // @ts-ignore
              height="20"
              width="20"
              strokeWidth="3"
              strokeColor="currentColor"
              animationDuration="0.75"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Log in"
          )}
        </Button>
        {/* @ts-ignore */}
        <ErrorMessageInput error={errors.root} />
      </form>

      <Link
        href={"#"}
        className="mt-4 rounded p-1 text-[15px] text-muted active:text-opacity-80"
      >
        Forgot password
      </Link>

      <div className="my-6 flex h-12 w-full max-w-[370px] items-center justify-center">
        <p className="absolute bg-background px-4 text-[15px] text-muted">or</p>
        <hr className="w-full border-[0.5px] border-input-background" />
      </div>

      {/* Google */}
      <button className="grid h-[87px] w-full max-w-[370px] grid-cols-6 items-center justify-between rounded-2xl border border-input-background pl-5 pr-3 duration-100 active:scale-[.99]">
        {/* Google */}
        <Icon name="google" className="h-[45px] w-[45px]" />
        <p className="col-span-4">Continue with Google</p>
        <div className="flex justify-end">
          <Icon name="thin-arrow" className="w-3 text-[rgba(119,119,119)]" />
        </div>
      </button>
    </div>
  );
}
