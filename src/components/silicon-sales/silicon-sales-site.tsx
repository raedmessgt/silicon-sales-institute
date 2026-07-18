"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleStar } from "@/components/silicon-sales/particle-star";
import { WinCarousel } from "@/components/silicon-sales/win-carousel";
import {
  ssiApplyUrl,
  ssiContactEmail,
  ssiEarnings,
  ssiFaqs,
  ssiFeatures,
  ssiPlacementTiles,
  ssiReasons,
  ssiSteps,
  ssiStudents,
  ssiTraps,
  ssiVideos,
} from "@/lib/silicon-sales";

gsap.registerPlugin(ScrollTrigger);

function ApplyButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={ssiApplyUrl}
      target="_blank"
      rel="noreferrer"
      className={`ssi-btn ${className}`}
    >
      <span>{children}</span>
      <span className="ssi-btn__ico" aria-hidden>
        ↗
      </span>
    </a>
  );
}

function fillMarquee(
  items: (typeof ssiPlacementTiles)[number][],
  minCopies = 6,
) {
  if (items.length === 0) return [];
  const out: (typeof ssiPlacementTiles)[number][] = [];
  while (out.length < items.length * minCopies) {
    out.push(...items);
  }
  return out;
}

function PlacementTile({
  t,
  copyKey,
}: {
  t: (typeof ssiPlacementTiles)[number];
  copyKey: string;
}) {
  return (
    <div className="ssi-tile" data-copy={copyKey}>
      <div className="ssi-tile__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.logo} alt="" />
      </div>
      <div className="ssi-tile__meta">
        <strong>{t.company}</strong>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: (typeof ssiPlacementTiles)[number][];
  direction: "ltr" | "rtl";
}) {
  // One segment wide enough for any viewport, then duplicated exactly once
  // so translateX(-50%) is a seamless, gapless loop.
  const segment = fillMarquee(items, 8);

  return (
    <div className={`ssi-marquee ssi-marquee--${direction}`}>
      <div className="ssi-marquee__track">
        <div className="ssi-marquee__segment" aria-hidden={false}>
          {segment.map((t, i) => (
            <PlacementTile
              key={`a-${t.company}-${i}`}
              t={t}
              copyKey="a"
            />
          ))}
        </div>
        <div className="ssi-marquee__segment" aria-hidden>
          {segment.map((t, i) => (
            <PlacementTile
              key={`b-${t.company}-${i}`}
              t={t}
              copyKey="b"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const placementMid = Math.ceil(ssiPlacementTiles.length / 2);
const placementRowA = ssiPlacementTiles.slice(0, placementMid);
const placementRowB = ssiPlacementTiles.slice(placementMid);

export function SiliconSalesSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Native scroll only — Lenis was fighting iframe / wheel near video
    const ctx = gsap.context(() => {
      gsap.from(".ssi-hero__copy > *", {
        y: reduce ? 0 : 22,
        opacity: reduce ? 1 : 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.utils.toArray<HTMLElement>(".ssi-reveal").forEach((el) => {
        gsap.from(el, {
          y: reduce ? 0 : 28,
          opacity: reduce ? 1 : 0.25,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="ssi">
      <header className="ssi-nav">
        <a href="#top" className="ssi-nav__brand">
          Silicon Sales
          <span className="ssi-nav__brand-tail"> Institute</span>
        </a>
        <nav className="ssi-nav__links" aria-label="Primary">
          <a href="#placements">Placements</a>
          <a href="#demo">Demo</a>
          <a href="#path">Path</a>
          <a href="#faq">FAQ</a>
        </nav>
        <ApplyButton className="ssi-btn--nav">Apply</ApplyButton>
      </header>

      <section id="top" className="ssi-hero">
        <div className="ssi-hero__copy">
          <p className="ssi-hero__eyebrow">
            The leading global tech sales bootcamp
          </p>
          <h1 className="ssi-hero__title">
            <span className="ssi-hero__title-main">
              Break Into 6-Figure Tech Sales
            </span>
            <span className="ssi-hero__title-line">
              <ParticleStar text="In 30 – 45 Days" />
            </span>
          </h1>
          <p className="ssi-hero__sub">
            No degree. No coding. Live coaching and a hiring system built for
            teens, twenty-somethings, and anyone ready to execute.
          </p>
          <div className="ssi-hero__cta">
            <ApplyButton>Start your application</ApplyButton>
            <p className="ssi-hero__meta">
              UK · Europe · US · Australia · Middle East
            </p>
          </div>
        </div>
        <p className="ssi-hero__scroll">/// Scroll</p>
      </section>

      <section id="placements" className="ssi-proof">
        <div className="ssi-proof__head ssi-reveal">
          <h2>Companies our students have worked with</h2>
        </div>
        <MarqueeRow items={[...placementRowA]} direction="rtl" />
        <MarqueeRow items={[...placementRowB]} direction="ltr" />
      </section>

      <section id="demo" className="ssi-video">
        <div className="ssi-video__intro ssi-reveal">
          <h2>Watch this first</h2>
          <p>
            The founder walkthrough — how the institute works, and what changes
            when you stop guessing and start running a real process.
          </p>
        </div>
        <div className="ssi-video__frame ssi-reveal">
          <div className="ssi-video__embed">
            <iframe
              src={ssiVideos.founder}
              title="Silicon Sales Institute demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="ssi-video__grid ssi-reveal">
          {ssiVideos.students.map((v) => (
            <div key={v.name} className="ssi-video__mini">
              <div className="ssi-video__embed ssi-video__embed--mini">
                <iframe
                  src={v.src}
                  title={`${v.name} story`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p>{v.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ssi-community">
        <div className="ssi-community__head ssi-reveal">
          <h2>Inside the community</h2>
          <p>Real messages. The moments people land the role.</p>
        </div>
        <div className="ssi-reveal">
          <WinCarousel />
        </div>
      </section>

      <section className="ssi-why">
        <div className="ssi-why__intro ssi-reveal">
          <h2>
            Why tech sales
            <br />
            still wins
          </h2>
          <p>
            High upside. Fast progression. No degree tax. Built for people who
            want money and momentum — not another certificate.
          </p>
        </div>
        <ul className="ssi-why__list">
          {ssiReasons.map((r, i) => (
            <li key={r.title} className="ssi-reveal">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="ssi-earn ssi-reveal">
          {ssiEarnings.map((e) => (
            <div key={e.role}>
              <span>{e.level}</span>
              <strong>{e.range}</strong>
              <p>{e.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ssi-trap">
        <div className="ssi-trap__inner">
          <div className="ssi-trap__head ssi-reveal">
            <h2>
              What keeps most people
              <br />
              stuck outside the door
            </h2>
          </div>
          <div className="ssi-trap__board">
            {ssiTraps.map((t) => (
              <div key={t.title} className="ssi-trap__row ssi-reveal">
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <p className="ssi-trap__end ssi-reveal">We replace that with a system.</p>
        </div>
      </section>

      <section id="path" className="ssi-path">
        <div className="ssi-path__head ssi-reveal">
          <h2>How Silicon Sales Institute works</h2>
          <p>Application to placement. Five clear moves.</p>
        </div>
        <div className="ssi-path__rail">
          {ssiSteps.map((s) => (
            <article key={s.n} className="ssi-path__step ssi-reveal">
              <span>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
        <div className="ssi-path__cta ssi-reveal">
          <ApplyButton>Begin your journey</ApplyButton>
        </div>
      </section>

      <section className="ssi-inside">
        <div className="ssi-inside__head ssi-reveal">
          <h2>What you get inside</h2>
          <p>Everything aimed at one outcome: hireable, fast.</p>
        </div>
        <div className="ssi-inside__split">
          {ssiFeatures.map((f) => (
            <article key={f.title} className="ssi-reveal">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ssi-stories">
        <div className="ssi-stories__head ssi-reveal">
          <h2>Success stories</h2>
        </div>
        <div className="ssi-stories__grid">
          {ssiStudents.map((s) => (
            <blockquote key={s.name} className="ssi-reveal">
              <p>&ldquo;{s.quote}&rdquo;</p>
              <footer>
                <strong>{s.name}</strong>
                <span>
                  {s.role} · {s.outcome}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="ssi-fit">
        <div className="ssi-fit__col ssi-reveal">
          <h3>This is for you if…</h3>
          <ul>
            <li>You&apos;re ambitious and ready to learn</li>
            <li>You want high upside without a degree path</li>
            <li>You&apos;ll execute daily</li>
            <li>You want a real career</li>
          </ul>
        </div>
        <div className="ssi-fit__col ssi-fit__col--no ssi-reveal">
          <h3>Not for you if…</h3>
          <ul>
            <li>You want easy money with zero work</li>
            <li>You refuse to be coached</li>
            <li>You won&apos;t follow a process</li>
            <li>You&apos;re not ready to put in reps</li>
          </ul>
        </div>
      </section>

      <section id="faq" className="ssi-faq">
        <div className="ssi-faq__inner">
          <div className="ssi-faq__head ssi-reveal">
            <h2>Questions</h2>
          </div>
          <div className="ssi-faq__list">
            {ssiFaqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className={`ssi-faq__item ${open ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span aria-hidden>{open ? "−" : "+"}</span>
                  </button>
                  <div className="ssi-faq__panel" aria-hidden={!open}>
                    <div className="ssi-faq__a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="ssi-faq__mail ssi-reveal">
            More questions?{" "}
            <a href={`mailto:${ssiContactEmail}`}>{ssiContactEmail}</a>
          </p>
        </div>
      </section>

      <section className="ssi-final">
        <div className="ssi-final__inner">
          <h2 className="ssi-reveal">
            Ready to do this
            <br />
            properly?
          </h2>
          <p className="ssi-reveal">
            Apply to Silicon Sales Institute. If you&apos;re a fit, we invite you
            to the next step.
          </p>
          <div className="ssi-reveal">
            <ApplyButton>Submit your application</ApplyButton>
          </div>
          <p className="ssi-final__meta">
            Application-only · Limited spots · Performance-driven
          </p>
        </div>
      </section>

      <footer className="ssi-footer">
        <div>
          <strong>Silicon Sales Institute</strong>
          <p>Building the next generation of tech sales professionals.</p>
        </div>
        <div className="ssi-footer__links">
          <a href={`mailto:${ssiContactEmail}`}>Contact</a>
          <a href={ssiApplyUrl} target="_blank" rel="noreferrer">
            Apply
          </a>
        </div>
        <p className="ssi-footer__copy">
          © {new Date().getFullYear()} Silicon Sales Institute
        </p>
      </footer>
    </main>
  );
}
