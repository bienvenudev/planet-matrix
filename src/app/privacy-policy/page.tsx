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
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-2 text-[#a89dc8] leading-relaxed mb-5 marker:text-[#7c3aed]">{children}</ul>
);
const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal pl-6 space-y-2 text-[#a89dc8] leading-relaxed mb-5 marker:text-[#9d5cf6] marker:font-semibold">{children}</ol>
);
const Mail = () => <a href="mailto:privacy@planet-matrix.com" className="text-[#b97bff] hover:underline">privacy@planet-matrix.com</a>;

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
      <nav className="sticky top-0 z-50 flex items-center justify-between px-[6%] h-[72px] border-b border-white/[0.07] bg-[#08060f]/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/planet-matrix-logo.jpeg" alt="PlanetMatrix" width={128} height={64} className="rounded-full object-cover h-11 w-11" priority />
        </Link>
        <ul className="hidden md:flex items-center gap-8 list-none">
          {(["Solutions", "How It Works", "Compliance", "About"] as const).map((l, i) => (
            <li key={l}>
              <Link href={`/${["#solutions", "#how", "#compliance", "#about"][i]}`} className="text-base text-[#a89dc8] hover:text-[#f0eeff] transition-colors">{l}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button className="text-base font-medium text-[#a89dc8] border border-white/[0.07] hover:border-[#7c3aed]/40 hover:text-[#f0eeff] rounded-lg px-4 py-2 bg-transparent transition-all">Log In</button>
          <Link href="/demo" className="text-base font-semibold text-white bg-[#7c3aed] hover:bg-[#9d5cf6] rounded-lg px-4 py-2 transition-all hover:-translate-y-px">Book a demo</Link>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="relative px-[6%] pt-20 pb-12 border-b border-white/[0.07] overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/[0.12] blur-[130px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-sm uppercase tracking-[0.1em] text-[#b97bff] font-semibold">Legal</span>
          <h1 className="font-['Manrope'] font-extrabold text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.03em] text-[#f0eeff] mt-3 mb-4">Privacy Policy</h1>
          <p className="text-base text-[#5e567a] font-medium">Effective Date: April 9, 2026</p>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="px-[6%] py-14">
        <article className="max-w-3xl mx-auto">

          <H2>1. Introduction</H2>
          <P>This Privacy Notice describes how PlanetMatrix, Inc. and its affiliated entities (&ldquo;PlanetMatrix,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, processes, uses, and discloses personal information obtained through your use of the website at www.planet-matrix.com (the &ldquo;Site&rdquo;), as well as the subscription service (the &ldquo;Subscription Service&rdquo;) made available through the Site (collectively, the &ldquo;Services&rdquo;).</P>
          <P>This Privacy Notice applies to PlanetMatrix, Inc. and its affiliated entities worldwide. PlanetMatrix, Inc. acts as the primary controller for processing personal information described in this Notice. Where required under applicable data protection laws, PlanetMatrix&rsquo;s affiliated entities may also act as independent or joint controllers with respect to certain processing activities in their local jurisdictions. For example, Atlas Metrics GmbH, a PlanetMatrix affiliate established in Germany, may act as a local controller for users accessing Atlas-branded websites or services in the European Economic Area.</P>

          <H2>2. Our Role: as Controller and Processor</H2>
          <P>Depending on the context and nature of the processing, PlanetMatrix may act either as a data controller or as a data processor under applicable data protection laws. When PlanetMatrix processes personal information for its own business and operational purposes such as operating and securing the Services, managing customer relationships, marketing, analytics, product development, and compliance with legal obligations, PlanetMatrix acts as a data controller and determines the purposes and means of that processing.</P>
          <P>When customers use the Subscription Service to collect, manage, analyze, or report data, PlanetMatrix processes personal information solely on behalf of and under the instructions of its customers, who act as the data controllers for that data. In those circumstances, PlanetMatrix acts as a data processor and processes personal information only as necessary to provide and support the Subscription Service and as required by applicable law.</P>

          <H2>3. Information We Collect</H2>
          <P>If you create an account with the Subscription Service (a &ldquo;User&rdquo;), we may collect personal information from you directly related to creating your account and offering you our Subscription Service. The categories of information we may collect from you include:</P>
          <OL>
            <li>Full name</li>
            <li>Email address</li>
            <li>Password that you create</li>
            <li>Company name</li>
            <li>Company title</li>
            <li>Company address</li>
            <li>Information about your company related to evaluating your company&rsquo;s performance along Environmental, Social, and Governance (&ldquo;ESG&rdquo;) dimensions</li>
          </OL>

          <H3>3.1 Personal information Provided by Users or Through the Site</H3>
          <P>We may also collect information about potential Users (names and email addresses) provided by other Users as part of the referral sign-up process.</P>
          <H4>Other personal information collected through the Site</H4>
          <P>If you visit the Site, you may navigate without submitting any personal information. However, if you use certain features on the Site we will collect any personal information that you provide through those features. Additionally, if you reply to &ldquo;call to action&rdquo; submissions or download a product demo, we will collect your personal information in relation to those features, including your name and email address.</P>
          <H4>Server logs</H4>
          <P>Server logs automatically record information and details about your online interactions. For example, server logs may record information about your visit to the Site or use of the Subscription Service on a particular time and date and collect information such as your device ID or IP address.</P>
          <H4>Cookies</H4>
          <P>We use cookies on the Site. Cookies are small files that are temporarily stored on your mobile device through the Site. A cookie allows the Site to recognize whether you have visited before and may store user preferences and other information. For example, cookies can be used to collect or store information about your use of the Site during your current session and over time (including the pages you view and the files you download), your device&rsquo;s operating system, your device ID, IP address, and your general geographic location. To learn more about how we use cookies, please review the Cookie Policy.</P>
          <H4>Pixel tags</H4>
          <P>A pixel tag (also known as a web beacon, clear GIF, pixel, or tag) is an image or a small string of code that may be placed in an advertisement or email. It allows companies to set or read cookies or transfer information to their servers when you load a webpage or interact with online content. For example, we or our service providers may use pixel tags to determine whether you have interacted with a specific part of our Services, viewed a particular advertisement, or opened a specific email.</P>
          <H4>SDKs and mobile advertising IDs</H4>
          <P>The Site may include third-party software development kits (&ldquo;SDKs&rdquo;) that allow us and our service providers to collect information about your activity. In addition, some mobile devices come with a resettable advertising ID (such as Apple&rsquo;s IDFA and Google&rsquo;s Advertising ID) that, like cookies and pixel tags, allow us and our service providers to identify your mobile device over time for advertising purposes.</P>
          <H4>Third-party plugins</H4>
          <P>The Site may include plugins from other companies, including social media companies (e.g., LinkedIn). These plugins may collect information, such as information about the pages you visit, and share it with the company that created the plugin even if you do not click on the plugin. These third-party plugins are governed by the privacy policies and terms of the companies that created them.</P>
          <H4>Third-party online tracking</H4>
          <P>We may partner with certain third parties to collect, analyze, and use some of the personal and other information described in this Notice. For example, we may allow third parties to set pixels through the Site. This information may be used for a variety of purposes, including analytics and interest-based advertising.</P>
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
          <P>We may share your information with third parties for a variety of purposes, as described below. You may review PlanetMatrix&rsquo;s third party subprocessors list on our website.</P>
          <H4>Referring third parties</H4>
          <P>If you were referred to PlanetMatrix by another user who has requested access to data about your Company (a &ldquo;Referring Third Party&rdquo;), the information you input about your Company through the platform may be shared with the Referring Third Party.</P>
          <H4>Third-party service providers</H4>
          <P>PlanetMatrix uses third-party service providers that perform services on our behalf, including web-hosting companies, and mailing vendors. These service providers may collect and/or use your information, including information that identifies you personally, to assist us in achieving the purposes discussed above.</P>
          <P>We may also share your information with third parties when necessary to fulfill your requests for Services; to complete a transaction that you initiate; to meet the terms of any agreement that you have with us or our partners; or to manage our business.</P>
          <H4>Analytics</H4>
          <P>We partner with certain third parties to obtain the automatically collected information discussed above and to engage in analysis, auditing, research, and reporting. These third parties may use pixels or server logs, and they may set and/or access device IDs and IP addresses from your device. In particular, the Site uses Google Analytics to help collect and analyze certain information for the purposes discussed above. You may opt out of the use of cookies by Google Analytics here.</P>
          <H4>Interest-based advertising</H4>
          <P>The Site enables third-party tracking mechanisms to collect information about you and your computing devices for use in online interest-based advertising. For example, third parties, such as Facebook, may use the fact that you visited our Site to target online ads to you about our Services. In addition, our third-party advertising networks might use information about your use of our Site to help target advertisements based on your mobile activity in general.</P>
          <P>For information about interest-based advertising practices, including privacy and confidentiality, please visit the Network Advertising Initiative website or the Digital Advertising Alliance website.</P>
          <P>The use of online tracking mechanisms by third parties is subject to those third parties&rsquo; own privacy policies, and not this Notice. If you prefer to prevent third parties from setting and accessing cookies on your computer or other device, you may set your browser to block cookies. Additionally, you may remove yourself from the targeted advertising of companies within the Network Advertising Initiative by opting out, or of companies participating in the Digital Advertising Alliance by opting out.</P>
          <P>Although the Site currently does not respond to &ldquo;do not track&rdquo; browser headers, you can limit tracking through these third-party programs and by taking the other steps discussed above.</P>
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
          <P>You may view a current list of PlanetMatrix&rsquo;s third party subprocessors on our website.</P>

          <H2>8. Data Retention</H2>
          <P>We retain personal information about you necessary to fulfill the purpose for which that information was collected or as required or permitted by law. We do not retain personal information longer than is necessary for us to achieve the purposes for which we collected it. When we destroy your personal information, we do so in a way that prevents that information from being restored or reconstructed.</P>

          <H2>9. Data Security</H2>
          <P>We employ physical, technical, and administrative procedures to safeguard the personal information we collect both online and offline. However, no website or platform is 100% secure, and we cannot ensure or warrant the security of any information you transmit to the Services or to us, and you transmit such information at your own risk to the fullest extent permitted by applicable law.</P>
          <P>If you would like more information about PlanetMatrix&rsquo;s data security practices, visit PlanetMatrix&rsquo;s Trust Center.</P>

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
            <li>The right to lodge a complaint to your local data protection authority</li>
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
          <H4>Supervising Authority in the UK</H4>
          <P>
            Information Commissioner&rsquo;s Office (ICO)<br />
            Website: ico.org.uk<br />
            Phone: +44 303 123 1113<br />
            Email: casework@ico.org.uk<br />
            Postal Address: Information Commissioner&rsquo;s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF
          </P>
          <H4>Supervising Authority in the EU</H4>
          <P>Please refer to the relevant supervisory authority in your EU member state. A list of supervisory authorities can be found here.</P>
          <H4>Data Protection Point of Contact</H4>
          <P>PlanetMatrix, Inc., together with its group companies has a named Data Protection Point of Contact which is Katy Jamieson, Senior Corporate Counsel. Data subjects may contact our Data Protection Point of Contact at: <Mail /> with any questions, concerns, or requests relating to this Privacy Notice or PlanetMatrix&rsquo;s processing of personal information.</P>
          <H4>EU Representative</H4>
          <P>Where required under Article 27 of the General Data Protection Regulation (&ldquo;GDPR&rdquo;), PlanetMatrix, Inc. has appointed Atlas Metrics GmbH, as its representative in the European Union. Atlas Metrics GmbH can be contacted c/o Noerr PartG mbB, Charlottenstra&szlig;e 57, 10117 Berlin, Germany and <Mail />. The EU representative acts as PlanetMatrix&rsquo;s point of contact for data subjects and supervisory authorities in the European Union in relation to the processing of personal data under this Privacy Notice. The EU representative may be contacted at <Mail />, which is monitored for global data protection inquiries.</P>
          <H4>UK Representative</H4>
          <P>Where required under Article 27 of the United Kingdom General Data Protection Regulation (&ldquo;UK GDPR&rdquo;), PlanetMatrix, Inc. has appointed PlanetMatrix UK Ltd, as its representative in the United Kingdom. PlanetMatrix UK Ltd can be contacted at Copthall House 14-18 Copthall Avenue, 5th Floor, London, England, EC2R 7DJ and <Mail />. The UK representative acts as PlanetMatrix&rsquo;s point of contact for data subjects and the UK Information Commissioner&rsquo;s Office (&ldquo;ICO&rdquo;) in relation to the processing of personal data under this Privacy Notice.</P>
          <P>These appointments apply where PlanetMatrix is subject to the GDPR or UK GDPR in relation to its processing activities.</P>

          <H3>12.2 U.S. Residents</H3>
          <P>This section applies to residents of U.S. states with applicable privacy laws, including California, Colorado, Connecticut, Utah, and Virginia.</P>
          <H4>Sale and Sharing of Personal Information</H4>
          <P>Certain U.S. state privacy laws, including the California Consumer Privacy Act as amended by the California Privacy Rights Act (&ldquo;CPRA&rdquo;), define &ldquo;sale&rdquo; as the disclosure of personal information to a third party for monetary or other valuable consideration, and &ldquo;sharing&rdquo; as the disclosure of personal information for cross-context behavioral advertising.</P>
          <P>PlanetMatrix does not sell personal information in exchange for monetary consideration. However, we may share certain identifiers and online activity information (such as IP address, device identifiers, and interactions with our Site) with analytics and advertising partners in a manner that may be considered &ldquo;sharing&rdquo; under California law.</P>
          <P>You have the right to opt out of the sale or sharing of your personal information. You may exercise this right by contacting us at <Mail /> or by using any available cookie preference tools provided on our Site.</P>
          <H4>Sensitive Personal Information</H4>
          <P>We do not use or disclose sensitive personal information for purposes other than those permitted under applicable law. We do not use sensitive personal information to infer characteristics about individuals.</P>
          <P>If we process sensitive personal information as defined under applicable law, we do so only for limited and permitted purposes, including providing and securing our Services, complying with legal obligations, and maintaining the integrity of our systems.</P>
          <H4>Retention of Personal Information</H4>
          <P>We retain personal information for as long as reasonably necessary to fulfill the purposes described in this Privacy Notice, including:</P>
          <UL>
            <li>The duration of our contractual relationship with you or your organization</li>
            <li>Compliance with legal and regulatory obligations</li>
            <li>Resolution of disputes</li>
            <li>Enforcement of agreements</li>
            <li>Protection against fraud and security risks</li>
          </UL>
          <P>Retention periods may vary depending on the nature of the information and the context in which it was collected.</P>
          <H4>Your Rights Under U.S. State Privacy Laws</H4>
          <P>Depending on your state of residence, you may have the right to:</P>
          <UL>
            <li>Confirm whether we process your personal information</li>
            <li>Access and obtain a copy of your personal information</li>
            <li>Correct inaccuracies in your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Obtain a portable copy of your personal information</li>
            <li>Opt out of the sale or sharing of personal information</li>
            <li>Opt out of targeted advertising</li>
            <li>Opt out of profiling in furtherance of decisions that produce legal or similarly significant effects (if applicable)</li>
          </UL>
          <P>To exercise your rights, please contact us at <Mail />. We may take reasonable steps to verify your identity before fulfilling your request.</P>
          <H4>Authorized Agents</H4>
          <P>You may designate an authorized agent to submit a request on your behalf where permitted by law. We may require proof of written authorization from you and may require you to verify your identity directly with us.</P>
          <H4>Non-Discrimination</H4>
          <P>We will not discriminate against you for exercising any of your privacy rights under applicable law. This means we will not deny you services, charge you different prices, or provide a different level or quality of services solely because you exercised your rights.</P>

          <H3>12.3 Singapore</H3>
          <P>This section applies to individuals whose personal data is subject to the Singapore Personal Data Protection Act (&ldquo;PDPA&rdquo;).</P>
          <H4>Supervising Authority in Singapore</H4>
          <P>
            Personal Data Protection Commissioner (PDPC)<br />
            Website: pdpc.gov.sg<br />
            Phone: +65 6325 5100<br />
            Email: pdpc@pdpc.gov.sg<br />
            Postal Address: Personal Data Protection Commission, 10 Anson Road, 05-01, Singapore 079903
          </P>
          <H4>Purpose Limitation</H4>
          <P>PlanetMatrix collects, uses, and discloses personal data only for purposes that a reasonable person would consider appropriate in the circumstances and that have been notified to you in this Privacy Notice or otherwise at the time of collection. We do not collect, use, or disclose personal data for purposes other than those for which consent has been obtained, unless permitted or required by applicable law.</P>
          <H4>Consent and Deemed Consent</H4>
          <P>Where required under the PDPA, we obtain your consent before collecting, using, or disclosing your personal data. Consent may be deemed under applicable law where you voluntarily provide personal data for a notified purpose and it is reasonable that you would do so.</P>
          <P>You may withdraw your consent at any time by contacting us at <Mail />. Upon receiving a request to withdraw consent, we will inform you of the likely consequences of withdrawal and will cease processing your personal data unless otherwise permitted or required by law.</P>
          <H4>Overseas Transfers</H4>
          <P>Where we transfer personal data outside of Singapore, we take appropriate steps to ensure that the recipient provides a standard of protection that is comparable to that under the PDPA. Such measures may include contractual safeguards and other legally recognized mechanisms.</P>
          <H4>Retention Limitation</H4>
          <P>We cease to retain personal data, or remove the means by which the data can be associated with particular individuals, as soon as it is reasonable to assume that:</P>
          <P>(a) the purpose for which the personal data was collected is no longer being served by retention; and</P>
          <P>(b) retention is no longer necessary for legal or business purposes.</P>
          <H4>Access and Correction</H4>
          <P>You may request access to personal data that we hold about you and information about how it has been used or disclosed within the past year, subject to applicable exceptions under the PDPA. You may also request correction of inaccuracies in your personal data.</P>

          <H2>13. External Links</H2>
          <P>The Site may contain links to third-party websites. If you use these links, you will leave the Site. We have not reviewed these third-party sites and do not control and are not responsible for any of these sites, their content, or their privacy policy. Thus, we do not endorse or make any representations about them, or any information, software, or other products or materials found there, or any results that may be obtained from using them. If you decide to access any of the third-party sites listed on our website, you do so at your own risk.</P>

          <H2>14. How to Contact Us</H2>
          <P>
            PlanetMatrix, Inc.<br />
            54 W 21st Street<br />
            Suite 1201<br />
            New York, NY 10010
          </P>
          <P><Mail /></P>

          <H2>15. Changes to this Notice</H2>
          <P>We may make changes to the Services in the future and as a consequence may need to revise this Notice to reflect those changes. We will post all such changes here, so you should review this page periodically.</P>

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
