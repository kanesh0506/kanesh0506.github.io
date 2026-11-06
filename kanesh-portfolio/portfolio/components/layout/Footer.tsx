import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.affiliation}.
        </p>
        <ul className="flex flex-wrap items-center gap-6">
          {profile.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
