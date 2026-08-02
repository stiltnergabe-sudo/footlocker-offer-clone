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
    <div className="min-h-screen bg-page py-5 px-3 sm:py-8 sm:px-4">
      <main className="mx-auto w-full max-w-[460px] rounded-3xl bg-card px-4 py-5 shadow-card sm:px-8 sm:py-7">
        <img
          src={giftCard}
          alt="$500 Foot Locker gift card"
          width={1024}
          height={640}
          className="mx-auto w-full max-w-[330px] rounded-xl sm:max-w-[380px]"
        />

        <div className="mt-5 flex justify-center sm:mt-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-brand sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Exclusive Offer
          </span>
        </div>

        <h1 className="mt-3 text-center text-[1.6rem] font-extrabold leading-[1.15] tracking-tight text-foreground sm:mt-4 sm:text-[2.1rem]">
          Get a <span className="text-brand">$500</span> Foot Locker
          <br />
          Gift Card Today
        </h1>
        <p className="mt-2 text-center text-sm font-medium text-muted-foreground sm:mt-3 sm:text-base">
          Unlock your exclusive reward.
        </p>

        <h2 className="mt-5 text-center text-lg font-extrabold text-foreground sm:mt-7 sm:text-xl">How to Start</h2>


        <ol className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5 sm:py-4.5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-foreground text-sm font-extrabold text-primary-foreground sm:h-9 sm:w-9 sm:text-base">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold text-foreground sm:text-base">{step}</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success-muted">
                <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ol>

        <a
          href="https://trksy.org/aff_c?offer_id=1727&aff_id=152053"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-foreground py-4 text-base font-extrabold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.01] sm:mt-6 sm:py-4.5 sm:text-lg"
        >
          Get Started
          <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </a>

        <p className="mt-4 text-center text-[11px] font-medium leading-relaxed text-muted-foreground/80 sm:mt-5 sm:text-xs">
          This is a promotional offer. Completion of tasks required to qualify.
          <br />
          Terms &amp; conditions apply. Void where prohibited.
        </p>

      </main>
    </div>
  );
}
