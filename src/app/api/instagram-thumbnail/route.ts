import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400; // refresh thumbnails every 24 hours

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url param" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      next: { revalidate: 86400 },
    });

    const html = await res.text();
    const match = html.match(/og:image" content="([^"]+)"/);
    const thumbnail = match ? match[1].replace(/&amp;/g, "&") : null;

    if (!thumbnail) {
      return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
    }

    return NextResponse.json({ thumbnail });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
