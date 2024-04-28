import React from "react";

import { supabase } from "@/utils/supabase";
import { currentUser } from "@clerk/nextjs/server";

type Props = {};

export default async function StoringUser({}: Props) {
  const user = await currentUser();

  if (user) {
    const { error } = await supabase.from("users").upsert(
      {
        username: user.username || "",
        user_id: user.id,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
      { onConflict: "user_id" }
    );

    if (!error) {
      console.log("added");
    } else {
      console.log(error);
    }
  }

  return <></>;
}
