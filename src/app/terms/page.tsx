import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";
import LegalSection from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Terms of Service — Studio Socialé",
  description: "The terms that apply to using the Studio Socialé website.",
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of service" updated="[PLACEHOLDER: date]">
      <LegalSection title="Acceptance of terms">
        <p>
          By using this website, you agree to these terms. If you
          don&apos;t agree, please don&apos;t use the site.
        </p>
      </LegalSection>

      <LegalSection title="Use of the site">
        <p>
          This site is provided to share information about Studio
          Socialé&apos;s services and to let you get in touch with us. You
          agree not to misuse the site, including attempting to disrupt it,
          submitting false information through the contact form, or using
          it for any unlawful purpose.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The content on this site — including text, design, graphics and
          the Studio Socialé name and logo — belongs to Studio Socialé
          unless otherwise noted, and may not be copied or reused without
          permission.
        </p>
      </LegalSection>

      <LegalSection title="No warranties">
        <p>
          This site is provided &quot;as is&quot;, without warranties of any
          kind, express or implied. We don&apos;t guarantee the site will be
          error-free, uninterrupted, or free of viruses.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Studio Socialé is not
          liable for any indirect, incidental or consequential damages
          arising from your use of this site.
        </p>
      </LegalSection>

      <LegalSection title="Links to third-party sites">
        <p>
          This site links to our Instagram and TikTok profiles and other
          third-party services (such as Resend, used to deliver contact
          form messages). We aren&apos;t responsible for the content or
          practices of those third-party sites.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of{" "}
          <span className="font-medium text-ink">
            [PLACEHOLDER: jurisdiction, e.g. the State of Delaware]
          </span>
          , without regard to conflict-of-law principles.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these terms from time to time. The &quot;last
          updated&quot; date at the top of this page reflects the most
          recent revision.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about these terms can be sent to{" "}
          <span className="font-medium text-ink">[PLACEHOLDER: email]</span>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
