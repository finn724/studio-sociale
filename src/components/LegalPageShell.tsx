import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalPageShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="bg-bone px-6 pb-28 pt-44 sm:px-10 sm:pt-48">
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-display text-[14vw] sm:text-[64px]">{title}</h1>
          <p className="mt-3 text-sm text-muted-light">Last updated: {updated}</p>

          <div className="glass mt-10 rounded-panel p-6 text-sm leading-relaxed text-ink/80 sm:p-8">
            This is a template, not legal advice. Replace every{" "}
            <span className="font-medium text-ink">[PLACEHOLDER]</span> with
            your real details and have the final text reviewed by a legal
            professional before publishing.
          </div>

          <div className="mt-12 flex flex-col gap-10">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
