"use server";

import { revalidatePath } from "next/cache";

export async function action() {
  revalidatePath("/[my-profile]", "page");
}
