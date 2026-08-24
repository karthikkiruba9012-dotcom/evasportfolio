import { useState } from "react";
import { toast } from "sonner";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  MapPin,
  Quote,
  Send,
  Sparkles,
} from "lucide-react";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  FIELD_TRAINING,
  INSIGHTS,
  REASONS,
  SKILL_GROUPS,
} from "./data";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal kind="fade">
        <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
          <span className="rule-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal kind="mask" delay={0.08}>
        <h2 className="mt-5 text-3xl font-semibold leading-[1.12] sm:text-[2.6rem]">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal kind="up" delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading eyebrow="About" title="Analytical strategy, delivered with empathy." />
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <Reveal kind="right">
            <p>
              I'm an MBA '27 candidate at St Joseph's Institute of Management, specialising in
              Marketing and Human Resources — and I build brand growth the way a business case demands
              it: audience insight first, then content, then measurement.
            </p>
          </Reveal>
          <Reveal kind="right" delay={0.12}>
            <p>
              Most recently I worked as a Digital Marketing Intern at Address Advisors, owning SEO,
              social media marketing and content strategy for a real-estate advisory brand. Before
              that, inside sales at Hasiru Farms put me on the phone with buyers in four languages —
              the fastest education in what messaging actually moves a decision.
            </p>
          </Reveal>
          <Reveal kind="right" delay={0.24}>
            <p className="border-l-2 border-accent/60 pl-5 text-foreground">
              My value proposition is the blend: analytical data, real domain experience and genuine
              empathy — applied to create measurable business impact across agribusiness, consulting
              and corporate environments.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhyMe() {
  return (
    <section
      id="why"
      className="dark relative overflow-hidden bg-background py-24 text-foreground sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--gradient-gold)", opacity: 0.55 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Why hire me"
          title="Four reasons hiring managers keep the conversation going."
        />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2" stagger={0.14}>
          {REASONS.map((reason, i) => (
            <RevealItem key={reason.no} kind={i % 2 === 0 ? "left" : "right"}>
              <article className="card-lux group h-full p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-gold-gradient">
                    {reason.no}
                  </span>
                  <Sparkles className="h-4 w-4 text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}


export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Experience"
          title="Roles, and what came out of them."
          intro="Marketing, sales and operations — each role added a different lens on how brands earn trust and convert it."
        />
        <div className="relative mt-16 space-y-8 border-l border-border pl-6 sm:pl-10">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.role} kind="left" delay={i * 0.08}>
              <article className="card-lux relative p-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.1rem] top-10 h-3 w-3 rounded-full ring-4 ring-background sm:-left-[3.1rem]"
                  style={{ background: "var(--gradient-gold)" }}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="chip">{job.period}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{job.role}</h3>
                <p className="mt-1 text-sm font-medium text-accent-foreground/80">{job.org}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{job.body}</p>
                <p className="mt-4 flex gap-2 text-sm leading-relaxed text-foreground">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {job.highlight}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal kind="fade">
            <h3 className="text-lg font-semibold">Field training &amp; early experience</h3>
          </Reveal>
          <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2">
            {FIELD_TRAINING.map((item) => (
              <RevealItem key={item.org} kind="up">
                <article className="card-lux h-full p-7">
                  <span className="chip">{item.date}</span>
                  <h4 className="mt-4 text-lg font-semibold">{item.role}</h4>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Expertise" title="Capability map." align="center" />
        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <RevealItem key={group.title} kind="blur">
              <article className="card-lux h-full p-8">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-16">
          <Reveal kind="fade">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Award className="h-5 w-5 text-accent" />
              Licenses &amp; certifications
            </h3>
          </Reveal>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {CERTIFICATIONS.map((cert) => (
              <RevealItem key={cert.name} kind="up">
                <article className="card-lux h-full p-6">
                  <h4 className="text-sm font-semibold leading-snug">{cert.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{cert.date}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Education" title="Education & credentials." />
        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
          {EDUCATION.map((item) => (
            <RevealItem key={item.school} kind="scale">
              <article className="card-lux h-full p-8">
                <div className="flex items-center justify-between gap-4">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <span className="chip">{item.grade}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.school}</h3>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{item.degree}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {item.years}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Insights() {
  return (
    <section id="insights" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="In her words" title="Notes from the journey." align="center" />
        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
          {INSIGHTS.map((note) => (
            <RevealItem key={note.label} kind="blur">
              <article className="card-lux h-full p-8">
                <Quote className="h-6 w-6 text-accent" />
                <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {note.label}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build your brand story."
            intro="Hiring for a marketing, brand, growth or HR role? Building a business story that needs a sharper, better-measured voice? Send a note with the details and I'll come back with a point of view, not a template reply."
          />
          <Reveal kind="up" delay={0.2}>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p>Based in Bengaluru, Karnataka · Open to relocation</p>
              <p>Response within 2 working days</p>
            </div>
          </Reveal>
        </div>

        <Reveal kind="scale" delay={0.1}>
          <form
            className="card-lux p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                setSending(false);
                (e.target as HTMLFormElement).reset();
                toast.success("Thank you — your message is on its way.");
              }, 700);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_18%,transparent)]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_18%,transparent)]"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role, project, or consulting engagement."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_18%,transparent)]"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="btn-shape btn-primary mt-6 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-base font-semibold">Evangelin Priyadarshini</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Marketing &amp; HR Strategy · MBA '27, SJIM · Bengaluru
          </p>
        </div>
        <a
          href="#top"
          className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
