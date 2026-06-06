import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy · PlanetMatrix",
  description: "How PlanetMatrix collects, processes, uses, and discloses personal information.",
};

/* ─── Prose atoms ────────────────────────────────────────── */
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-['Manrope'] text-[1.6rem] font-extrabold tracking-tight text-[#f0eeff] mt-14 mb-4 scroll-mt-28">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-['Manrope'] text-xl font-bold text-[#f0eeff] mt-9 mb-3">{children}</h3>
);
const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-base font-semibold text-[#d8d2f0] mt-6 mb-2">{children}</h4>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#a89dc8] leading-[1.8] mb-4">{children}</p>
);
const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal pl-6 space-y-2 text-[#a89dc8] leading-relaxed mb-5 marker:text-[#9d5cf6] marker:font-semibold">{children}</ol>
);
const Mail = () => <a href="mailto:info@planet-matrix.com" className="text-[#b97bff] hover:underline">info@planet-matrix.com</a>;

const LEGAL_BASES: [string, string][] = [
  ["Provide you with our Subscription Service", "Performance of a Contract"],
  ["Respond to your questions or requests concerning the Subscription Service", "Legitimate Interests"],
  ["Fulfill the terms of any agreement you have with us", "Performance of a Contract"],
  ["Fulfill your requests for our Subscription Service or otherwise complete a transaction that you initiate", "Performance of a Contract"],
  ["Send you information about our Subscription Service and other topics that are likely to be of interest to you, including newsletters, updates, or other communications, including promotional emails and surveys", "Legitimate Interests or Consent"],
  ["Improve our artificial intelligence and machine learning for accuracy and service reliability", "Legitimate Interests"],
  ["Deliver confirmations, account information, notifications, and similar transactional or operational communications", "Performance of a Contract"],
  ["Improve your user experience and the quality of our products and Subscription Service", "Legitimate Interests"],
  ["Comply with legal and/or regulatory requirements", "Legal Obligation"],
  ["Aggregate and deidentified information", "Legitimate Interests"],
  ["Benchmark results for our customers", "Legitimate Interests"],
  ["Serve our own advertisements", "Legitimate Interests or Consent"],
  ["Analyze how visitors use the Services and various features, including to count and recognize visitors to the Site and for security and fraud prevention purposes", "Legitimate Interests or Legal Obligation"],
  ["Create new products and Services", "Legitimate Interests"],
  ["Manage our business", "Legitimate Interests"],
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#08060f] text-[#f0eeff] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-[6%] h-[72px] border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/PlanetMatrix-Logo-light.png" alt="PlanetMatrix" width={1346} height={265} className="h-6 sm:h-7 md:h-8 w-auto" priority />
        </Link>
        <ul className="hidden lg:flex items-center gap-6 list-none">
          {(["Solutions", "How It Works", "Compliance", "About"] as const).map((l, i) => (
            <li key={l}>
              <Link href={`/${["#solutions", "#how", "#compliance", "#about"][i]}`} className="text-base text-[#a89dc8] hover:text-[#f0eeff] transition-colors">{l}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm sm:text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap bg-transparent transition-all">Log In</Link>
          <Link href="/demo" className="text-sm sm:text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap transition-all hover:-translate-y-px">Book A Demo</Link>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="relative px-[6%] pt-20 pb-12 border-b border-white/[0.07] overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/[0.12] blur-[130px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Legal</span>
          <h1 className="font-['Manrope'] font-extrabold text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.03em] text-[#f0eeff] mt-3 mb-4">Privacy Policy</h1>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="px-[6%] py-14">
        <article className="max-w-3xl mx-auto">

          <H2>1. Introduction</H2>
          <P>This Privacy Notice (&ldquo;Notice&rdquo;) describes how PlanetMatrix, Inc. and its affiliated entities (&ldquo;PlanetMatrix,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, processes, uses, and discloses personal information obtained through your use of our website (the &ldquo;Site&rdquo;), which is available at www.planet-matrix.com, as well as our subscription service (the &ldquo;Subscription Service&rdquo;) made available to you through the Site (collectively, the &ldquo;Services&rdquo;).</P>
          <P>This Privacy Notice applies to PlanetMatrix, Inc. and its affiliated entities worldwide (collectively, &ldquo;PlanetMatrix&rdquo;). PlanetMatrix, Inc. acts as the primary controller for the processing of personal information described in this Notice. Where required under applicable data protection laws, PlanetMatrix&rsquo;s affiliated entities may also act as independent or joint controllers with respect to certain processing activities conducted in their local jurisdictions.</P>

          <H2>2. Our Role: as Controller and Processor</H2>
          <P>Depending on the context and the nature of the processing, PlanetMatrix may act either as a data controller or as a data processor under applicable data protection laws. When PlanetMatrix processes personal information for its own business and operational purposes such as operating and securing the Services, managing customer relationships, marketing, analytics, product development, and compliance with legal obligations PlanetMatrix acts as a data controller and determines the purposes and means of that processing. By contrast, when customers use the Subscription Service to collect, manage, analyze, or report data, PlanetMatrix processes personal information solely on behalf of and under the instructions of its customers, who act as the data controllers for that data. In those circumstances, PlanetMatrix acts as a data processor and processes personal information only as necessary to provide and support the Subscription Service and as required by applicable law.</P>

          <H2>3. Information We Collect</H2>
          <P>If you create an account with the Subscription Service (a &ldquo;User&rdquo;), we may collect personal information from you directly related to creating your account and offering you our Subscription Service. The categories of information we may collect from you include:</P>
          <OL>
            <li>Full name</li>
            <li>Email address</li>
            <li>Password that you create</li>
            <li>Company name</li>
            <li>Company title</li>
            <li>Company address; and</li>
            <li>Information about your company related to evaluating your company&rsquo;s performance along Environmental, Social, and Governance (&ldquo;ESG&rdquo;) dimensions</li>
          </OL>

          <H3>3.1 Personal information Provided by Users or Through the Site</H3>
          <P>We may also collect information about potential Users (names and email addresses) provided by other Users as part of our referral sign-up process.</P>
          <H4>Other personal information collected through the Site</H4>
          <P>If you visit our Site, you may navigate the Site without submitting any personal information. However, if you use certain features on the Site we will collect any personal information that you provide through those features. Additionally, if you reply to one of our &ldquo;call to action&rdquo; submissions or download a demo of our product, we will collect your personal information in relation to those features, including your name and email address.</P>
          <H4>Server logs</H4>
          <P>Server logs automatically record information and details about your online interactions with us. For example, server logs may record information about your visit to our Site or use our Subscription Service on a particular time and date and collect information such as your device ID or IP address.</P>
          <H4>Cookies</H4>
          <P>We use cookies on the Site. Cookies are small files that are temporarily stored on your mobile device through the Site. A cookie allows the Site to recognize whether you have visited before and may store user preferences and other information. For example, cookies can be used to collect or store information about your use of the Site during your current session and over time (including the pages you view and the files you download), your device&rsquo;s operating system, your device ID, IP address, and your general geographic location.</P>
          <H4>Pixel tags</H4>
          <P>A pixel tag (also known as a web beacon, clear GIF, pixel, or tag) is an image or a small string of code that may be placed in an advertisement or email. It allows companies to set or read cookies or transfer information to their servers when you load a webpage or interact with online content. For example, we or our service providers may use pixel tags to determine whether you have interacted with a specific part of our Services, viewed a particular advertisement, or opened a specific email.</P>
          <H4>SDKs and mobile advertising IDs</H4>
          <P>Our Site may include third-party software development kits (&ldquo;SDKs&rdquo;) that allow us and our service providers to collect information about your activity. In addition, some mobile devices come with a resettable advertising ID (such as Apple&rsquo;s IDFA and Google&rsquo;s Advertising ID) that, like cookies and pixel tags, allow us and our service providers to identify your mobile device over time for advertising purposes.</P>
          <H4>Third-party plugins</H4>
          <P>Our Site may include plugins from other companies, including social media companies (e.g., LinkedIn). These plugins may collect information, such as information about the pages you visit, and share it with the company that created the plugin even if you do not click on the plugin. These third-party plugins are governed by the privacy policies and terms of the companies that created them.</P>
          <H4>Third-party online tracking</H4>
          <P>We may partner with certain third parties to collect, analyze, and use some of the personal and other information described in this Notice. For example, we may allow third parties to set pixels through the Site. This information may be used for a variety of purposes, including analytics and interest-based advertising, as discussed below.</P>
          <H4>Aggregated or de-identified information</H4>
          <P>We may share aggregated or de-identified information about customers of the Subscription Service, such as by publishing a report on trends in the usage of the Subscription Service. Such aggregated or de-identified information will not identify you personally.</P>

          <H3>3.2 Information We Process When You Use the Subscription Service</H3>
          <H4>Usage Data</H4>
          <P>We collect usage data when you interact with the Subscription Service. Usage data includes metrics and information regarding your use and interaction with the Subscription Service such as what product features you use the most and server log information.</P>
          <H4>Mobile</H4>
          <P>When you use, access, or interact with the Subscription Service via our mobile applications, we automatically collect information such as your device model and version, operating system, or device identifiers.</P>

          <H2>4. How We Use Personal Information and Legal Bases (where applicable)</H2>
          <P>We process your personal information for specific purposes, and each purpose has a corresponding lawful basis under applicable data protection laws. Below is a list of the purposes of processing and their respective lawful bases:</P>
          <div className="overflow-x-auto mb-5 rounded-xl border border-white/[0.07]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#0e0b1a]">
                  <th className="text-sm font-semibold text-[#d8d2f0] p-4 border-b border-white/[0.07]">Purpose of Processing</th>
                  <th className="text-sm font-semibold text-[#d8d2f0] p-4 border-b border-white/[0.07] whitespace-nowrap">Lawful Basis for Processing</th>
                </tr>
              </thead>
              <tbody>
                {LEGAL_BASES.map(([purpose, basis], i) => (
                  <tr key={i} className="align-top">
                    <td className="text-[0.95rem] text-[#a89dc8] leading-relaxed p-4 border-b border-white/[0.05]">{purpose}</td>
                    <td className="text-[0.95rem] text-[#a89dc8] leading-relaxed p-4 border-b border-white/[0.05]">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H2>5. Processor Activities</H2>
          <P>The Subscription Service allows our customers to collect, analyze, benchmark, and report relevant ESG data. When customers use our product, they may collect personal information such as first and last name, email address, or usage data about a user.</P>
          <P>We do not control the types of personal information our customers may choose to collect or manage using the Subscription Service. We store our customers&rsquo; information on our service providers&rsquo; servers but process it as a processor under our customers&rsquo; instructions and in accordance with our Terms and Conditions, which prohibit us from using the information except as necessary to provide and improve the Subscription Service and as required by law.</P>
          <P>Our customers control and are responsible for correcting, deleting, or updating the information they process using the Subscription Service and for complying with any regulations or laws that require providing notice, disclosure, and/or obtaining consent prior to transferring the personal information to us for processing purposes.</P>

          <H2>6. Sharing and Disclosure of Personal Information</H2>
          <P>We may share your information with third parties for a variety of purposes, as described below.</P>
          <H4>Referring third parties</H4>
          <P>If you were referred to PlanetMatrix by another user who has requested access to data about your Company (a &ldquo;Referring Third Party&rdquo;), the information you input about your Company through the platform may be shared with the Referring Third Party.</P>
          <H4>Third-party service providers</H4>
          <P>PlanetMatrix uses third-party service providers that perform services on our behalf, including web-hosting companies, and mailing vendors. These service providers may collect and/or use your information, including information that identifies you personally, to assist us in achieving the purposes discussed above.</P>
          <P>We may also share your information with third parties when necessary to fulfill your requests for Services; to complete a transaction that you initiate; to meet the terms of any agreement that you have with us or our partners; or to manage our business.</P>
          <H4>Analytics</H4>
          <P>We partner with certain third parties to obtain the automatically collected information discussed above and to engage in analysis, auditing, research, and reporting. These third parties may use pixels or server logs, and they may set and/or access device IDs and IP addresses from your device. In particular, the Site uses Google Analytics to help collect and analyze certain information for the purposes discussed above. You may opt out of the use of cookies by Google Analytics here.</P>
          <H4>Interest-based advertising</H4>
          <P>The Site enables third-party tracking mechanisms to collect information about you and your computing devices for use in online interest-based advertising. For example, third parties, such as Facebook, may use the fact that you visited our Site to target online ads to you about our Services. In addition, our third-party advertising networks might use information about your use of our Site to help target advertisements based on your mobile activity in general. For information about interest-based advertising practices, including privacy and confidentiality.</P>
          <P>The use of online tracking mechanisms by third parties is subject to those third parties&rsquo; own privacy policies, and not this Notice. If you prefer to prevent third parties from setting and accessing cookies on your computer or other device, you may set your browser to block cookies.</P>
          <P>You may also opt-out of interest-based advertising by adjusting the advertising preferences on your mobile device (for example, in iOS, visit Settings &gt; Privacy &gt; Advertising &gt; Limit Ad Tracking, and in Android, visit Settings &gt; Google &gt; Ads &gt; Opt out of interest-based ads). Additionally, you may opt out for companies that participate in the Digital Advertising Alliance&rsquo;s AppChoices tool by downloading it and following the instructions in the app.</P>
          <H4>Legal purposes</H4>
          <P>We may use or share your information with third parties when we believe, in our sole discretion, that doing so is necessary:</P>
          <OL>
            <li>To comply with applicable law or a court order, subpoena, or other legal process</li>
            <li>To investigate, prevent, or take action regarding illegal activities, suspected fraud, violations of our terms and conditions, or situations involving threats to our property or the property or physical safety of any person or third party</li>
            <li>To establish, protect, or exercise our legal rights or defend against legal claims</li>
            <li>To facilitate the financing, securitization, insuring, sale, assignment, bankruptcy, or other disposal of all or part of our business or assets</li>
          </OL>

          <H3>6.1 Disclosure of Business Identity Information</H3>
          <P>As part of our Subscription Services, we may disclose your company name and logo to other customers who have a Subscription Service with us. This is done to enable customer directories, shared workflows, or functionality designed to promote connectivity and collaboration between PlanetMatrix customers using our services.</P>
          <P>We do not disclose confidential business information or any personal data as part of this feature, unless expressly authorized by You or required by law.</P>
          <P>This processing is carried out on the basis of our legitimate interests in maintaining a functional and transparent platform for our Users, and we ensure that such disclosures are limited to what is necessary and proportionate.</P>

          <H3>6.2 Engage with our customers</H3>
          <P>As part of our legitimate interest to improve your user experience and the quality of our products and Subscription Service, we may share your personal information with other customers who have an existing relationship with your organisation. For example, if you are already a Subscription Service User, we may confirm this to another customer associated with your organisation and facilitate your access to an additional Subscription Service under that relationship.</P>

          <H2>7. International Users</H2>
          <P>The information that we collect through or in connection with the Services is transferred to and processed in the United States for the purposes described above. We may also subcontract the processing of your data to, or otherwise share your data with, affiliates or third parties in countries other than your country of residence. The data-protection laws in these countries may be different from, and less stringent than, those in your country of residence. However, we comply with all applicable laws regarding international data transfers.</P>
          <P>Where we transfer your personal information to countries that do not have an adequacy decision by the European Commission, we use the Standard Contractual Clauses (&ldquo;SCCs&rdquo;) approved by the European Commission. These SCCs are further supplemented by the International Data Transfer Addendum (&ldquo;Addendum&rdquo;) to ensure compliance with the UK GDPR and provide additional protection for your data. The Addendum requires both PlanetMatrix and the data importer to implement additional safeguards and uphold data subjects&rsquo; rights.</P>
          <P>You may view a current list of PlanetMatrix&rsquo;s third party.</P>

          <H2>8. Data Retention</H2>
          <P>We retain personal information about you necessary to fulfill the purpose for which that information was collected or as required or permitted by law. We do not retain personal information longer than is necessary for us to achieve the purposes for which we collected it. When we destroy your personal information, we do so in a way that prevents that information from being restored or reconstructed.</P>

          <H2>9. Data Security</H2>
          <P>We employ physical, technical, and administrative procedures to safeguard the personal information we collect both online and offline. However, no website or platform is 100% secure, and we cannot ensure or warrant the security of any information you transmit to the Services or to us, and you transmit such information at your own risk to the fullest extent permitted by applicable law.</P>
          <P>If you would like more information about PlanetMatrix&rsquo;s data security practices</P>

          <H2>10. Your Privacy Rights</H2>
          <P>If you wish to opt-out of marketing emails you receive from us, you may do so by following the instructions in those emails or by contacting us at <Mail />.</P>
          <P>Depending on your location and applicable law, you may have the following rights:</P>
          <OL>
            <li>The right to be informed about our data collection practices</li>
            <li>The right to access and rectify your data</li>
            <li>The right to erase or delete your data</li>
            <li>The right to data portability</li>
            <li>The right to restrict and object to the processing of your data (including for direct marketing purposes)</li>
            <li>The right to opt out of the sale of your information</li>
            <li>The right to opt-out of marketing emails and text messages</li>
            <li>The right to limit our use of any automated decision-making processes</li>
            <li>The right to lodge a complaint to your local data protection authority; and</li>
            <li>The right to withdraw consent (to the extent applicable)</li>
          </OL>
          <P>We will respond to a request as soon as reasonably possible and within the timeframe required under applicable law.</P>

          <H3>10.1 Fees and Excessive Requests</H3>
          <P>We do not ordinarily charge a fee for responding to privacy rights requests.</P>
          <P>However, where permitted under applicable law, we may charge a reasonable administrative fee, or decline to act on a request, if the request is manifestly unfounded, excessive, or repetitive. In such cases, we will inform you of the reasons for our decision and any applicable fee before proceeding.</P>
          <P>For individuals in Singapore, we may charge a reasonable administrative fee for access requests as permitted under the Personal Data Protection Act. If a fee applies, we will inform you of the amount and obtain your agreement before processing your request.</P>

          <H2>11. Children</H2>
          <P>Content on the Services is not directed at children under the age of 18. We do not knowingly collect personal information from children under the age of 18. In the event that we discover personal information from a child under the age of 18 has been collected, we will promptly take all reasonable measures to delete that information from our systems.</P>
          <P>If you are a parent or guardian and believe that your child has provided us with personal information without your consent, please contact us at <Mail />, and we will work diligently to remove such information.</P>

          <H2>12. Regional Disclosures</H2>

          <H3>12.1 European Economic Area and United Kingdom</H3>
          <P>If you believe that our processing of your personal information does not comply with the General Data Protection Regulation (&ldquo;GDPR&rdquo;), UK GDPR, or the Personal Data Protection Act (&ldquo;PDPA&rdquo;), you have the right to lodge a complaint with a supervisory authority.</P>
          <H4>Supervising Authority in the EU</H4>
          <P>Please refer to the relevant supervisory authority in your EU member state.</P>
          <H4>Data Protection Point of Contact</H4>
          <H4>EU Representative</H4>
          <P>Where required under Article 27 of the General Data Protection Regulation (&ldquo;GDPR&rdquo;), PlanetMatrix, Inc., as its representative in the European Union. Berlin, Germany and <Mail /> The EU representative acts as PlanetMatrix&rsquo;s point of contact for data subjects and supervisory authorities in the European Union in relation to the processing of personal data under this Privacy Notice. The EU representative may be contacted at <Mail />, which is monitored for global data protection inquiries.</P>
          <H4>UK Representative</H4>
          <P>Where required under Article 27 of the United Kingdom General Data Protection Regulation (&ldquo;UK GDPR&rdquo;), PlanetMatrix, Inc. has appointed PlanetMatrix UK Ltd, as its representative in the United Kingdom. PlanetMatrix UK Ltd can be contacted at London, England, and <Mail /> The UK representative acts as PlanetMatrix&rsquo;s point of contact for data subjects and the UK Information Commissioner&rsquo;s Office (&ldquo;ICO&rdquo;) in relation to the processing of personal data under this Privacy Notice.</P>
          <P>These appointments apply where PlanetMatrix is subject to the GDPR or UK GDPR in relation to its processing activities.</P>

        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.07] px-[6%] py-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-[#5e567a]">© 2026 PlanetMatrix. All rights reserved.</p>
          <Link href="/" className="text-sm text-[#b97bff] hover:underline">← Back to home</Link>
        </div>
      </footer>
    </div>
  );
}
