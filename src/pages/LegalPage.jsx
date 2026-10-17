import PageHero from "../components/ui/PageHero";
import HeadingBar from "../components/ui/HeadingBar";

// TODO: these are general starting templates, not legal advice. Have them reviewed before going live.
const content = {
  privacy: {
    title: "Privacy",
    highlight: "Policy",
    sections: [
      ["Information we collect", "When you contact us or subscribe to updates, we collect the details you provide, such as your name, email address, company and message. We may also collect basic, anonymised usage data to understand how our website is used."],
      ["How we use it", "We use your information to reply to your enquiry, provide our services, send updates you have asked for and improve our website. We do not sell your personal data."],
      ["Sharing", "We only share data with service providers who help us run our business (such as hosting and email), under appropriate confidentiality obligations, or where required by law."],
      ["Your rights", "You can ask us to access, correct or delete your personal data, or to stop sending you marketing emails, at any time by contacting us."],
    ],
  },
  terms: {
    title: "Terms of",
    highlight: "Service",
    sections: [
      ["Use of this website", "By using this website you agree to use it lawfully and not to attempt to disrupt or misuse it."],
      ["Content", "Website content, including text, graphics and demos, is provided for general information and may change without notice. Demos use simulated data."],
      ["Intellectual property", "The devtreez name, logo and website content are owned by devtreez unless stated otherwise. Project work is governed by the agreement signed with each client."],
      ["Liability", "We work hard to keep this website accurate and available, but it is provided \"as is\" without warranties of any kind."],
    ],
  },
  cookies: {
    title: "Cookie",
    highlight: "Policy",
    sections: [
      ["What are cookies?", "Cookies are small text files stored on your device that help websites work and understand how they are used."],
      ["How we use them", "We use essential cookies to make the site work and, with your consent where required, analytics cookies to understand how visitors use our pages."],
      ["Managing cookies", "You can block or delete cookies in your browser settings. Some parts of the site may not work properly without essential cookies."],
    ],
  },
};

export default function LegalPage({ type }) {
  const page = content[type];

  return (
    <>
      <PageHero eyebrow="Legal" title={page.title} highlight={page.highlight} description="Last updated: October 2026" />
      <article className="max-w-3xl mx-auto px-6 lg:px-8 pb-28 space-y-10">
        {page.sections.map(([heading, text]) => (
          <section key={heading}>
            <h2 className="font-display text-2xl font-semibold">{heading}</h2>
            <HeadingBar className="mt-3 w-12" />
            <p className="mt-3 text-gray-400 leading-relaxed">{text}</p>
          </section>
        ))}
      </article>
    </>
  );
}
