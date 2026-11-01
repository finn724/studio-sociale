import FadeIn from "./FadeIn";

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
};

const tiers: Tier[] = [
  {
    name: "Package name",
    price: "$XXX",
    period: "/mo",
    description: "Placeholder tier — swap in your real package name, price and inclusions.",
    features: ["Deliverable one", "Deliverable two", "Deliverable three"],
    featured: false,
  },
  {
    name: "Package name",
    price: "$XXX",
    period: "/mo",
    description: "Placeholder tier — swap in your real package name, price and inclusions.",
    features: [
      "Deliverable one",
      "Deliverable two",
      "Deliverable three",
      "Deliverable four",
    ],
    featured: true,
  },
  {
    name: "Package name",
    price: "$XXX",
    period: "/mo",
    description: "Placeholder tier — swap in your real package name, price and inclusions.",
    features: [
      "Deliverable one",
      "Deliverable two",
      "Deliverable three",
      "Deliverable four",
      "Deliverable five",
    ],
    featured: false,
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M3 8.5L6 11.5L13 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-bone px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn className="mb-16 max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-light">
            Pricing
          </p>
          <h2 className="font-display text-[12vw] sm:text-[56px] md:text-[64px]">
            Plans for every stage of growth.
          </h2>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <FadeIn key={`${tier.name}-${i}`} delay={i * 0.08}>
              <div
                className="flex h-full flex-col rounded-panel p-8"
                style={{
                  background: tier.featured ? "var(--midnight)" : "var(--stone)",
                  color: tier.featured ? "var(--bone)" : "var(--ink)",
                }}
              >
                {tier.featured && (
                  <span
                    className="mb-5 w-fit rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: "rgba(159,180,217,0.18)", color: "var(--mist)" }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl">{tier.price}</span>
                  <span
                    className="text-sm"
                    style={{ color: tier.featured ? "rgba(239,236,230,0.5)" : "var(--muted-on-light)" }}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: tier.featured ? "rgba(239,236,230,0.65)" : "var(--muted-on-light)" }}
                >
                  {tier.description}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm"
                      style={{ color: tier.featured ? "rgba(239,236,230,0.85)" : "var(--ink)" }}
                    >
                      <span style={{ color: "var(--mist)" }}>
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-8 flex min-h-11 items-center justify-center rounded-full text-sm font-medium transition-transform hover:scale-[1.02]"
                  style={{
                    background: tier.featured ? "var(--bone)" : "var(--ink)",
                    color: tier.featured ? "var(--ink)" : "var(--bone)",
                    transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  Get started
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
