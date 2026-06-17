import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/signup?auth_error=tiktok_denied", req.url));
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`;

  try {
    // Exchange code for access token
    const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("No access token");

    // Fetch user info
    const userRes = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userJson = await userRes.json();
    const userData = userJson.data?.user ?? {};

    const params = new URLSearchParams({
      step: "details",
      platform: "tiktok",
      name: userData.display_name ?? "",
      email: "",
    });
    return NextResponse.redirect(new URL(`/signup?${params.toString()}`, req.url));
  } catch (e) {
    console.error("TikTok OAuth error:", e);
    return NextResponse.redirect(new URL("/signup?auth_error=tiktok_failed", req.url));
  }
}
