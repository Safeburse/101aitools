import { StaticPageLayout } from "@/components/StaticPageLayout";

const About = () => (
  <StaticPageLayout
    title="About"
    subtitle="101 AI Tools is a curated directory that helps professionals discover AI products that fit their workflows."
  >
    <p>
      We maintain a structured catalog of AI tools across categories such as writing, image and video generation,
      developer tooling, productivity, marketing, and more. Our goal is to make it easier to compare options and find
      trustworthy starting points—not to replace your own evaluation, security review, or procurement process.
    </p>

    <h2>What you&apos;ll find here</h2>
    <ul>
      <li>Structured listings with descriptions, pricing signals, and category metadata sourced from public information.</li>
      <li>Detail pages that consolidate the fields we publish for each listing in one place.</li>
      <li>Internal navigation so you can browse the directory before visiting a vendor&apos;s website.</li>
    </ul>

    <h2>Independence and third‑party tools</h2>
    <p>
      Unless clearly marked otherwise, listings are informational. Tool names, logos, and trademarks belong to their
      respective owners. Inclusion in the directory does not imply endorsement, partnership, or certification by 101 AI
      Tools.
    </p>

    <h2>Accuracy and updates</h2>
    <p>
      AI products change quickly. Descriptions, pricing models, and availability may become outdated. Always confirm
      details on the vendor&apos;s official site before making a purchase or relying on a feature.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about the directory or a listing? Email{" "}
      <a href="mailto:support@101aitools.com">support@101aitools.com</a>.
    </p>
  </StaticPageLayout>
);

export default About;
