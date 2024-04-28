"use client";

import { useUser } from "@clerk/nextjs";
import React, { ChangeEvent } from "react";

type Props = {};

export default function ChangeProfileImage({}: Props) {
  const { user, isLoaded } = useUser();

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) {
      return null;
    }
    const fileInput = event.target[0] as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      //   const data = await user?.setProfileImage({ file });

      console.log(user);

      console.log("done");
    } else {
      console.log("choose a file");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" />
      <button>Change</button>
    </form>
  );
}
