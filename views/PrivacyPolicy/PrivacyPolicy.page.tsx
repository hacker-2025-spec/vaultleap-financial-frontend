import { Link } from '@tanstack/react-router'
import { Typography } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'

export const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-48 max-w-4xl">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Typography variant="h1" className="mb-2">
              PRIVACY POLICY
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              Last Updated: April 21, 2025
            </Typography>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <Typography variant="h2" className="mb-4">
                Introduction
              </Typography>
              <Typography variant="p" className="text-muted-foreground leading-loose mb-4">
                Klydo LLC ("Klydo", "We", "Us", or "Our") is committed to protecting your privacy. This Privacy Policy, 
                together with our{' '}
                <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>, governs 
                our collection, use, and disclosure of your personal information when you use our website, vaultleap.com 
                (the "Website"), and any associated services, including the VaultLeap Platform (collectively, the "Services").
              </Typography>
              <Typography variant="p" className="text-muted-foreground leading-loose">
                By accessing or using the Services, you signify that you have read, understood, and agree to be bound by 
                this Privacy Policy and our Terms of Service. If you do not agree with this Privacy Policy or our Terms of 
                Service, you must not access or use the Services.
              </Typography>
            </section>

            {/* Section 1 */}
            <section>
              <Typography variant="h2" className="mb-4">
                1. INFORMATION COLLECTION PRACTICES
              </Typography>
              
              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  1.1. Banking and Financial Services Data
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  To enable the Platform's banking interface functionality, we collect:
                </Typography>
                
                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.1.1. Account Establishment Data
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information required by financial institution partners to establish and maintain banking presence, 
                      including but not limited to: legal name, residential address, date of birth, tax identification number, 
                      nationality, and government-issued identification documentation.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.1.2. Transaction Data
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information regarding banking transactions, including but not limited to: payment amounts, timestamps, 
                      counterparty identifiers, routing information, and transaction purposes.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.1.3. Compliance Documentation
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information required to comply with applicable anti-money laundering, know-your-customer, and 
                      counter-terrorist financing requirements.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.1.4. Financial Institution Information
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Banking details, account numbers, routing numbers, and associated metadata required for ACH/SEPA 
                      transaction processing.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  1.2. Stablecoin Conversion Data
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  To facilitate currency protection functionality, we collect:
                </Typography>
                
                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.2.1. Wallet Addresses
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Public blockchain addresses (but expressly excluding private keys, seed phrases, or other authentication credentials).
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.2.2. Transaction Records
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Data regarding conversion transactions between fiat and stablecoin assets, including but not limited to: 
                      amounts, timestamps, fee calculations, and transaction identifiers.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.2.3. Blockchain Interaction Data
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information regarding user interaction with blockchain protocols, including transaction hashes, smart 
                      contract function calls, and network identifiers.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  1.3. User Communications and Support Data
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  When you communicate with us, we collect:
                </Typography>

                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.3.1. Communication Content
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information contained in emails, support tickets, feedback forms, or other communications.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.3.2. Communication Metadata
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information about the communication itself, including timestamps, contact methods, and related identifiers.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.3.3. Support Documentation
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information provided in connection with support requests, including screenshots, error messages, or transaction details.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  1.4. Device and Usage Data
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  When you access the Services, we automatically collect:
                </Typography>

                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.4.1. Device Information
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information about your device, including hardware model, operating system, unique device identifiers,
                      mobile network information, and preferred language.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.4.2. Log Data
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Server logs, IP addresses, access times, pages viewed, features used, and other system activity.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.4.3. Location Information
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      General location information inferred from IP address or other network identifiers.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.4.4. Usage Patterns
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Information about how you interact with the Services, including click-through rates, feature engagement,
                      and session durations.
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  1.5. Excluded Data
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We expressly do not collect:
                </Typography>

                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.5.1. Private Keys
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      We do not request, access, store, or transmit private keys, seed phrases, or other cryptographic
                      credentials that would enable control of digital assets.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.5.2. Wallet Authentication Data
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      We do not collect passwords, PIN codes, or biometric data used to access external wallets.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      1.5.3. Third-Party Financial Credentials
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      We do not store credentials for financial accounts outside the VaultLeap ecosystem except as strictly
                      necessary for authorized integration purposes.
                    </Typography>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <Typography variant="h2" className="mb-4">
                2. INFORMATION UTILIZATION PRACTICES
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  2.1. Banking Interface Operations
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We utilize Personal Data to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Establish and maintain banking relationships with regulated financial institution partners.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Facilitate reception and processing of ACH/SEPA payments.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Generate and maintain compliant documentation for tax and regulatory purposes.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Authenticate and authorize banking transactions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Monitor for suspicious activity in accordance with regulatory requirements.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Resolve transaction disputes, errors, or operational issues.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  2.2. Currency Protection Operations
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We utilize Personal Data to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Facilitate conversion between fiat currency and stablecoin assets.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Execute blockchain transactions for currency protection purposes.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Monitor conversion operations for security and compliance purposes.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Calculate and apply applicable conversion fees.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Generate transaction confirmations and receipts.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Provide transaction histories and account statements.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  2.3. Compliance Operations
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We utilize Personal Data to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Verify user identity in accordance with applicable know-your-customer requirements.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Screen against sanctions lists and politically exposed persons databases.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Detect and prevent fraud, money laundering, terrorist financing, and other illicit activities.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Generate regulatory reports as required by applicable law.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Respond to legitimate law enforcement requests in accordance with due process.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  2.4. Service Improvement and Analytics
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We utilize Personal Data to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Analyze usage patterns and feature engagement.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Identify and resolve technical issues.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Develop new features and services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Optimize user experience and interface design.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Conduct market research and trend analysis.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  2.5. Communications and Support
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We utilize Personal Data to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Respond to inquiries and support requests.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Provide important service updates and security alerts.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Deliver transactional notifications and confirmations.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Communicate regarding account status and activity.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Share information about relevant features and services.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <Typography variant="h2" className="mb-4">
                3. INFORMATION SHARING PRACTICES
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  3.1. Financial Institution Partners
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We share Personal Data with regulated financial institution partners as necessary to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Establish and maintain banking infrastructure.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Process ACH/SEPA transactions.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Comply with applicable banking regulations.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Facilitate payment processing and settlement.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  3.2. Service Providers
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We share Personal Data with third-party service providers who perform services on our behalf, including:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Identity verification and KYC/AML compliance providers.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Fraud detection and prevention services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Customer support and communication platforms.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Cloud infrastructure and hosting providers.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Analytics and monitoring services.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Professional service providers, such as auditors, legal counsel, and consultants.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  3.3. Legal and Regulatory Disclosures
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We may disclose Personal Data:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      In response to valid legal process, including subpoenas, court orders, or legal requests from government authorities.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      To comply with applicable laws, regulations, or legal obligations.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      To protect our rights, property, or safety, or the rights, property, or safety of others.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      In connection with an investigation of suspected or actual illegal activity.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      To respond to an emergency that we believe in good faith requires disclosure.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  3.4. Business Transfers
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  In the event of a merger, acquisition, reorganization, bankruptcy, or other similar event, your Personal Data
                  may be transferred or shared with the successor entity or new owner.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  3.5. With Your Consent
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  We may share your Personal Data with third parties when you have given us your consent to do so.
                </Typography>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <Typography variant="h2" className="mb-4">
                4. INFORMATION SECURITY FRAMEWORK
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  4.1. Security Architecture
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We implement enterprise-grade security measures appropriate for financial technology systems processing sensitive data, including:
                </Typography>

                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      4.1.1. Banking Infrastructure Security
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Implementation of industry-standard encryption protocols for banking data in transit and at rest, secure API
                      connections with banking partners, multi-factor authentication mechanisms, and least-privilege access controls for employees.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      4.1.2. Blockchain Infrastructure Security
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Secure processing of conversion transactions with appropriate key management practices, transaction signing
                      verification, and secure communication channels with blockchain networks.
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      4.1.3. System Segregation
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Technical and operational separation between banking and blockchain infrastructures with appropriate security
                      boundaries, access controls, and monitoring systems.
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  4.2. Security Measures
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  We implement appropriate technical and organizational security measures designed to protect the Personal Data we process.
                  These measures are intended to provide a level of security appropriate to the risk of processing your Personal Data.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  4.3. Security Program
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We maintain a security program that includes:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Regular assessment of our security practices
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Monitoring for potential vulnerabilities
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Implementation of security controls appropriate to the nature of the data we process
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Incident response procedures
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  4.4. Security Testing
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  We maintain a robust security testing program, including:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Regular penetration testing by independent security firms
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Continuous vulnerability scanning and remediation
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Code security reviews and secure development lifecycle processes
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Incident response simulation exercises
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  4.5. User Security Responsibilities
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  User acknowledges responsibility for:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Maintaining the security of account credentials
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Securing any private keys for associated wallets
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Using secure devices and networks when accessing the Platform
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Promptly reporting any unauthorized access or suspicious activity
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Help Center Link */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <Typography variant="h3" className="mb-3">
                Questions About Our Privacy Practices?
              </Typography>
              <Typography variant="p" className="text-muted-foreground leading-loose mb-4">
                For more information about how VaultLeap protects your data and maintains security,
                visit our comprehensive Help Center.
              </Typography>
              <Link
                to="/help-center"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Help Center
              </Link>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
