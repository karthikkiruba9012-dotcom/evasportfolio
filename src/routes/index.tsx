import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import {
  About,
  Contact,
  Education,
  Experience,
  Expertise,
  Insights,
  SiteFooter,
  WhyMe,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evangelin Priyadarshini — Marketing & HR Strategist, MBA '27" },
      {
        name: "description",
        content:
          "Portfolio of Evangelin Priyadarshini, MBA '27 (SJIM) Marketing & HR strategist in Bengaluru — SEO, content strategy, performance marketing and people-first brand growth.",
      },
      { property: "og:title", content: "Evangelin Priyadarshini — Marketing & HR Strategist" },
      {
        property: "og:description",
        content:
          "Driving brand growth through digital & content strategy. MBA '27 candidate specialising in Marketing and Human Resources.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <About />
        <WhyMe />
        <Experience />
        <Expertise />
        <Education />
        <Insights />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
