import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ExternalLink, LoaderCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/fomo-logo.png.asset.json";
import { claimAmount, canClaim, canActivateDemo, DEMO_DELAY_MS, COUNTRIES, isSolAddress, SURVEY_URL, type Age } from "@/lib/claim";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "FOMO | Steps to claim" },
    { name: "description", content: "Confirm your eligibility and visit the survey and deals offer with FOMO." },
    { property: "og:title", content: "FOMO | Steps to claim" },
    { property: "og:description", content: "Your FOMO claim checklist: age, country, survey and deals." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function AnimatedAmount({ amount }: { amount: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(amount); return; }
    const start = performance.now();
    let frame = 0;
    // The previous settled amount is the start of each transition.
    const from = display;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 650, 1);
      setDisplay(Math.round(from + (amount - from) * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // Only restart when the target changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
  return <span className="inline-block min-w-[4ch] text-left tabular-nums">${display}</span>;
}

function Index() {
  const [age, setAge] = useState<Age>(null);
  const [country, setCountry] = useState("");
  const [surveyOpened, setSurveyOpened] = useState(false);
  const [error, setError] = useState("");
  const [surveyError, setSurveyError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressState, setAddressState] = useState<"idle" | "valid" | "invalid">("idle");
  const [demo, setDemo] = useState(false);
  const [demoClaim, setDemoClaim] = useState<"idle" | "loading" | "sent">("idle");
  const demoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (demoTimer.current !== null) clearTimeout(demoTimer.current); }, []);
  const amount = claimAmount(age, country);
  const completed = Number(age === "over") + Number(Boolean(country)) + Number(surveyOpened);
  const openSurvey = () => { setSurveyOpened(true); setSurveyError(false); setError(""); };
  const claim = () => {
    if (demoClaim !== "idle") return;
    if (!surveyOpened) { setError("complete survey and deals to claim"); setSurveyError(true); return; }
    if (!canClaim(age, country, surveyOpened)) { setError(age !== "over" ? "Confirm you are over 18 to continue." : "Select your country to continue."); return; }
    if (demo) {
      setError("");
      setDemoClaim("loading");
      demoTimer.current = setTimeout(() => setDemoClaim("sent"), DEMO_DELAY_MS);
      return;
    }
    window.location.assign(SURVEY_URL);
  };

  return (
    <div className="min-h-screen bg-page px-4 py-6 sm:py-10">
      <main className="claim-panel mx-auto w-full max-w-[460px] rounded-2xl bg-card px-5 py-6 shadow-card sm:px-8 sm:py-8">
        <header className="mb-7 flex items-center gap-3 border-b border-border pb-5">
          <img src={logo.url} width={48} height={48} alt="FOMO logo" className="h-12 w-12 rounded-lg" />
          <span className="text-2xl font-bold">FOMO</span>
          <ShieldCheck className="ml-auto size-5 text-muted-foreground" aria-hidden="true" />
        </header>
        {demo && <p role="status" className="mb-5 border border-success bg-success-muted p-3 text-sm font-semibold text-success">DEMO MODE — simulated results only. No survey completion or funds sent.</p>}
        <div className="mb-5 flex items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Steps to claim</h1>
          <span className="text-xs text-muted-foreground">{completed} / 3</span>
        </div>
        <ol className="space-y-4">
          <li className={`claim-step ${age === "over" ? "is-complete" : ""}`}>
            <div className="flex items-center gap-3">
              <span className="step-number">{age === "over" ? <Check className="size-4" /> : "1"}</span>
              <h2 className="text-base font-semibold">Confirm age</h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant={age === "over" ? "default" : "outline"} className={`h-11 shadow-none ${age === "over" ? "confirmed-control" : ""}`} aria-pressed={age === "over"} onClick={() => { setAge("over"); setError(""); }}>Over 18 {age === "over" && <Check />}</Button>
              <Button variant="outline" className="h-11 shadow-none" aria-pressed={age === "under"} onClick={() => { setAge("under"); setError("You must be over 18 to claim."); }}>Under 18</Button>
            </div>
          </li>
          <li className={`claim-step ${country ? "is-complete" : ""}`}>
            <div className="flex items-center gap-3"><span className="step-number">{country ? <Check className="size-4" /> : "2"}</span><h2 className="text-base font-semibold">Which country are you in?</h2></div>
            <div className="relative mt-4">
              <select aria-label="Country" value={country} onChange={(event) => { setCountry(event.target.value); setError(""); }} className={`country-select ${country ? "confirmed-control" : ""}`}>
                <option value="" disabled>Select country</option>
                {COUNTRIES.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 size-4" />
            </div>
          </li>
          <li className={`claim-step ${surveyError ? "is-error" : demo && surveyOpened ? "is-complete" : ""}`}>
            <div className="flex items-center gap-3"><span className="step-number">3</span><h2 className="text-base font-semibold">Complete survey and deals</h2></div>
            {demo ? <Button variant="outline" className="mt-4 h-11 w-full shadow-none" onClick={openSurvey}>{surveyOpened ? <>Demo step complete <Check /></> : <>Simulate survey <ArrowRight /></>}</Button> : <Button asChild variant="outline" className="mt-4 h-11 w-full shadow-none"><a href={SURVEY_URL} target="_blank" rel="noopener noreferrer" onClick={openSurvey}>Click here <ExternalLink /></a></Button>}
            {surveyOpened && <p className="mt-3 text-xs text-muted-foreground">{demo ? "Simulated only. No offer visited or completion verified." : "Offer opened. Completion is verified by the offer provider."}</p>}
          </li>
        </ol>
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        <Button onClick={claim} disabled={demoClaim !== "idle"} className={`mt-5 h-14 w-full gap-2 text-lg font-bold shadow-none ${demoClaim === "sent" ? "confirmed-control disabled:opacity-100" : ""}`} aria-label={demoClaim === "loading" ? "Simulating claim" : demoClaim === "sent" ? "Demo sent" : `Claim $${amount}`}>
          {demoClaim === "loading" ? <><LoaderCircle className="animate-spin motion-reduce:animate-none" />Simulating…</> : demoClaim === "sent" ? <><Check />Demo sent</> : <>Claim <AnimatedAmount amount={amount} /><ArrowRight className="ml-1" /></>}
        </Button>
        <form className="mt-6 border-t border-border pt-5" onSubmit={(event) => {
          event.preventDefault();
          if (canActivateDemo(address)) {
            setDemo(true); setSurveyOpened(false); setDemoClaim("idle"); setAddress(""); setAddressState("idle"); setError(""); setSurveyError(false);
            if (demoTimer.current !== null) clearTimeout(demoTimer.current);
            return;
          }
          setAddressState(isSolAddress(address) ? "valid" : "invalid");
        }}>
          <label htmlFor="sol-address" className="mb-2 flex justify-between gap-2 text-xs font-medium">SOL deposit address <span className="font-normal text-muted-foreground">Optional</span></label>
          <div className="flex gap-2"><Input id="sol-address" value={address} onChange={(event) => { setAddress(event.target.value); setAddressState("idle"); }} placeholder="Paste SOL address" className="h-11 min-w-0 text-sm" autoComplete="off" spellCheck={false} /><Button type="submit" variant="outline" className="h-11 w-11 shrink-0 p-0 shadow-none" aria-label="Confirm address"><ArrowRight /></Button></div>
          <p role="status" className={`mt-2 text-[10px] font-semibold ${addressState === "valid" ? "text-success" : "text-destructive"}`}>{addressState === "valid" ? "adress confirmed" : addressState === "invalid" ? "Enter a valid SOL address. MUST BE FOMO DEPOSIT ADRESS" : "MUST BE FOMO DEPOSIT ADRESS"}</p>
          {addressState === "valid" && <p className="mt-1 text-[10px] text-muted-foreground">Format checked only. FOMO ownership is not verified.</p>}
        </form>
        <p className="mt-5 text-center text-[10px] leading-relaxed text-muted-foreground">Displayed amounts are conditional offer amounts, not a wallet balance.<br />Survey and deal requirements apply. No payout is processed here.</p>
      </main>
    </div>
  );
}
