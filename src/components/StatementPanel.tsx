import FadeIn from "./FadeIn";
import BlobField from "./BlobField";

export default function StatementPanel() {
  return (
    <section className="relative overflow-hidden bg-midnight px-6 py-28 text-bone sm:px-10 sm:py-40">
      <BlobField variant="single-lilac" />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-bone/50">
            We&apos;re a social media team.
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="font-display text-[11vw] sm:text-[58px] md:text-[72px] lg:text-[80px]">
            <span className="shimmer-text">Grow your business.</span>
            <br />
            We&apos;ll handle the editing.
          </h2>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mt-10 max-w-lg text-base leading-relaxed text-bone/60 sm:text-lg">
            Hand us the camera roll, the brand book and the to-do list. We
            turn them into a feed that looks intentional, posts on time and
            sounds like you.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
