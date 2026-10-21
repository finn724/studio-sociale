import type { Metadata } from "next";
import LegalPageShell from "@/components/LegalPageShell";
import LegalSection from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy — Studio Socialé",
  description: "How Studio Socialé collects, uses and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy policy" updated="[PLACEHOLDER: date]">
      <LegalSection title="Who we are">
        <p>
          Studio Socialé (&quot;we&quot;, &quot;us&quot;) is a social media
          management, content and strategy agency. This policy explains what
          personal data we collect through this website, why, and how we
          handle it.
        </p>
        <p>
          Registered business name and address:{" "}
          <span className="font-medium text-ink">[PLACEHOLDER]</span>. Contact
          email for privacy questions:{" "}
          <span className="font-medium text-ink">[PLACEHOLDER]</span>.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>
          When you submit the contact form on this site, we collect the
          information you provide: your name, brand or business name, email
          address, Instagram or TikTok handle (if given), the services
          you&apos;re interested in, and your message.
        </p>
        <p>
          We do not require you to create an account, and we do not collect
          payment information through this site.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <p>
          We use the information you submit solely to respond to your
          inquiry and, if you become a client, to deliver our services. We
          do not sell your personal data, and we do not share it with third
          parties except the service providers described below.
        </p>
      </LegalSection>

      <LegalSection title="Third-party service providers">
        <p>
          Contact form submissions are sent using{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            Resend
          </a>
          , an email delivery service, which processes the content of your
          submission in order to deliver it to our inbox.
        </p>
        <p>
          This site is hosted on{" "}
          <span className="font-medium text-ink">[PLACEHOLDER: hosting provider, e.g. Vercel]</span>
          , which may log standard technical data (such as IP address and
          request metadata) as part of operating the infrastructure.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          This site uses a small amount of local browser storage to remember
          your cookie preference once you make a choice in the banner shown
          on your first visit. That preference is not shared with us or any
          third party.
        </p>
        <p>
          We do not currently use analytics or marketing cookies. If that
          changes in the future, this section will be updated to describe
          exactly what is used and why, and the cookie banner will only
          enable those cookies if you choose &quot;Accept all&quot;.
        </p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>
          We retain contact form submissions for{" "}
          <span className="font-medium text-ink">
            [PLACEHOLDER: retention period, e.g. 24 months or until you ask us to delete it]
          </span>
          , after which they are deleted.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Depending on where you live, you may have the right to request
          access to, correction of, or deletion of your personal data. To
          make a request, contact us at{" "}
          <span className="font-medium text-ink">[PLACEHOLDER: privacy email]</span>.
        </p>
      </LegalSection>

      <LegalSection title="Children's privacy">
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal data from children.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy from time to time. The &quot;last
          updated&quot; date at the top of this page reflects the most
          recent revision.
        </p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about this policy can be sent to{" "}
          <span className="font-medium text-ink">[PLACEHOLDER: email]</span>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
