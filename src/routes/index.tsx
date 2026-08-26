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
import { SectionTracker } from "@/components/site/tracker";

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
      { property: "og:url", content: "https://evasportfolio.lovable.app/" },
      { property: "og:image", content: "https://evasportfolio.lovable.app/og-cover.jpg" },
      { property: "og:image:secure_url", content: "https://evasportfolio.lovable.app/og-cover.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Evangelin Priyadarshini — MBA, HR & Marketing Strategist",
      },
      { name: "twitter:image", content: "https://evasportfolio.lovable.app/og-cover.jpg" },
      {
        name: "twitter:image:alt",
        content: "Evangelin Priyadarshini — MBA, HR & Marketing Strategist",
      },

    ],
    links: [{ rel: "canonical", href: "https://evasportfolio.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Evangelin Priyadarshini",
          jobTitle: "Marketing & HR Strategist",
          url: "https://evasportfolio.lovable.app/",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN",
          },
          knowsAbout: [
            "Digital Marketing",
            "Content Strategy",
            "SEO",
            "Performance Marketing",
            "Human Resources Management",
          ],
          alumniOf: [
            {
              "@type": "CollegeOrUniversity",
              name: "St Joseph's Institute of Management",
            },
            {
              "@type": "CollegeOrUniversity",
              name: "Karunya Institute of Technology and Sciences",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteNav />
      <SectionTracker />
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
