import { Link } from "react-router-dom";
import { StaticPageLayout } from "@/components/StaticPageLayout";

const Privacy = () => (
  <StaticPageLayout
    title="Privacy Policy"
    subtitle="How 101 AI Tools handles information when you use our website. Last updated: April 21, 2026."
  >
    <p>
      This Privacy Policy describes how 101 AI Tools (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
      uses, and shares information in connection with the website and services at 101 AI Tools (the &quot;Service&quot;).
      By using the Service, you agree to this policy along with our <Link to="/terms">Terms &amp; Conditions</Link>.
    </p>

    <h2>1. Information we collect</h2>
    <h3>1.1 Information you provide</h3>
    <p>
      If you contact us (for example, by email), we receive the content of your message and associated metadata (such
      as your email address).
    </p>
    <h3>1.2 Information collected automatically</h3>
    <p>
      Like most websites, we and our service providers may collect certain technical information automatically when you
      use the Service, such as IP address, device and browser type, general location derived from IP, pages viewed, and
      the date and time of access. We may use cookies or similar technologies where enabled by your browser settings.
    </p>

    <h2>2. How we use information</h2>
    <p>We use information to:</p>
    <ul>
      <li>Operate, maintain, and improve the Service.</li>
      <li>Respond to inquiries and provide support.</li>
      <li>Monitor and analyze usage trends and protect the security and integrity of the Service.</li>
      <li>Comply with legal obligations and enforce our terms.</li>
    </ul>

    <h2>3. Sharing of information</h2>
    <p>We may share information:</p>
    <ul>
      <li>
        <strong>With service providers</strong> who assist us in hosting, analytics, security, or communications, subject
        to appropriate confidentiality and security obligations.
      </li>
      <li>
        <strong>For legal reasons</strong> if we believe disclosure is required by law, regulation, legal process, or
        governmental request, or to protect the rights, property, or safety of our users or the public.
      </li>
      <li>
        <strong>In connection with a business transfer</strong>, such as a merger, acquisition, or sale of assets, where
        information may be transferred as part of that transaction.
      </li>
    </ul>
    <p>We do not sell your personal information.</p>

    <h2>4. Third‑party sites</h2>
    <p>
      The Service may link to third‑party websites and tools. Their privacy practices are governed by their own policies.
      We encourage you to read those policies before providing information to third parties.
    </p>

    <h2>5. Data retention</h2>
    <p>
      We retain information for as long as necessary to fulfill the purposes described in this policy, unless a longer
      retention period is required or permitted by law.
    </p>

    <h2>6. Security</h2>
    <p>
      We implement reasonable technical and organizational measures designed to protect information. No method of
      transmission or storage is completely secure, and we cannot guarantee absolute security.
    </p>

    <h2>7. International users</h2>
    <p>
      If you access the Service from outside the country where we operate, your information may be processed in countries
      that may not provide the same level of data protection as your jurisdiction. Where required, we will rely on
      appropriate safeguards.
    </p>

    <h2>8. Children</h2>
    <p>
      The Service is not directed to children under 16, and we do not knowingly collect personal information from
      children. If you believe we have collected information from a child, please contact us and we will take appropriate
      steps to delete it.
    </p>

    <h2>9. Your choices and rights</h2>
    <p>
      Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of your
      personal information, or to object to processing or request portability. To exercise these rights, contact us at
      the email below. We may need to verify your request before responding.
    </p>

    <h2>10. Changes to this policy</h2>
    <p>
      We may update this Privacy Policy from time to time. We will post the updated version on this page and update the
      &quot;Last updated&quot; date. Your continued use of the Service after changes become effective constitutes your
      acceptance of the revised policy.
    </p>

    <h2>11. Contact</h2>
    <p>
      Questions or requests regarding this Privacy Policy:{" "}
      <a href="mailto:support@101aitools.com">support@101aitools.com</a>.
    </p>
  </StaticPageLayout>
);

export default Privacy;
