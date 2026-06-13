import { useEffect } from "react";

const DEFAULT_TITLE = "OrbitorX — Tech Events & Startup Growth";
const DEFAULT_DESCRIPTION =
  "We embed, build, and launch alongside founders. 42+ events, 120+ startups scaled across India.";
const DEFAULT_IMAGE = "/logo.png";
const DEFAULT_URL = "https://orbitorx.com";

function setMetaTag(property, content, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function SEOMeta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
}) {
  useEffect(() => {
    const fullTitle =
      title === DEFAULT_TITLE ? title : `${title} | OrbitorX`;
    document.title = fullTitle;

    // Open Graph
    setMetaTag("og:title", fullTitle);
    setMetaTag("og:description", description);
    setMetaTag("og:image", image);
    setMetaTag("og:url", url);
    setMetaTag("og:type", "website");

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image", true);
    setMetaTag("twitter:title", fullTitle, true);
    setMetaTag("twitter:description", description, true);

    // Standard meta
    setMetaTag("description", description, true);
  }, [title, description, image, url]);

  return null;
}

export const PAGE_META = {
  home: {
    title: "OrbitorX — Tech Events & Startup Growth",
    description:
      "We embed, build, and launch alongside founders. 42+ events, 120+ startups scaled across India.",
    image: "/logo.png",
    url: "https://orbitorx.com/",
  },
  services: {
    title: "Services",
    description:
      "From ideation to launch — OrbitorX offers end-to-end startup services including product strategy, tech development, and growth hacking.",
    image: "/logo.png",
    url: "https://orbitorx.com/services",
  },
  work: {
    title: "Our Work",
    description:
      "Explore the startups and projects OrbitorX has helped build and scale across India's tech ecosystem.",
    image: "/logo.png",
    url: "https://orbitorx.com/work",
  },
  about: {
    title: "About Us",
    description:
      "Meet the team behind OrbitorX — builders, designers, and strategists who live and breathe startup culture.",
    image: "/logo.png",
    url: "https://orbitorx.com/about",
  },
  contact: {
    title: "Contact",
    description:
      "Get in touch with OrbitorX. Whether you're a founder, investor, or collaborator — we'd love to hear from you.",
    image: "/logo.png",
    url: "https://orbitorx.com/contact",
  },
  events: {
    title: "Events",
    description:
      "Join OrbitorX at our upcoming tech events, hackathons, and startup summits across India.",
    image: "/logo.png",
    url: "https://orbitorx.com/events",
  },
};
