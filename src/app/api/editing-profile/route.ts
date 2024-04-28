import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  const { url } = await req.json();

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}
