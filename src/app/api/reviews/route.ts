import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";
const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? "";

// Cache the response for 24 hours before re-fetching from Google
export const revalidate = 86400;

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "GOOGLE_PLACES_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    let placeId = PLACE_ID;

    // Auto-discover the Place ID if not explicitly set
    if (!placeId) {
      const findRes = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=RCG+Estates+Construction+%26+Development+McAllen+TX&inputtype=textquery&fields=place_id&key=${API_KEY}`
      );
      const findData = await findRes.json();
      placeId = findData.candidates?.[0]?.place_id ?? "";
      if (!placeId) {
        return NextResponse.json(
          { error: "Could not find RCG Estates on Google Places" },
          { status: 500 }
        );
      }
    }

    const detailsRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json` +
        `?place_id=${placeId}` +
        `&fields=rating,user_ratings_total,reviews` +
        `&reviews_sort=most_relevant` +
        `&language=en` +
        `&key=${API_KEY}`
    );

    const details = await detailsRes.json();

    if (details.status !== "OK") {
      return NextResponse.json({ error: details.status }, { status: 500 });
    }

    return NextResponse.json({
      rating: details.result.rating as number,
      total: details.result.user_ratings_total as number,
      reviews: details.result.reviews ?? [],
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
