import { NextResponse } from "next/server";

const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL!;

export function OPTIONS() {
  const res = new NextResponse(null, { status: 200 });

  res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  return res;
}


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

    // CORS headers
  res.headers.set("Access-Control-Allow-Origin", allowedOrigin  );
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}
