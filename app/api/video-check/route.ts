import { NextRequest, NextResponse } from "next/server";

export interface VideoCheckResult {
  youtubeId: string;
  available: boolean;
  embeddable: boolean;
  title?: string;
  authorName?: string;
  thumbnailUrl?: string;
  error?: string;
  checkedAt: string;
}

/**
 * YouTube oEmbed endpoint — no API key required.
 * Returns 401 for private videos, 404 for deleted/unavailable videos.
 * We use this to validate video availability server-side.
 *
 * Usage: GET /api/video-check?id=VIDEO_ID
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const youtubeId = searchParams.get("id");

  if (!youtubeId || !/^[a-zA-Z0-9_-]{11}$/.test(youtubeId)) {
    return NextResponse.json(
      { error: "Invalid YouTube video ID. Must be exactly 11 characters." },
      { status: 400 }
    );
  }

  const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;

  try {
    const res = await fetch(oEmbedUrl, {
      // Cache validation for 6 hours to avoid re-checking too often
      next: { revalidate: 21600 },
    });

    const checkedAt = new Date().toISOString();

    if (!res.ok) {
      // 401 = private, 404 = deleted/unavailable, 403 = embedding disabled
      const errorMap: Record<number, string> = {
        401: "Video is private or requires sign-in",
        403: "Embedding disabled by creator",
        404: "Video not found or deleted",
      };
      return NextResponse.json<VideoCheckResult>({
        youtubeId,
        available: false,
        embeddable: false,
        error: errorMap[res.status] ?? `YouTube returned HTTP ${res.status}`,
        checkedAt,
      });
    }

    const data = await res.json();

    return NextResponse.json<VideoCheckResult>({
      youtubeId,
      available: true,
      embeddable: true,
      title: data.title,
      authorName: data.author_name,
      thumbnailUrl: data.thumbnail_url,
      checkedAt,
    });
  } catch (err) {
    return NextResponse.json<VideoCheckResult>(
      {
        youtubeId,
        available: false,
        embeddable: false,
        error: "Network error while validating video",
        checkedAt: new Date().toISOString(),
      },
      { status: 502 }
    );
  }
}
