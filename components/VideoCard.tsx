"use client";
import { useState, useCallback } from "react";
import { Play, ExternalLink, AlertCircle } from "lucide-react";
import { Video } from "@/lib/types";

type Status = "idle" | "loading" | "valid" | "invalid";

interface VideoCardProps {
  video: Video;
  /** Fallback image shown when YouTube thumbnail is unavailable (use recipe food photo) */
  fallbackImage: string;
  recipeTitle: string;
}

/**
 * Validation logic:
 * 1. Attempt to load YouTube hqdefault thumbnail (480×360).
 * 2. On load — check naturalWidth. YouTube serves a 120×90 gray placeholder
 *    for private/deleted/unavailable videos. If width ≤ 120px → treat as invalid.
 * 3. On error — thumbnail request failed entirely → use fallbackImage.
 * 4. "Watch" button ALWAYS opens a YouTube *search* URL for the searchQuery,
 *    guaranteeing users reach relevant content even if the specific video is gone.
 */
export default function VideoCard({ video, fallbackImage, recipeTitle }: VideoCardProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
  );

  // Direct video URL — used when thumbnail validates as a real, public video
  const ytDirectUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery)}`;

  const handleThumbLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // YouTube's "no-thumbnail" placeholder is always 120×90 at hqdefault.jpg
    if (img.naturalWidth <= 120) {
      // Unavailable video — fall back to recipe food photo
      setThumbSrc(fallbackImage);
      setStatus("invalid");
    } else {
      setStatus("valid");
    }
  }, [fallbackImage]);

  const handleThumbError = useCallback(() => {
    setThumbSrc(fallbackImage);
    setStatus("invalid");
  }, [fallbackImage]);

  const isAvailable = status === "valid";
  const showFallback = status === "invalid";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">

      {/* ── Thumbnail ── */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbSrc}
          alt={video.title}
          onLoad={handleThumbLoad}
          onError={handleThumbError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isAvailable ? "bg-black/25 group-hover:bg-black/35" : "bg-black/40"}`} />

        {/* Play button — links to YouTube */}
        <a
          href={isAvailable ? ytDirectUrl : ytSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Watch ${video.title} on YouTube`}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
            <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" strokeWidth={0} />
          </div>
        </a>

        {/* Duration badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded font-mono">
          {video.duration}
        </div>

        {/* Unavailability notice */}
        {showFallback && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-yellow-400 text-[10px] font-medium px-2 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" strokeWidth={1.75} />
            Finding best match
          </div>
        )}
      </div>

      {/* ── Meta ── */}
      <div className="p-4">
        {showFallback ? (
          /* Graceful fallback state */
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              {video.title}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              This specific video may no longer be available. We&apos;ve found the
              best matching tutorials for <span className="text-gray-600 dark:text-gray-300">{recipeTitle}</span>.
            </p>
            <a
              href={ytSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:text-orange-600 transition-colors"
            >
              <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
              Find {recipeTitle} tutorials
              <ExternalLink className="w-3 h-3" strokeWidth={1.75} />
            </a>
          </div>
        ) : (
          /* Normal available state */
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug line-clamp-2 mb-0.5">
              {video.title}
            </p>
            <p className="text-xs text-gray-400 mb-3">by {video.creator}</p>
            <div className="flex items-center justify-between">
              <a
                href={ytSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#FF6B35] transition-colors"
              >
                <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                Watch on YouTube
                <ExternalLink className="w-3 h-3" strokeWidth={1.75} />
              </a>
              {isAvailable && (
                <span className="text-[10px] text-gray-300 dark:text-gray-600 font-mono">
                  Verified ✓
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
