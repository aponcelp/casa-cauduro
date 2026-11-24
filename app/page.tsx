import { redirect } from "next/navigation";

/** Fallback if proxy rewrite is unavailable — Spanish lives at /es. */
export default function RootPage() {
  redirect("/es");
}
