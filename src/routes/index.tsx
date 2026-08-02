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
    <div className="min-h-screen bg-page py-10 px-4">
      <main className="mx-auto w-full max-w-[520px] rounded-3xl bg-card px-6 py-8 shadow-card sm:px-10">
        <img
          src={giftCard}
          alt="$50 Foot Locker gift card"
          width={1024}
          height={640}
          className="mx-auto w-full max-w-[420px] rounded-2xl shadow-elevated"
        />

        <div className="mt-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-brand">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Exclusive Offer
          </span>
        </div>

        <h1 className="mt-6 text-center text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-[2.75rem]">
          Get a <span className="text-brand">$50</span> Foot Locker
          <br />
          Gift Card Today
        </h1>
        <p className="mt-5 text-center text-lg font-medium text-muted-foreground">
          Unlock your exclusive reward.
        </p>

        <h2 className="mt-10 text-center text-2xl font-extrabold text-foreground">How to Start</h2>

        <ol className="mt-6 space-y-4">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-5 shadow-step"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-foreground text-lg font-extrabold text-primary-foreground">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-base font-bold text-foreground">{step}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-success-muted">
                <Check className="h-5 w-5 text-success" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className="mt-9 flex w-full items-center justify-center gap-3 rounded-2xl bg-foreground py-6 text-xl font-extrabold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          Get Started
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
        </button>

        <p className="mt-7 text-center text-sm font-semibold leading-relaxed text-muted-foreground">
          This is a promotional offer. Completion of tasks required to qualify.
          <br />
          Terms &amp; conditions apply. Void where prohibited.
        </p>
      </main>
    </div>
  );
}
