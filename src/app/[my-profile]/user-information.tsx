"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Database } from "../../../database.types";
import Image from "next/image";
import Button from "@/components/ui/button";
import { supabase } from "@/utils/supabase";
import { action } from "../action";
import { useEditProfileModal } from "@/hooks/use-modal";
import ProfileImage from "@/components/profile-image";
import { useEditProfileDataStore } from "@/components/edit-profile";

type Props = {
  data: Database["public"]["Tables"]["users"]["Insert"];
  username: string;
};

export default function UserInformation({ data, username }: Props) {
  const [userData, setUserData] = useState(data);

  const { setUser: setEditingUser } = useEditProfileDataStore();

  const { user } = useUser();

  useEffect(() => {
    setEditingUser(userData);
  }, [userData]);

  useEffect(() => {
    console.log("updated now");
    const users = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload: any) => {
          setUserData(payload.new);
        }
      )
      .subscribe();

    // revalidatePath("/", "layout");
    action();

    return () => {
      supabase.removeChannel(users);
    };
  }, [userData]);

  if (!userData) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="mx-auto max-w-xl">
        {/* name, username, avatar */}
        <div className="flex justify-between pb-4">
          <div>
            {userData.name && (
              <h2 className="text-2xl font-semibold">{userData.name}</h2>
            )}
            <h3 className="text-[15px]">{userData.username}</h3>
          </div>
          <ProfileImage
            src={userData.imageUrl || ""}
            width={84}
            height={84}
            alt={userData.username}
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>

        {userData.bio && <p className="text-[15px]">{userData.bio}</p>}

        <div className="pt-4">
          {userData.link && (
            <a
              href={userData.link}
              className="text-[15px] text-[#999999] hover:underline"
            >
              {userData.link}
            </a>
          )}
        </div>

        {/* Edit Button */}
        {user?.id === userData.user_id && <EditButton />}
      </div>
    </div>
  );
}

function EditButton() {
  const { onOpen } = useEditProfileModal();

  return (
    <Button
      variant={"secondary"}
      className="mb-3 mt-4 h-8 rounded-lg border border-input-border text-[15px] duration-200 active:scale-[0.97]"
      onClick={onOpen}
    >
      Edit Profile
    </Button>
  );
}
