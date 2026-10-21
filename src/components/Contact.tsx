import FadeIn from "./FadeIn";
import BlobField from "./BlobField";
import ContactForm from "./ContactForm";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16.5 3v9.8a3.9 3.9 0 11-3-3.8V13a1.1 1.1 0 100 .01M16.5 3a5 5 0 004.5 4.3V11a8 8 0 01-4.5-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-midnight px-6 py-28 text-bone sm:px-10 sm:py-36"
    >
      <BlobField />

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <h2 className="font-display text-[12vw] sm:text-[60px] md:text-[72px]">
              Let&apos;s build your <span className="shimmer-text">feed.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/60 sm:text-lg">
              Tell us about your business and what you need. Prefer DMs?
              We&apos;re there too.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/studiosocialeofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex min-h-11 items-center gap-2 rounded-full px-5 text-sm text-bone/85 transition-colors hover:text-bone"
              >
                <InstagramIcon />
                @studiosocialeofficial
              </a>
              <a
                href="https://www.tiktok.com/@studio.sociale"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex min-h-11 items-center gap-2 rounded-full px-5 text-sm text-bone/85 transition-colors hover:text-bone"
              >
                <TikTokIcon />
                @studio.sociale
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
