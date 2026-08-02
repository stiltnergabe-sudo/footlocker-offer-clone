import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import giftCard from "@/assets/giftcard.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Get a $500 Foot Locker Gift Card Today" },
      {
        name: "description",
        content:
          "Claim your exclusive $500 Foot Locker gift card offer. Apply, enter your info, complete deals, and claim your reward.",
      },
      { property: "og:title", content: "Get a $500 Foot Locker Gift Card Today" },
      {
        property: "og:description",
        content: "Unlock your exclusive $500 Foot Locker reward in four simple steps.",
      },
    ],
  }),
  component: Index,
});

const steps = [
  "Click Apply Now",
  "Enter your email & basic info",
  "Complete recommended deals",
  "Claim the reward",
];

function Index() {
  return (
    <div className="min-h-screen bg-page py-6 px-3 sm:py-10 sm:px-4">
      <main className="mx-auto w-full max-w-[520px] rounded-3xl bg-card px-4 py-6 shadow-card sm:px-10 sm:py-8">
        <img
          src={giftCard}
          alt="$500 Foot Locker gift card"
          width={1024}
          height={640}
          className="mx-auto w-full max-w-[360px] rounded-2xl shadow-elevated sm:max-w-[420px]"
        />

        <div className="mt-6 flex justify-center sm:mt-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-brand sm:px-5 sm:py-3 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Exclusive Offer
          </span>
        </div>

        <h1 className="mt-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:mt-6 sm:text-[2.5rem]">
          Get a <span className="text-brand">$500</span> Foot Locker
          <br />
          Gift Card Today
        </h1>
        <p className="mt-3 text-center text-base font-medium text-muted-foreground sm:mt-5 sm:text-lg">
          Unlock your exclusive reward.
        </p>

        <h2 className="mt-7 text-center text-xl font-extrabold text-foreground sm:mt-10 sm:text-2xl">How to Start</h2>

        <ol className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 shadow-step sm:gap-4 sm:px-5 sm:py-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground text-base font-extrabold text-primary-foreground sm:h-11 sm:w-11 sm:text-lg">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-sm font-bold text-foreground sm:text-base">{step}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success-muted sm:h-9 sm:w-9">
                <Check className="h-4 w-4 text-success sm:h-5 sm:w-5" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ol>

        <a
          href="https://trksy.org/aff_c?offer_id=1727&aff_id=152053"
          rel="noopener noreferrer"
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground py-5 text-lg font-extrabold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.01] sm:mt-9 sm:py-6 sm:text-xl"
        >
          Get Started
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={3} />
        </a>

        <p className="mt-5 text-center text-xs font-semibold leading-relaxed text-muted-foreground sm:mt-7 sm:text-sm">
          This is a promotional offer. Completion of tasks required to qualify.
          <br />
          Terms &amp; conditions apply. Void where prohibited.
        </p>
      </main>
    </div>
  );
}
