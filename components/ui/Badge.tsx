import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "orange" | "purple" | "blue" | "red";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
