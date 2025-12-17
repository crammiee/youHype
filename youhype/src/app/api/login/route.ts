import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.APP_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("auth", "ok", {
      path: "/",
      httpOnly: true,
      secure: true, // works in Vercel HTTPS
      maxAge: 60 * 60 * 24, // 24h
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
