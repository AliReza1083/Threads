"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";

type Props = {};

export default function Profile({}: Props) {
  const { signOut } = useClerk();

  return (
    <div className="mt-24">
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
