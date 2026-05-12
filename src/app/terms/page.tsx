import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageLayout } from "@/components/StaticPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the 101 AI Tools directory and website.",
};

export default function TermsPage() {
  return (
    <StaticPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using 101 AI Tools. Last updated: April 21, 2026."
    >
      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the 101 AI Tools website and
        related services (collectively, the &quot;Service&quot;). By accessing or using the Service, you agree to these
        Terms. If you do not agree, do not use the Service.
      </p>

      <h2>1. The Service</h2>
      <p>
        The Service provides a directory and editorial-style summaries of third‑party AI tools. We may modify, suspend, or
        discontinue any part of the Service at any time.
      </p>

      <h2>2. Eligibility and acceptable use</h2>
      <p>You agree to use the Service only in compliance with applicable laws and these Terms. You must not:</p>
      <ul>
        <li>Attempt to gain unauthorized access to our systems, other users, or third‑party services.</li>
        <li>Use the Service to distribute malware, spam, or other harmful or unlawful content.</li>
        <li>Scrape, harvest, or automate access to the Service in a way that degrades performance or violates our policies.</li>
        <li>Misrepresent your affiliation with 101 AI Tools or any listed vendor.</li>
      </ul>

      <h2>3. Third‑party tools and links</h2>
      <p>
        Listings may link to websites operated by third parties. We do not control and are not responsible for third‑party
        sites, products, pricing, policies, or practices. Your use of third‑party services is at your own risk and subject
        to their terms and privacy policies.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The Service, including its design, text, and compilation of directory data (excluding third‑party trademarks and
        materials), is owned by 101 AI Tools or its licensors. Third‑party names and logos are the property of their
        respective owners and are used for identification purposes.
      </p>

      <h2>5. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE
        DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, AND NON‑INFRINGEMENT. WE DO NOT WARRANT THAT LISTINGS ARE COMPLETE, ACCURATE, OR CURRENT.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, 101 AI TOOLS AND ITS AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM
        YOUR USE OF THE SERVICE OR THIRD‑PARTY TOOLS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
        TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS OR THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE
        AMOUNTS YOU PAID US FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM OR (B) FIFTY U.S. DOLLARS (US$50).
      </p>

      <h2>7. Indemnity</h2>
      <p>
        You will defend and indemnify 101 AI Tools and its affiliates against any claims, damages, losses, and expenses
        (including reasonable attorneys&apos; fees) arising from your misuse of the Service or violation of these Terms.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms from time to time. We will post the updated version on this page and revise the
        &quot;Last updated&quot; date. Continued use after changes become effective constitutes acceptance of the revised
        Terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about these Terms, contact{" "}
        <a href="mailto:support@101aitools.com">support@101aitools.com</a>. Our{" "}
        <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
          Privacy Policy
        </Link>{" "}
        explains how we handle personal information.
      </p>
    </StaticPageLayout>
  );
}
