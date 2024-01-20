import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/sheets";

export async function GET(request: NextApiRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (typeof code !== "string") {
    return redirect("/?missing-code");
  }

  const { tokens } = await auth.getToken(code);

  auth.credentials = tokens;

  return redirect("/auth");
}
