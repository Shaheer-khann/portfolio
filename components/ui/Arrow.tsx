import { cn } from "@/lib/cn";

type ArrowProps = {
  className?: string;
  direction?: "right" | "up";
};

export function Arrow({ className, direction = "right" }: ArrowProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-[1em] shrink-0", direction === "up" && "-rotate-90", className)}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
