"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotatingLines } from "react-loader-spinner";
import { useSignUp } from "@clerk/nextjs";
import { OTPInput, SlotProps } from "input-otp";

import Logo from "@/assets/Logo";
import Button from "@/components/ui/button";
import { inputVariants } from "@/components/ui/input";
import { ErrorMessageInput } from "@/components/error-message";
import Link from "next/link";
import Icon from "@/assets/Icon";
import { useState } from "react";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

const schema = z
  .object({
    username: z.string().min(3, "Add username"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(data.username), {
    message:
      "Username must contain only lowercase letters, digits, hyphens, or dots, with dots and hyphens placed between letters",
    path: ["username"],
  });

type formSchema = z.infer<typeof schema>;

export default function Home() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [pendingVerification, setPendingVerification] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);
  const [errorOtp, setErrorOtp] = useState<string | null>(null);

  const [otpLoading, setOtpLoading] = useState(false);

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
      // throw new Error("asldjf");

      await signUp.create({
        username: data.username,
        emailAddress: data.email,
        password: data.password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.log(err.errors);

      if (err.status === 422) {
        return setError("email", { message: err.errors[0].longMessage });
      }

      setError("root", { message: err.errors[0].message });
    }
  };

  const otpSubmitHandler = async () => {
    if (!isLoaded || !otp) {
      return;
    }

    setOtpLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setOtpLoading(false);

        router.push("/");
      }
    } catch (err: any) {
      console.log(err.errors);
      setErrorOtp(err.errors[0].longMessage);
      setOtpLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      {/* Top Image */}
      <Image
        src={"/auth-top.webp"}
        width={1000}
        height={400}
        alt="top-auth-image"
        className="absolute left-0 top-0 -z-50 hidden w-full md:block"
      />
      {/* Forms */}
      {!pendingVerification && (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-[370px] flex-col items-center justify-center px-4 md:max-w-[400px]"
          >
            <Logo className="md:hidden" />
            <h2 className="mb-4 mt-6 font-bold">Sign up</h2>
            <input
              {...register("username")}
              className={inputVariants({ variant: "auth" })}
              placeholder="Username"
            />
            <ErrorMessageInput error={errors.username} />

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
                "Sign up"
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
            <p className="absolute bg-background px-4 text-[15px] text-muted">
              or
            </p>
            <hr className="w-full border-[0.5px] border-input-background" />
          </div>

          {/* Google */}
          <button className="grid h-[87px] w-full max-w-[370px] grid-cols-6 items-center justify-between rounded-2xl border border-input-background pl-5 pr-3 duration-100 active:scale-[.99]">
            {/* Google */}
            <Icon name="google" className="h-[45px] w-[45px]" />
            <p className="col-span-4">Continue with Google</p>
            <div className="flex justify-end">
              <Icon
                name="thin-arrow"
                className="w-3 text-[rgba(119,119,119)]"
              />
            </div>
          </button>
        </>
      )}

      {pendingVerification && (
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="mb-4 mt-6 font-bold">
            Email was sent, Please verify it.
          </h2>
          <div className="relative flex flex-col items-center justify-center">
            <OTPInput
              onComplete={otpSubmitHandler}
              value={otp || ""}
              onChange={setOtp}
              maxLength={6}
              containerClassName="group flex items-center has-[:disabled]:opacity-30"
              render={({ slots }) => (
                <>
                  <div className="flex">
                    {slots.slice(0, 3).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>

                  <FakeDash />

                  <div className="flex">
                    {slots.slice(3).map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                </>
              )}
            />
            {otpLoading && (
              <div className="absolute -right-12 flex flex-col items-center justify-center gap-8">
                <RotatingLines
                  visible={true}
                  // @ts-ignore
                  height="32"
                  width="32"
                  strokeWidth="3"
                  strokeColor="currentColor"
                  animationDuration="0.75"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
            {errorOtp && <p className="mt-4 text-sm opacity-60">{errorOtp}</p>}
          </div>
        </div>
      )}

      {/* Footer */}
    </main>
  );
}

// Feel free to copy. Uses @shadcn/ui tailwind colors.
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative h-14 w-10 text-[2rem]",
        "flex items-center justify-center",
        "transition-all duration-300",
        "border-border border-y border-r first:rounded-l-md first:border-l last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline-accent-foreground/20 outline outline-0",
        { "outline-accent-foreground outline-4": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="h-8 w-px bg-white" />
    </div>
  );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className="flex w-10 items-center justify-center">
      <div className="bg-border h-1 w-3 rounded-full" />
    </div>
  );
}
