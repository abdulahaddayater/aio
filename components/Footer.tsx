import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 safe-bottom">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xl font-extrabold text-white tracking-tight">AIO</span>
              <span className="text-xl font-light text-gray-500">Recipes</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-gray-500">
              A food discovery platform for every cuisine, culture, and dietary preference.
              Find, cook, and share with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Explore recipes", href: "/search" },
                { label: "AI Chef", href: "/ai-chef" },
                { label: "Meal planner", href: "/meal-planner" },
                { label: "Community", href: "/community" },
                { label: "Saved recipes", href: "/dashboard" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Cuisines</h4>
            <ul className="space-y-2.5 text-sm">
              {["Indian", "Italian", "Japanese", "Thai", "Mexican", "French"].map((c) => (
                <li key={c}>
                  <Link href={`/search?cuisine=${c}`} className="hover:text-white transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© 2026 AIO Recipes. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
