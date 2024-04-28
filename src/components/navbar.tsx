"use client";

import React, { useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

import Logo from "@/assets/Logo";
import Link from "next/link";
import { buttonVariant } from "./ui/button";
import Icon from "@/assets/Icon";
import { usePathname } from "next/navigation";
import DropdownList from "./dropdown-list";
import { RotatingLines } from "react-loader-spinner";
import { useTheme } from "next-themes";

type Props = {};

export default function Navbar({}: Props) {
  const { isSignedIn, user } = useUser();

  const pathname = usePathname();

  const showArrow = pathname === "/settings";

  return (
    !["/sign-up", "/sign-in"].includes(pathname) && (
      <nav className="fixed left-0 top-0 z-50 h-[76px] w-full bg-background px-4">
        <div className="mx-auto flex h-full max-w-container items-center justify-between">
          <div>
            <Link href={"/"} className="expand-hover inline-block">
              <Logo className="h-8 w-8" />
            </Link>
          </div>
          <div className="relative flex h-[66px] w-full max-w-xl items-center justify-center">
            <AnimatePresence>
              {showArrow && (
                <motion.button
                  initial={{ x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ duration: 0.2, type: "tween" }}
                  className={`group absolute left-0 flex h-[52px] w-[52px] items-center justify-center text-icon-muted`}
                  onClick={() => history.back()}
                >
                  <div className="absolute inset-0 scale-0 rounded-2xl bg-black/10 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10" />
                  <Icon name="arrow-long" className="w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ width: showArrow ? 66 : 96 }}
              animate={{ width: showArrow ? 66 : 96 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="h-full"
            >
              <Link
                href={"/"}
                className={`button-shrink group relative flex h-full w-full items-center justify-center bg-transparent transition-transform ${pathname === "/" ? "text-black dark:text-white" : "!text-icon-muted"}`}
              >
                <div className="absolute inset-0 scale-0 rounded-2xl bg-black/10 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10" />
                {pathname === "/" ? (
                  <Icon name="home-fill" className="w-6" />
                ) : (
                  <Icon name="home-outline" className="w-6" />
                )}
              </Link>
            </motion.div>
            <motion.div
              initial={{ width: showArrow ? 66 : 96 }}
              animate={{ width: showArrow ? 66 : 96 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="h-full"
            >
              <Link
                href={"/search"}
                className={`button-shrink group relative flex h-full w-full items-center justify-center bg-transparent transition-transform ${pathname === "/search" ? "text-black dark:text-white" : "!text-icon-muted"}`}
              >
                <div className="absolute inset-0 scale-0 rounded-2xl bg-black/10 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10" />
                <Icon name="search" className="w-6" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ width: showArrow ? 66 : 96 }}
              animate={{ width: showArrow ? 66 : 96 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="h-full"
            >
              <button
                className={`button-shrink group relative flex h-full w-full items-center justify-center text-icon-muted transition-transform`}
              >
                <div className="absolute inset-0 scale-0 rounded-2xl bg-black/10 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10" />
                <Icon name="add-thread" className="w-6" />
              </button>
            </motion.div>

            <motion.div
              initial={{ width: showArrow ? 66 : 96 }}
              animate={{ width: showArrow ? 66 : 96 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="h-full"
            >
              <Link
                href={"/activity"}
                className={`button-shrink group relative flex h-full w-full items-center justify-center bg-transparent transition-transform ${pathname === "/activity" ? "text-black dark:text-white" : "!text-icon-muted"}`}
              >
                <div className="absolute inset-0 scale-0 rounded-2xl bg-black/10 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10" />
                {pathname === "/activity" ? (
                  <Icon name="heart-fill" className="w-6" />
                ) : (
                  <Icon name="heart-outline" className="w-6" />
                )}
              </Link>
            </motion.div>

            <motion.div
              initial={{ width: showArrow ? 66 : 96 }}
              animate={{ width: showArrow ? 66 : 96 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="h-full"
            >
              <Link
                href={`/@${user?.username}`}
                className={`button-shrink group relative flex h-full w-full items-center justify-center bg-transparent transition-transform ${pathname === `/@${user?.username}` ? "text-black dark:text-white" : "!text-icon-muted"}`}
              >
                <div className="absolute inset-0 scale-0 rounded-2xl bg-black/10 opacity-0 duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-white/10" />
                {pathname === `/@${user?.username}` ? (
                  <Icon name="profile-fill" className="w-6" />
                ) : (
                  <Icon name="profile-outline" className="w-6" />
                )}
              </Link>
            </motion.div>
          </div>
          <div className="flex justify-end">
            {isSignedIn ? (
              <Menu />
            ) : (
              <Link
                href={"/sign-in"}
                className={buttonVariant({
                  className:
                    "button-shrink !w-[75px] rounded-md py-1 text-center",
                })}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    )
  );
}

const links = {
  "/settings": {
    name: "Settings",
  },
  "/saved": {
    name: "Saved",
  },
  "/liked": {
    name: "Your likes",
  },
};

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [appearance, setAppearance] = useState(false);

  const [ref, { height }] = useMeasure();

  return (
    <div className="relative">
      <button
        className={`button-shrink flex h-12 w-12 items-center justify-center hover:text-black dark:hover:text-white ${isOpen ? "text-black dark:text-white" : "text-icon-muted"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="ham-menu" className="w-6" />
      </button>
      <DropdownList
        isOpen={isOpen}
        onCloseHandler={() => {
          setIsOpen(false);
          setAppearance(false);
        }}
        className="right-0 w-auto"
        originX="right"
      >
        <motion.div
          initial={{ width: 174 }}
          animate={{
            width: appearance ? 320 : 174,
            height: height > 0 ? height : undefined,
          }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          className="rounded-xl border border-box-border"
        >
          <div
            ref={ref}
            className="divide-y-[1px] divide-box-border border-box-border"
          >
            {!appearance ? (
              <React.Fragment key={"buttons"}>
                <button
                  className="flex w-full items-center rounded-t-xl p-4 text-[15px] leading-5 active:bg-black/5 dark:active:bg-black"
                  onClick={() => setAppearance(!appearance)}
                >
                  <p>Appearance</p>
                </button>
                {Object.entries(links).map(([path, { name }], index) => (
                  <Link
                    key={index}
                    href={path}
                    className="flex items-center p-4 text-[15px] leading-5 active:bg-black/5 dark:active:bg-black"
                    onClick={() => setIsOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
                <Logout />
              </React.Fragment>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                key={"appearance"}
                className="p-4 pt-2"
              >
                <div className="flex h-12 items-center justify-center py-4">
                  <button
                    className="button-opacity absolute left-0 flex h-12 w-12 items-center justify-center"
                    onClick={() => setAppearance(!appearance)}
                  >
                    <Icon name="arrow-long" className="w-4" />
                  </button>
                  <p>Appearance</p>
                </div>

                <ThemeButton />
              </motion.div>
            )}
          </div>
        </motion.div>
      </DropdownList>
    </div>
  );
}

const themes = ["light", "dark", "system"];

function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="mt-2 grid h-11 grid-cols-3 rounded-xl bg-black/5 dark:bg-background"
      style={{ flex: "0 0 auto" }}
    >
      {themes.map((value) => (
        <button
          key={value}
          className="relative flex items-center justify-center"
          onClick={() => setTheme(value)}
        >
          {value === "light" ? (
            <Icon name="sun" className="w-4" />
          ) : value === "dark" ? (
            <Icon name="moon" className="w-4" />
          ) : (
            "Auto"
          )}

          {theme === value && (
            <motion.div
              layoutId="theme-buttons"
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-xl border border-box-border bg-black/5 dark:bg-white/5"
            />
          )}
        </button>
      ))}
    </div>
  );
}

function Logout() {
  const [isLoading, setIsLoading] = useState(false);

  const { signOut } = useClerk();

  const onClickHandler = async () => {
    setIsLoading(true);
    await signOut();
  };

  return (
    <button
      className="flex w-full items-center justify-between  rounded-b-xl p-4 text-[15px] leading-5  active:bg-black/5 disabled:cursor-not-allowed disabled:opacity-15 dark:active:bg-black"
      disabled={isLoading}
      onClick={onClickHandler}
    >
      Log out
      {isLoading && (
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
      )}
    </button>
  );
}
