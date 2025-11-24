import { authConfig } from "@/config/env";
import { NextResponse } from "next/server";

const { cookieName } = authConfig;

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: cookieName,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return res;
}
