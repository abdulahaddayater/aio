import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="text-8xl mb-6">🍽️</div>
      <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Page not found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
        Oops! This page seems to have gone missing from our kitchen. Let&apos;s get you back to the good stuff.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button size="lg">Go Home</Button>
        </Link>
        <Link href="/search">
          <Button size="lg" variant="outline">Explore Recipes</Button>
        </Link>
      </div>
    </div>
  );
}
