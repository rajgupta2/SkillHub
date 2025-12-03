import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, name, role } = await req.json();

  const res = NextResponse.json({ success: true });

  const isProd = process.env.NODE_ENV === "production";

  // Token cookie
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  // User cookie
  res.cookies.set({
    name: "user",
    value: JSON.stringify({ name, role }),
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return res;
}
