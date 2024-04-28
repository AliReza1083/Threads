import Image from "next/image";

import StoringUser from "@/components/storing-user";
import Button from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="mt-20">
      <StoringUser />

      {/* Adding Thread */}
      {user && (
        <header className="mx-auto flex max-w-xl items-center gap-2 border-b border-b-box-border pb-4">
          <Image
            src={user.imageUrl}
            width={36}
            height={36}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
          <p className="grow text-[15px] text-[#999999]">Start a thread...</p>
          <Button className="h-9 w-16 rounded-full text-[15px]" disabled>
            Post
          </Button>
        </header>
      )}
    </main>
  );
}
