"use client";

import React, { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { useEditProfileModal } from "@/hooks/use-modal";
import { useUser } from "@clerk/nextjs";
import ProfileImage from "../profile-image";
import DropdownList from "../dropdown-list";
import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { RotatingLines } from "react-loader-spinner";
import Button from "../ui/button";
import Name from "./name";
import PageNavControl from "../page-nav-control";
import { Database } from "../../../database.types";
import Bio from "./bio";
import Link from "./link";
import { useParams } from "next/navigation";

type Props = {};

export default function EditProfile({}: Props) {
  const [currentPanel, setCurrentPanel] = useState<
    null | "name" | "bio" | "link"
  >(null);

  const { isOpen, onClose } = useEditProfileModal();
  const { data: supabaseUser } = useEditProfileDataStore();

  console.log("rendering");

  return (
    isOpen && (
      <>
        <div className="fixed left-0 top-0 isolate z-50 flex h-full w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 -z-10 bg-black/70"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "var(--y-from)", opacity: "var(--opacity-from)" }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
            className="flex h-full w-full items-center justify-center bg-[#f7f7f7] px-4 max-md:[--y-from:100%] md:h-auto md:max-w-lg md:bg-transparent md:bg-white md:px-0 md:[--opacity-from:0]"
          >
            <PageNavControl
              title="Edit Profile"
              leftElement={
                <button
                  onClick={onClose}
                  className="absolute left-4 text-[17px] font-light"
                >
                  Cancel
                </button>
              }
              rightElement={<DoneButton />}
            />

            <div className="w-full space-y-4 rounded-2xl border-[1px] border-box-border bg-white p-6">
              <div className="flex items-center gap-4">
                <button
                  className="grow border-b border-box-border text-start text-[15px]"
                  onClick={() => setCurrentPanel("name")}
                >
                  <p className="font-medium">Name</p>
                  <p className="mb-3 font-light">
                    {supabaseUser.user?.name} ({supabaseUser.user?.username})
                  </p>
                </button>
                <UploadImage />
              </div>
              <button
                className="w-full border-b border-box-border text-start text-[15px]"
                onClick={() => setCurrentPanel("bio")}
              >
                <p className="font-medium">Bio</p>
                <p className="mb-3 line-clamp-4 font-light">
                  {supabaseUser.user?.bio}
                </p>
              </button>
              <button
                className="w-full border-b border-box-border text-start text-[15px]"
                onClick={() => setCurrentPanel("link")}
              >
                <p className="font-medium">Link</p>
                <p className="mb-3 line-clamp-4 font-light text-blue">
                  {supabaseUser.user?.link}
                </p>
              </button>

              <DoneButtonDesktop />
            </div>
          </motion.div>
        </div>

        {currentPanel === "name" ? (
          <Name onClose={() => setCurrentPanel(null)} />
        ) : currentPanel === "bio" ? (
          <Bio onClose={() => setCurrentPanel(null)} />
        ) : currentPanel === "link" ? (
          <Link onClose={() => setCurrentPanel(null)} />
        ) : null}
      </>
    )
  );
}

function DoneButton() {
  const { data: editProfileData } = useEditProfileDataStore();
  const { onClose } = useEditProfileModal();
  const { user, isLoaded } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const onDoneHandler = async () => {
    setIsLoading(true);

    if (!isLoaded) {
      return null;
    }

    try {
      if (editProfileData.file && user) {
        const data = await user.setProfileImage({
          file: editProfileData.file.file,
        });

        await supabase
          .from("users")
          .update({ imageUrl: data?.publicUrl })
          .eq("user_id", user.id);
      }

      console.log("No file");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <button
      className="absolute right-4 text-[17px] font-light text-blue"
      onClick={onDoneHandler}
    >
      {isLoading ? (
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
        "Done"
      )}
    </button>
  );
}

function DoneButtonDesktop({}) {
  const { data: editProfileData } = useEditProfileDataStore();
  const { onClose } = useEditProfileModal();
  const { user, isLoaded } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const params: { "my-profile": string } = useParams();

  const onDoneHandler = async () => {
    setIsLoading(true);

    if (!isLoaded) {
      return null;
    }

    try {
      if (user) {
        if (editProfileData.file) {
          const data = await user.setProfileImage({
            file: editProfileData.file.file,
          });

          await supabase
            .from("users")
            .update({ imageUrl: data?.publicUrl })
            .eq("user_id", user.id);
        }

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("username", params["my-profile"].replace("%40", ""))
          .single();

        if (JSON.stringify(data) !== JSON.stringify(editProfileData.user)) {
          const { data, error } = await supabase
            .from("users")
            .update({
              bio: editProfileData.user?.bio,
              name: editProfileData.user?.name,
              link: editProfileData.user?.link,
            })
            .eq("user_id", user.id);

          if (error) {
            console.log(error);
          } else {
            onClose();
          }
        }

        console.log("No file");
      }

      console.log("no user");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="hidden h-[52px] items-center justify-center text-[15px] active:scale-[0.97] md:flex"
      onClick={onDoneHandler}
    >
      {isLoading ? (
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
        "Done"
      )}
    </Button>
  );
}

function UploadImage() {
  const { user } = useUser();

  const [showDropdown, setShowDropdown] = useState(false);

  const { uploadImage, data } = useEditProfileDataStore();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    uploadImage({
      // @ts-ignore
      url: URL.createObjectURL(event.target.files[0]),
      // @ts-ignore
      file: event.target.files[0],
    });
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(true)} className="button-shrink">
        <ProfileImage
          src={data.file ? data.file.url : user?.imageUrl || ""}
          width={52}
          height={52}
          className="h-[52px] w-[52px] object-cover"
          alt=""
        />
      </button>
      <DropdownList
        isOpen={showDropdown}
        onCloseHandler={() => setShowDropdown(false)}
        className="right-0 w-56 border border-box-border bg-[rgb(245,245,245)]"
        originX="right"
      >
        <label className="inline-block cursor-pointer p-4">
          <div className="text-[15px] font-medium">Upload picture</div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChangeHandler}
          />
        </label>
      </DropdownList>
    </div>
  );
}

interface editProfileDataType {
  data: {
    file: {
      url: string;
      file: File;
    } | null;
    user: Database["public"]["Tables"]["users"]["Insert"] | null;
  };
  uploadImage: (a: { url: string; file: File }) => void;
  setUser: (a: Database["public"]["Tables"]["users"]["Insert"]) => void;
  changeUserValue: (a: string, variable: "name" | "bio" | "link") => void;
}

export const useEditProfileDataStore = create<editProfileDataType>((set) => ({
  data: {
    file: null,
    user: null,
  },
  uploadImage: (file) =>
    set((state) => ({
      data: {
        ...state.data,
        file: file,
      },
    })),
  setUser: (value) =>
    set((state) => ({
      data: {
        ...state.data,
        user: value,
      },
    })),
  changeUserValue: (value, variable) =>
    set((state) => ({
      data: {
        ...state.data,
        user: state.data.user && { ...state.data.user, [variable]: value },
      },
    })),
}));
