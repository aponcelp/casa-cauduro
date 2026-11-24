import { NextResponse } from "next/server";
import { requestOrigin } from "@/lib/stripe";
import {
  unlockCookieOptions,
  verifyVisitCheckoutSession,
} from "@/lib/visit-unlock";

/**
 * Stripe success_url lands here with session_id.
 * Verify paid visita session → set unlock cookie → redirect to /visita
 * on the same host that handled this request (preview or production).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const locale = searchParams.get("locale") === "en" ? "en" : "es";
  const origin = requestOrigin(request);
  const visitaPath = locale === "en" ? "/en/visita" : "/visita";

  if (!sessionId) {
    return NextResponse.redirect(
      `${origin}${visitaPath}?checkout=missing_session`,
    );
  }

  const check = await verifyVisitCheckoutSession(sessionId);
  if (!check.paid || !check.sessionId) {
    return NextResponse.redirect(
      `${origin}${visitaPath}?checkout=unpaid`,
    );
  }

  const response = NextResponse.redirect(
    `${origin}${visitaPath}?checkout=success`,
  );
  const opts = unlockCookieOptions(check.sessionId);
  response.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  return response;
}
