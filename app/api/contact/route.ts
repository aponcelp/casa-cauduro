import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "estudio@cauduro.com";
  console.info("[contact] stub", { to, from: body.email });

  return NextResponse.json({
    ok: true,
    stub: true,
    to,
  });
}
