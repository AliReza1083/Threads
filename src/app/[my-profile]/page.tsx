import React from "react";

import { notFound } from "next/navigation";
import UserInformation from "./user-information";
import { supabase } from "@/utils/supabase";

export const revalidate = 1;

type Props = {
  params: { "my-profile": string };
};

export default async function MyProfile({ params }: Props) {
  if (params["my-profile"].includes("%40")) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", params["my-profile"].replace("%40", ""))
      .single();

    if (error?.details === "The result contains 0 rows") {
      console.log(error);
      return (
        <div className="mx-auto mt-20 max-w-xl">
          <h3>There is no user with this username</h3>
        </div>
      );
    } else if (error) {
      return <div className="mx-auto mt-20 max-w-xl">Something went wrong</div>;
    }

    return (
      <div className="mt-20">
        <UserInformation
          data={data}
          username={params["my-profile"].replace("%40", "")}
        />
      </div>
    );
  }

  return notFound();
}
