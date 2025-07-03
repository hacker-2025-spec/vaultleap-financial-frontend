export const PRIVACY_POLICY_TEXT = {
  sections: [
    {
      title: "PRIVACY POLICY",
      content: "Last Updated: April 21, 2025",
    },
    {
      title: "Introduction",
      content: `Klydo LLC ("Klydo", "We", "Us", or "Our") is committed to protecting your privacy. This Privacy Policy, together with our `,
      hyperlink: {
        text: "Terms of Service",
        href: "/terms-of-service",
      },
      continuation: `, governs our collection, use, and disclosure of your personal information when you use our website, vaultleap.com (the "Website"), and any associated services, including the VaultLeap Platform (collectively, the "Services").

By accessing or using the Services, you signify that you have read, understood, and agree to be bound by this Privacy Policy and our Terms of Service. If you do not agree with this Privacy Policy or our Terms of Service, you must not access or use the Services.`,
    },
    {
      title: "1. INFORMATION COLLECTION PRACTICES",
      content: `1.1. Banking and Financial Services Data
To enable the Platform's banking interface functionality, we collect:

1.1.1. Account Establishment Data
Information required by financial institution partners to establish and maintain banking presence, including but not limited to: legal name, residential address, date of birth, tax identification number, nationality, and government-issued identification documentation.

1.1.2. Transaction Data
Information regarding banking transactions, including but not limited to: payment amounts, timestamps, counterparty identifiers, routing information, and transaction purposes.

1.1.3. Compliance Documentation
Information required to comply with applicable anti-money laundering, know-your-customer, and counter-terrorist financing requirements.

1.1.4. Financial Institution Information
Banking details, account numbers, routing numbers, and associated metadata required for ACH/SEPA transaction processing.

1.2. Stablecoin Conversion Data
To facilitate currency protection functionality, we collect:

1.2.1. Wallet Addresses
Public blockchain addresses (but expressly excluding private keys, seed phrases, or other authentication credentials).

1.2.2. Transaction Records
Data regarding conversion transactions between fiat and stablecoin assets, including but not limited to: amounts, timestamps, fee calculations, and transaction identifiers.

1.2.3. Blockchain Interaction Data
Information regarding user interaction with blockchain protocols, including transaction hashes, smart contract function calls, and network identifiers.

1.3. User Communications and Support Data
When you communicate with us, we collect:

1.3.1. Communication Content
Information contained in emails, support tickets, feedback forms, or other communications.

1.3.2. Communication Metadata
Information about the communication itself, including timestamps, contact methods, and related identifiers.

1.3.3. Support Documentation
Information provided in connection with support requests, including screenshots, error messages, or transaction details.

1.4. Device and Usage Data
When you access the Services, we automatically collect:

1.4.1. Device Information
Information about your device, including hardware model, operating system, unique device identifiers, mobile network information, and preferred language.

1.4.2. Log Data
Server logs, IP addresses, access times, pages viewed, features used, and other system activity.

1.4.3. Location Information
General location information inferred from IP address or other network identifiers.

1.4.4. Usage Patterns
Information about how you interact with the Services, including click-through rates, feature engagement, and session durations.

1.5. Excluded Data
We expressly do not collect:

1.5.1. Private Keys
We do not request, access, store, or transmit private keys, seed phrases, or other cryptographic credentials that would enable control of digital assets.

1.5.2. Wallet Authentication Data
We do not collect passwords, PIN codes, or biometric data used to access external wallets.

1.5.3. Third-Party Financial Credentials
We do not store credentials for financial accounts outside the VaultLeap ecosystem except as strictly necessary for authorized integration purposes.`,
    },
    {
      title: "2. INFORMATION UTILIZATION PRACTICES",
      content: `2.1. Banking Interface Operations
We utilize Personal Data to:

2.1.1. Establish and maintain banking relationships with regulated financial institution partners.
2.1.2. Facilitate reception and processing of ACH/SEPA payments.
2.1.3. Generate and maintain compliant documentation for tax and regulatory purposes.
2.1.4. Authenticate and authorize banking transactions.
2.1.5. Monitor for suspicious activity in accordance with regulatory requirements.
2.1.6. Resolve transaction disputes, errors, or operational issues.

2.2. Currency Protection Operations
We utilize Personal Data to:

2.2.1. Facilitate conversion between fiat currency and stablecoin assets.
2.2.2. Execute blockchain transactions for currency protection purposes.
2.2.3. Monitor conversion operations for security and compliance purposes.
2.2.4. Calculate and apply applicable conversion fees.
2.2.5. Generate transaction confirmations and receipts.
2.2.6. Provide transaction histories and account statements.

2.3. Compliance Operations
We utilize Personal Data to:

2.3.1. Verify user identity in accordance with applicable know-your-customer requirements.
2.3.2. Screen against sanctions lists and politically exposed persons databases.
2.3.3. Detect and prevent fraud, money laundering, terrorist financing, and other illicit activities.
2.3.4. Generate regulatory reports as required by applicable law.
2.3.5. Respond to legitimate law enforcement requests in accordance with due process.

2.4. Service Improvement and Analytics
We utilize Personal Data to:

2.4.1. Analyze usage patterns and feature engagement.
2.4.2. Identify and resolve technical issues.
2.4.3. Develop new features and services.
2.4.4. Optimize user experience and interface design.
2.4.5. Conduct market research and trend analysis.

2.5. Communications and Support
We utilize Personal Data to:

2.5.1. Respond to inquiries and support requests.
2.5.2. Provide important service updates and security alerts.
2.5.3. Deliver transactional notifications and confirmations.
2.5.4. Communicate regarding account status and activity.
2.5.5. Share information about relevant features and services.`,
    },
    {
      title: "Retention of Your Personal Data",
      content: `Klydo will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy.We will retain and use your Personal Data to the extent necessary to comply with Our legal obligations(for example, if We are required to retain your data to comply with applicable laws), resolve disputes, and enforce Our legal agreements and policies.`,
    },
    {
      title: "Blockchain and Smart Contracts",
      content: `The Vaultleap Platform operates on blockchain technology, and transactions related to Vaults are facilitated by smart contracts.Due to the decentralized nature of blockchain, certain data and transactions may remain on the blockchain even after the termination of your Account or the removal of User Content.`,
    },
    {
      title: "Disclosure of Your Personal Data",
      content: `We may share your Personal Data in the following situations:
- With service providers and professional advisors to help provide the Service, comply with legal and regulatory requirements, and for other business purposes.
- With affiliates, business partners, and advertising partners.
- With other users when you share Personal Data or otherwise interact in the public areas with other users.
- In connection with business transactions such as mergers, acquisitions, or asset sales.
- To law enforcement, government officials, or other third parties, if required by law or to protect Our rights and interests.`,
    },
    {
      title: "Security of Your Personal Data",
      content: `We follow generally accepted industry standards to protect the Personal Data you submit to Us, with particular attention to sensitive information such as Social Security Numbers(SSN) and other tax - related data.We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption, pseudonymization, and strict access controls.However, no method of transmission over the Internet or electronic storage is 100 % secure.While We strive to use commercially acceptable means to protect your Personal Data, We cannot guarantee its absolute security.`,
    },
    {
      title: "Security Architecture",
      content: `Security Architecture and Asset Independence

The Vaultleap Platform implements distinct security domains:
1. Blockchain Asset Security
   User-Controlled:
   - On-chain asset custody
   - Private key management
   - Transaction authorization
   - Smart contract interaction

2. Platform Security
   Interface Protection:
   - Access control systems
   - Data encryption protocols
   - Communication security
   - Interface protection

3. Security Boundaries
   Clear Separation:
   - No cross-domain control
   - Independent security systems
   - Distinct authorization mechanisms
   - Separate operational protocols

4. Security Limitations
   Platform Cannot:
   - Bridge security domains
   - Override blockchain security
   - Access user assets
   - Modify blockchain state`,
    },
    {
      title: "International Transfer of Your Personal Data",
      content: `Your information, including Personal Data, is processed at Klydo's operating offices and in any other places where the parties involved in the processing are located. This means that your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction, including the United States, where the data protection laws may differ from those in your jurisdiction. By using the Service, you are consenting to the transfer of your Personal Data.`,
    },
    {
      title: "Cookies",
      content: `At Klydo, we utilize various tracking technologies and cookies to enhance your experience on our platform and gather valuable insights into its usage. These technologies enable us to improve and analyze our service while ensuring its functionality and security. Here's an overview of the tracking technologies we employ:

Cookies: Cookies are small files stored on your device that help us track your activity on our service and store certain information. You can manage your cookie preferences through your browser settings. Please note that refusing cookies may impact certain features of our service.

Web Beacons: We may also utilize web beacons, which are small electronic files embedded in certain sections of our service and emails. These beacons allow us to track user interactions, such as page visits or email opens, and gather related website statistics.

Cookies can be categorized as "Persistent" or "Session" cookies:
- Necessary / Essential Cookies: These cookies are essential for providing you with services available through our platform and enabling you to utilize its features. They help authenticate users and prevent fraudulent use of user accounts.

- Cookies Policy / Notice Acceptance Cookies: These persistent cookies indicate whether users have accepted the use of cookies on our platform.

- Functionality Cookies: Our persistent functionality cookies remember your preferences and choices while using our platform, such as login details or language preferences. They aim to provide you with a personalized experience and eliminate the need to re-enter preferences.

- Tracking and Performance Cookies: Administered by third parties, these persistent cookies track information about website traffic and user behavior. The data collected may indirectly or directly identify you and is often linked to a pseudonymous identifier associated with your device. We may also use these cookies to test new features or functionalities and gauge user reactions.

Your privacy and control over your data are important to us. If you have any questions or concerns about our use of tracking technologies and cookies, please contact us at support@klydo.io`,
    },
    {
      title: "Your Rights",
      content: `Depending on your location and subject to applicable law, you may have the right to:
- Request access to or deletion of your Personal Data.
- Object to or restrict the processing of your Personal Data.
- Request correction of inaccurate Personal Data.
- Withdraw your consent to the processing of your Personal Data.
- Request the transfer of your Personal Data to another party.

To exercise these rights, please contact Us as set forth below.`,

      continuation: `\n\nConsent to Electronic Delivery of Tax Forms
By using the Service and providing your tax-related information, you consent to receive your tax forms (such as 1099 forms) electronically. You have the right to withdraw your consent to electronic delivery at any time by contacting Us as set forth below. If you withdraw your consent, We will provide you with paper copies of your tax forms.

Retracting Consent for Electronic Delivery of Tax Forms
You have the right to retract your consent for electronic delivery of tax forms (such as 1099 forms) at any time. If you wish to receive your tax forms via USPS mail instead of electronically, please contact us at support@klydo.io with the subject line "Tax Form Delivery Preference Change". Please provide your full name, account email address, and mailing address in your request. We will process your request and send future tax forms via USPS mail to the address you provide.

Requesting Personal Data (GDPR)
If you are a resident of the European Economic Area (EEA) or another jurisdiction with similar data protection laws, you have the right to request access to the personal data we hold about you. To exercise this right, please contact us at support@klydo.io with the subject line "Personal Data Access Request". We will respond to your request within 30 days and provide you with a copy of the personal data we hold about you in a structured, commonly used, and machine-readable format.

Requesting Deletion of Personal Data (GDPR)
If you are a resident of the EEA or another jurisdiction with similar data protection laws, you have the right to request the deletion of your personal data from our systems. To exercise this right, please contact us at support@klydo.io with the subject line "Personal Data Deletion Request". We will process your request within 30 days, subject to any legal obligations that may require us to retain certain information. Please note that deleting your personal data may affect your ability to use our services.`,
    },
    {
      title: "Children's Privacy",
      content: `Our Service does not address anyone under the age of 18. We do not knowingly collect Personal Data from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, We take steps to remove that information from Our servers.`,
    },
    {
      title: "Links to Other Websites",
      content: `Our Service may contain links to other websites that are not operated by Us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`,
    },
    {
      title: "Changes to this Privacy Policy",
      content: `We reserve the right to amend Our Privacy Policy at any time and as needed. When We update Our Privacy Policy, We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of the Privacy Policy. Your continued use of the Service following the posting of changes constitutes your acceptance of such changes.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy, our data practices, if you wish to exercise your data protection rights, please contact us at:

Email:
support@klydo.io

Mailing Address:
Klydo LLC
PMB 1066
447 Sutter St, Ste 405
San Francisco, CA 94108`,
    },
  ],
}
