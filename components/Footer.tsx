import { BackToTop } from "@/components/BackToTop";
import { meta } from "@/lib/content";

// Cached so the year is part of the static shell instead of being read on every request.
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="border-t border-line">
      <div className="wrap flex items-center justify-between gap-4 py-7 text-[14px] text-ink-soft">
        <span>
          © {year} {meta.name}
        </span>
        <BackToTop />
      </div>
    </footer>
  );
}
