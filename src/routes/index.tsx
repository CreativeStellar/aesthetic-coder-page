import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import art4 from "@/assets/art-4.png.asset.json";
import art5 from "@/assets/art-5.png.asset.json";
import art6 from "@/assets/art-6.png.asset.json";

const GH = "https://github.com/CreativeStellar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CreativeStellar — Portfolio" },
      { name: "description", content: "Personal portfolio of CreativeStellar. Control. Focus. Code." },
      { property: "og:title", content: "CreativeStellar — Portfolio" },
      { property: "og:description", content: "Control. Focus. Code. The portfolio of CreativeStellar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && el.classList.add("in"), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Panel({ img, word, index, line, flip }: { img: string; word: string; index: string; line: string; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      setP((window.innerHeight - r.top) / (window.innerHeight + r.height));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section ref={ref} className="relative min-h-screen flex items-center px-6 md:px-16 py-24 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute font-display text-[28vw] leading-none text-primary/10 whitespace-nowrap"
        style={{ transform: `translateX(${(flip ? 1 : -1) * (p - 0.5) * 40}%)` }}
      >
        {word}
      </div>
      <div className={`relative grid md:grid-cols-12 gap-10 items-center w-full ${flip ? "md:[direction:rtl]" : ""}`}>
        <Reveal className="md:col-span-8 [direction:ltr]">
          <div className="overflow-hidden border border-border">
            <img
              src={img}
              alt={word}
              loading="lazy"
              className="w-full aspect-video object-cover transition-transform duration-700 hover:scale-105"
              style={{ transform: `scale(${1.15 - p * 0.15})` }}
            />
          </div>
        </Reveal>
        <Reveal className="md:col-span-4 [direction:ltr]" delay={200}>
          <p className="text-primary text-sm tracking-[0.3em]">{index}</p>
          <h2 className="font-display text-7xl md:text-8xl mt-2">{word}</h2>
          <p className="text-muted-foreground mt-4 max-w-xs">{line}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  const y = useScrollY();
  const marquee = "CONTROL ✦ FOCUS ✦ CODE ✦ CREATIVESTELLAR ✦ ";

  return (
    <main className="grain">
      <div className="fixed top-0 left-0 h-0.5 bg-primary z-40" style={{ width: `${Math.min(100, (y / Math.max(1, (typeof document !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1))) * 100)}%` }} />

      <nav className="fixed top-0 inset-x-0 z-30 flex justify-between items-center px-6 md:px-16 py-6 mix-blend-difference">
        <span className="font-display text-2xl tracking-wider">CS</span>
        <a href={GH} target="_blank" rel="noreferrer" className="text-sm tracking-widest hover:text-primary transition-colors">
          GITHUB ↗
        </a>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-end px-6 md:px-16 pb-16 overflow-hidden">
        <img
          src={art4.url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ transform: `translateY(${y * 0.4}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative">
          <p className="text-primary tracking-[0.4em] text-sm animate-flicker">// PORTFOLIO</p>
          <h1 className="font-display leading-[0.85] text-[18vw] md:text-[14vw]">
            <span className="block overflow-hidden"><span className="block animate-rise">Creative</span></span>
            <span className="block overflow-hidden"><span className="block animate-rise text-primary text-glow" style={{ animationDelay: "150ms" }}>Stellar</span></span>
          </h1>
          <div className="flex justify-between items-end mt-6 text-muted-foreground text-sm">
            <span>developer / creator</span>
            <span className="animate-bounce">scroll ↓</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border py-5 overflow-hidden bg-primary text-primary-foreground">
        <div className="flex w-max animate-marquee font-display text-4xl tracking-wider">
          <span className="pr-4">{marquee.repeat(4)}</span>
          <span className="pr-4">{marquee.repeat(4)}</span>
        </div>
      </div>

      <Panel img={art4.url} word="CONTROL" index="01" line="Own the system. Every line, every pixel, deliberate." />
      <Panel img={art5.url} word="FOCUS" index="02" line="Tune out the noise. Ship what matters." flip />
      <Panel img={art6.url} word="CODE" index="03" line="Strength through practice. Crown earned in the commits." />

      {/* CTA */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <p className="text-muted-foreground tracking-[0.3em] text-sm">FIND ME ON</p>
        </Reveal>
        <Reveal delay={150}>
          <a
            href={GH}
            target="_blank"
            rel="noreferrer"
            className="group font-display text-[14vw] md:text-[9vw] leading-none inline-block hover:text-primary transition-colors"
          >
            @CreativeStellar
            <span className="block h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </a>
        </Reveal>
        <Reveal delay={300}>
          <a href={GH} target="_blank" rel="noreferrer" className="mt-10 inline-block border border-primary px-8 py-4 tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
            VISIT GITHUB ↗
          </a>
        </Reveal>
      </section>

      <footer className="border-t border-border px-6 md:px-16 py-8 flex justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} CreativeStellar</span>
        <span>crafted by CreativeStellar</span>
      </footer>
    </main>
  );
}
