import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/signup?auth_error=meta_denied", req.url));
  }

  const appId = process.env.META_APP_ID!;
  const appSecret = process.env.META_APP_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;

  try {
    // Exchange code for access token
    const tokenRes = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`
    );
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("No access token");

    // Fetch user info
    const userRes = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokenData.access_token}`
    );
    const userData = await userRes.json();

    // Redirect to signup details step with prefilled info
    const params = new URLSearchParams({
      step: "details",
      platform: "meta",
      name: userData.name ?? "",
      email: userData.email ?? "",
    });
    return NextResponse.redirect(new URL(`/signup?${params.toString()}`, req.url));
  } catch (e) {
    console.error("Meta OAuth error:", e);
    return NextResponse.redirect(new URL("/signup?auth_error=meta_failed", req.url));
  }
}
