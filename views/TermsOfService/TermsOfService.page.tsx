import { Link } from '@tanstack/react-router'
import { Typography } from '@/components/ui/typography'
import { Card, CardContent } from '@/components/ui/card'

export const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto px-4 py-48 max-w-4xl">
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Typography variant="h1" className="mb-2">
              TERMS OF SERVICE
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              Last Updated: April 21, 2025
            </Typography>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <Typography variant="h2" className="mb-4">
                1. INTRODUCTION
              </Typography>
              <Typography variant="p" className="text-muted-foreground leading-loose mb-4">
                These Terms of Service (the "Terms") constitute a legally binding agreement between you ("User," "you," or "your") 
                and Klydo, LLC ("Klydo," "we," "us," or "our"), governing your access to and use of the VaultLeap website located at 
                vaultleap.com, and all related tools, mobile applications, web applications, APIs, and other services offered by or 
                associated with Klydo (collectively, the "VaultLeap Platform" or the "Services").
              </Typography>
              <Typography variant="p" className="text-muted-foreground leading-loose">
                By accessing, browsing, or using the Services, creating an account, or by initiating any transactions on the VaultLeap 
                Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our{' '}
                <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which is incorporated herein 
                by reference. If you do not agree to these Terms, you must not access or use the Services.
              </Typography>
            </section>

            {/* Section 2 */}
            <section>
              <Typography variant="h2" className="mb-4">
                2. VAULTLEAP PLATFORM SERVICES
              </Typography>
              
              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  2.1. Nature of Services.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  The VaultLeap Platform ("Platform") constitutes a proprietary financial technology interface that enables authorized users to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      establish and utilize United States Dollar and Euro banking infrastructure;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      receive payments via ACH and SEPA mechanisms;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      effectuate automated conversion between fiat currency and digital stablecoin assets (including but not limited to USDC and EURC); and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      execute cross-border payment transfers through a unified technological infrastructure.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  2.2. Eligibility and Access Requirements.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  Utilization of the Platform requires:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      establishment and maintenance of an authorized VaultLeap account;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      successful completion of all applicable identity verification and know-your-customer protocols as mandated by relevant regulatory frameworks;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      connection of compatible digital asset storage solutions where applicable; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      ongoing compliance with all Platform policies and applicable regulations.
                    </Typography>
                  </li>
                </ul>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Klydo reserves the right to modify eligibility requirements at its sole discretion.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  2.3. Non-Banking Status.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  User expressly acknowledges that Klydo is not a bank, financial institution, money services business, or money transmitter. 
                  The banking and payment infrastructure accessible through the Platform is provided through contractual arrangements with 
                  regulated financial institution partners. Klydo's role is limited to providing technological interface services that connect 
                  users with said regulated entities and digital asset infrastructure.
                </Typography>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <Typography variant="h2" className="mb-4">
                3. ELIGIBILITY AND ACCOUNT CREATION
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  3.1. Eligibility.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  To access and use the Services, you represent and warrant that you are at least 18 years old and have the legal
                  capacity to enter into these Terms. You further represent and warrant that you are not barred from using the Services
                  under any applicable law, including the laws of the United States or any other jurisdiction from which you may access
                  the Services.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  3.2. Account Creation and Verification.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  To utilize the VaultLeap Platform's services, you must:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Create a secure account with accurate identification information;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Complete identity verification processes as required by applicable regulations;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Provide necessary documentation for KYC (Know Your Customer) compliance;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Maintain current contact and banking details; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Update information promptly when changed.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  3.3. Security Responsibilities.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  You are solely responsible for:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Maintaining the security of your account credentials;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Protecting access to any connected wallets or banking accounts;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Ensuring that all activities occurring under your account are authorized by you; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Notifying us immediately of any unauthorized use or security breach.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <Typography variant="h2" className="mb-4">
                4. PLATFORM ARCHITECTURE AND OPERATIONS
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  4.1. Dual-System Infrastructure.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  The Platform employs a proprietary dual-system architecture:
                </Typography>

                <div className="mb-4">
                  <Typography variant="h4" className="mb-2">
                    4.1.1. Banking Interface System.
                  </Typography>
                  <Typography variant="p" className="text-muted-foreground leading-loose">
                    Provides users with access to banking infrastructure through partnerships with regulated financial institutions,
                    enabling ACH/SEPA payment receipt, compliant documentation, and fiat currency transfers.
                  </Typography>
                </div>

                <div className="mb-4">
                  <Typography variant="h4" className="mb-2">
                    4.1.2. Currency Protection System.
                  </Typography>
                  <Typography variant="p" className="text-muted-foreground leading-loose">
                    Facilitates automated conversion between fiat currency and stablecoin digital assets, enabling value preservation
                    against local currency volatility, with assets secured through non-custodial blockchain infrastructure.
                  </Typography>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  4.2. Operational Independence.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  The Banking Interface System and Currency Protection System operate as independent technological infrastructures with
                  distinct security architectures, operational frameworks, and regulatory considerations. User acknowledges that:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Banking operations are subject to the terms, conditions, processing times, and regulatory requirements of our banking partners;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Stablecoin operations execute independently on applicable blockchain networks and are subject to network conditions, validator consensus, and protocol governance;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Klydo maintains appropriate technological firewalls between systems while enabling interoperability for user convenience; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Each system maintains independent compliance frameworks appropriate to its regulatory classification.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <Typography variant="h2" className="mb-4">
                5. STABLECOIN CURRENCY PROTECTION PROVISIONS
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  5.1. Stablecoin Functionality.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  The Platform facilitates automated conversion between fiat currency and blockchain-based stablecoin assets to
                  mitigate exposure to local currency volatility.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  5.2. Risk Acknowledgment.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  User expressly acknowledges and assumes all risks associated with stablecoin assets, including but not limited to:
                </Typography>

                <div className="space-y-4">
                  <div>
                    <Typography variant="h4" className="mb-2">
                      5.2.1. Issuer Risk.
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Stablecoin value depends on the reserves, financial stability, and operational integrity of third-party issuers
                      over whom Klydo exercises no control;
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      5.2.2. Regulatory Risk.
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Stablecoin assets operate in an evolving regulatory landscape that may impact their availability, functionality,
                      or legal status in various jurisdictions;
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      5.2.3. Technology Risk.
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      Blockchain infrastructure and smart contract systems may contain vulnerabilities or be subject to network
                      congestion, forks, or other technological limitations beyond Klydo's control; and
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="h4" className="mb-2">
                      5.2.4. Market Risk.
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground leading-loose">
                      While designed for stability, stablecoin assets may experience fluctuations in value, liquidity constraints,
                      or redemption limitations.
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  5.3. Non-Custodial Architecture.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  User expressly acknowledges that the Currency Protection System employs non-custodial architecture wherein:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      User maintains exclusive control over private keys and stablecoin assets;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Klydo cannot access, control, freeze, or transfer User's stablecoin assets;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Klydo cannot reverse, modify, or cancel transactions once executed on the blockchain; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      User assumes sole responsibility for private key security.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <Typography variant="h2" className="mb-4">
                6. USER RESPONSIBILITIES AND PROHIBITED ACTIVITIES
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  6.1. User Responsibilities.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  As a user of the Services, you agree to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Complete required verification procedures truthfully and promptly;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Maintain the security of your account credentials and wallet private keys;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Ensure the accuracy of banking and payment information;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Comply with all applicable laws and regulations when using the Services;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Use the Services only for legitimate business or personal financial activities;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Review and understand the functionality of both banking and stablecoin components;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Implement appropriate security measures to protect access to your account and wallet; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Report any unauthorized access or suspicious activity immediately.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  6.2. Prohibited Activities.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  When using the Services, you agree not to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Violate any applicable laws or regulations, including financial regulations and sanctions;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Use the Services for money laundering, terrorist financing, or other illegal activities;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Attempt to circumvent any security measures or verification procedures;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Provide false or misleading information during verification processes;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Interfere with the operation of the Services or underlying systems;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Access or attempt to access other users' accounts or information;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Use the Services to conduct transactions involving prohibited goods or services; or
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Engage in any activity that may disrupt or negatively impact the VaultLeap Platform.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <Typography variant="h2" className="mb-4">
                7. FEES AND PRICING
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  7.1. Fee Structure.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  User agrees to pay all applicable fees associated with the Services as outlined in the current fee schedule
                  available at vaultleap.com/fees, which may be modified from time to time at Klydo's sole discretion.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  7.2. Fee Categories.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  The Platform may assess fees for various services, including but not limited to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Currency conversion fees for transactions between fiat and stablecoin assets;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Transaction fees for payment processing;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Subscription fees for premium features; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Service fees for specialized operations.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  7.3. Third-Party Fees.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  User acknowledges responsibility for any fees imposed by third parties, including but not limited to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Banking fees assessed by financial institution partners;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Blockchain network fees (gas fees) for stablecoin transactions;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Exchange rate spreads in currency conversion; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Fees imposed by external wallet providers or payment processors.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  7.4. Payment of Fees.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Fees will be charged automatically from available balances or through the payment method designated in your
                  account settings. Unpaid fees may result in service limitations or account suspension.
                </Typography>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <Typography variant="h2" className="mb-4">
                8. TAX REPORTING INTERFACE
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  8.1. Collection of Tax Information.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  To comply with applicable tax laws and regulations, Klydo may collect certain personal and sensitive information
                  from users, including but not limited to Social Security Numbers (SSN), tax identification numbers, addresses,
                  and other tax-related information. By using the Services and providing this information, you consent to Klydo's
                  collection, storage, and use of such information for tax reporting purposes.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  8.2. Electronic Delivery of Tax Forms.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Klydo will provide users with the necessary tax forms, such as 1099 forms, electronically. By using the Services,
                  you consent to receive these tax forms electronically and agree to provide Klydo with a valid email address for
                  the delivery of such forms. It is your responsibility to ensure that the email address provided to Klydo is
                  accurate and up-to-date. You have the right to revoke your consent for electronic delivery at any time and
                  request paper copies of your tax forms. For details on how to revoke your consent for electronic delivery,
                  please refer to our Privacy Policy.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  8.3. Accuracy of Tax Information.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  While Klydo will make reasonable efforts to ensure the accuracy of the tax information provided, it is ultimately
                  your responsibility to review and verify the accuracy of your tax forms and information. Klydo shall not be liable
                  for any errors, omissions, or inaccuracies in the tax information provided, or for any tax liabilities, penalties,
                  or interest incurred by you as a result of such errors, omissions, or inaccuracies.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  8.4. Tax Reporting Separation.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  The VaultLeap Platform maintains strict separation between tax reporting functions and blockchain operations:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Tax information is segregated from blockchain operations;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      No connection exists between tax reporting and asset control;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Independent data storage and processing systems are maintained; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Separate security protocols are employed for tax information.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <Typography variant="h2" className="mb-4">
                9. INTELLECTUAL PROPERTY
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  9.1. Ownership.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  All intellectual property rights in the VaultLeap Platform, including but not limited to software, code, interfaces,
                  content, design, structure, and documentation, are owned by Klydo or its licensors. These Terms do not transfer
                  any ownership rights or grant any intellectual property licenses beyond the limited rights expressly set forth herein.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  9.2. Limited License.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Subject to your compliance with these Terms, Klydo grants you a limited, non-exclusive, non-transferable, revocable
                  license to access and use the VaultLeap Platform for your personal or internal business purposes.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  9.3. Restrictions.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  You shall not:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Copy, modify, distribute, sell, or lease any part of the VaultLeap Platform;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Reverse engineer or attempt to extract the source code of the VaultLeap Platform;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Create derivative works based on the VaultLeap Platform;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Remove, obscure, or alter any proprietary notices on the VaultLeap Platform;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Use the VaultLeap Platform in any manner that could damage, disable, overburden, or impair Klydo's systems; or
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Access the VaultLeap Platform through any automated means or interfaces not provided by Klydo.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  9.4. Feedback.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Any feedback, suggestions, or ideas you provide regarding the VaultLeap Platform may be used by Klydo without
                  any obligation to compensate you, and you hereby grant Klydo a perpetual, irrevocable, worldwide, royalty-free
                  license to use such feedback for any purpose without compensation to you.
                </Typography>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <Typography variant="h2" className="mb-4">
                10. TERM AND TERMINATION
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  10.1. Term.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  These Terms shall remain in effect until terminated by either you or Klydo as set forth herein.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  10.2. Termination by User.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  You may terminate these Terms at any time by closing your account and discontinuing use of the VaultLeap Platform.
                  Termination will not relieve you of any obligations incurred prior to termination.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  10.3. Termination by Klydo.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  Klydo may terminate these Terms and your access to the VaultLeap Platform at any time for any reason, including but not limited to:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Violation of these Terms;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Suspected fraudulent, illegal, or unauthorized activity;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Regulatory or legal requirements;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Extended periods of inactivity; or
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Upon reasonable notice for any other reason at Klydo's sole discretion.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  10.4. Effect of Termination.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-3">
                  Upon termination:
                </Typography>
                <ul className="list-[square] pl-4 space-y-1 text-blue-500 mb-4">
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Your right to access and use the VaultLeap Platform will immediately cease;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Any pending transactions may be canceled or completed at Klydo's discretion;
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      You remain responsible for any outstanding obligations; and
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="small" className="text-muted-foreground leading-loose">
                      Provisions of these Terms that by their nature should survive termination shall survive.
                    </Typography>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <Typography variant="h2" className="mb-4">
                11. DISCLAIMERS AND LIMITATIONS OF LIABILITY
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  11.1. Banking Services Disclaimer.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  THE BANKING SERVICES ACCESSIBLE THROUGH THE PLATFORM ARE PROVIDED BY REGULATED FINANCIAL INSTITUTION PARTNERS.
                  KLYDO DOES NOT ITSELF PROVIDE BANKING SERVICES AND MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE AVAILABILITY,
                  FUNCTIONALITY, PERFORMANCE, OR SUITABILITY OF BANKING SERVICES PROVIDED BY SUCH PARTNERS. USER ACKNOWLEDGES THAT
                  BANKING SERVICES ARE SUBJECT TO THE TERMS, CONDITIONS, AND LIMITATIONS IMPOSED BY PARTNER FINANCIAL INSTITUTIONS.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  11.2. Stablecoin Disclaimer.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  KLYDO DOES NOT ISSUE STABLECOINS AND MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE VALUE, STABILITY,
                  LIQUIDITY, CONVERTIBILITY, OR FUTURE AVAILABILITY OF ANY STABLECOIN ASSET. USER EXPRESSLY ACKNOWLEDGES THAT
                  STABLECOIN VALUES MAY FLUCTUATE, THAT REDEMPTION MECHANISMS MAY BE SUBJECT TO LIMITATIONS, AND THAT REGULATORY
                  DEVELOPMENTS MAY MATERIALLY IMPACT STABLECOIN OPERATIONS.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  11.3. Conversion Services Disclaimer.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  CURRENCY CONVERSION RATES BETWEEN FIAT AND STABLECOINS ARE DETERMINED BY MARKET CONDITIONS AT THE TIME OF CONVERSION.
                  KLYDO DOES NOT GUARANTEE FAVORABLE RATES, EXECUTION TIMING, OR THE CONTINUED AVAILABILITY OF CONVERSION SERVICES IN
                  ANY JURISDICTION. CONVERSION OPERATIONS MAY BE AFFECTED BY BLOCKCHAIN NETWORK CONDITIONS, LIQUIDITY CONSTRAINTS,
                  BANKING PARTNER POLICIES, OR REGULATORY REQUIREMENTS.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  11.4. General Disclaimer.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  THE VAULTLEAP PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                  TITLE, OR NON-INFRINGEMENT. KLYDO DOES NOT WARRANT THAT THE VAULTLEAP PLATFORM WILL BE UNINTERRUPTED, TIMELY,
                  SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. KLYDO DOES NOT WARRANT THE ACCURACY, COMPLETENESS,
                  OR RELIABILITY OF ANY INFORMATION OR CONTENT ON THE VAULTLEAP PLATFORM.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  11.5. Limitation of Liability.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL KLYDO BE LIABLE FOR ANY DIRECT, INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS,
                  GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF KLYDO HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES),
                  RESULTING FROM: (I) FLUCTUATIONS IN STABLECOIN VALUE; (II) DELAYS IN BANKING TRANSACTIONS OR BLOCKCHAIN OPERATIONS;
                  (III) ACTIONS OF BANKING PARTNERS OR STABLECOIN ISSUERS; (IV) REGULATORY CHANGES AFFECTING FINANCIAL SERVICES OR
                  DIGITAL ASSETS; (V) SECURITY BREACHES OF THIRD-PARTY WALLETS OR SERVICES; OR (VI) ANY OTHER MATTER RELATING TO THE
                  PLATFORM, ITS CONTENT, OR SERVICES.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  11.6. Liability Cap.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  IN NO EVENT SHALL KLYDO'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR YOUR
                  USE OF THE VAULTLEAP PLATFORM EXCEED THE GREATER OF: (I) THE AMOUNT OF FEES PAID BY YOU TO KLYDO DURING THE THREE
                  (3) MONTHS IMMEDIATELY PRECEDING THE DATE ON WHICH THE CLAIM AROSE; OR (II) ONE HUNDRED DOLLARS ($100).
                </Typography>
              </div>
            </section>

            {/* Section 12 */}
            <section>
              <Typography variant="h2" className="mb-4">
                12. INDEMNIFICATION
              </Typography>

              <Typography variant="p" className="text-muted-foreground leading-loose">
                You agree to indemnify, defend, and hold harmless Klydo, its affiliates, and their respective officers, directors,
                employees, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments,
                awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your
                violation of these Terms, your use of the VaultLeap Platform, or your violation of any rights of another user or third party.
              </Typography>
            </section>

            {/* Section 13 */}
            <section>
              <Typography variant="h2" className="mb-4">
                13. DISPUTE RESOLUTION
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  13.1. Applicable Law.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  These Terms and any dispute arising out of or related to these Terms or your use of the VaultLeap Platform shall
                  be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any
                  choice or conflict of law provisions.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  13.2. Arbitration Agreement.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Except for small claims disputes in which you or Klydo seeks to bring an individual action in small claims court,
                  or seeks injunctive or other equitable relief, any dispute, controversy or claim arising out of or relating to these
                  Terms, the VaultLeap Platform, or any products or services provided by Klydo shall be settled by binding arbitration
                  in accordance with the commercial arbitration rules of the American Arbitration Association ("AAA").
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  13.3. Arbitration Procedures.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  The arbitration shall be conducted in San Francisco, California, by a single, neutral arbitrator selected by mutual
                  agreement of the parties or, failing such agreement, in accordance with the AAA rules. The arbitrator's award shall
                  be final and binding, and judgment on the award rendered by the arbitrator may be entered in any court having
                  jurisdiction thereof. The arbitrator shall have the authority to grant any remedy that would be available in court.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  13.4. Class Action Waiver.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose uppercase">
                  YOU AND KLYDO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT
                  AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and Klydo
                  agree otherwise, the arbitrator may not consolidate more than one person's claims with your claims, and may not
                  otherwise preside over any form of a representative or class proceeding.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  13.5. Opt-Out.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  You may opt out of this arbitration agreement by notifying Klydo in writing within 30 days of the date you first
                  agreed to these Terms by emailing support@klydo.io with the subject line "Arbitration Opt-Out."
                </Typography>
              </div>
            </section>

            {/* Section 14 */}
            <section>
              <Typography variant="h2" className="mb-4">
                14. CHANGES TO TERMS
              </Typography>

              <Typography variant="p" className="text-muted-foreground leading-loose">
                Klydo reserves the right, at any time and at its sole discretion, to modify these Terms. If we make changes to these
                Terms, we will post the updated Terms on the VaultLeap Platform and update the "Last Updated" date at the top of these
                Terms. Your continued use of the VaultLeap Platform after the posting of the updated Terms constitutes your acceptance
                of such changes.
              </Typography>
            </section>

            {/* Section 15 */}
            <section>
              <Typography variant="h2" className="mb-4">
                15. MISCELLANEOUS
              </Typography>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  15.1. Entire Agreement.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  These Terms, together with the{' '}
                  <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>{' '}
                  and any other agreements expressly incorporated by reference herein, constitute the entire and exclusive understanding
                  and agreement between you and Klydo regarding the VaultLeap Platform, and supersede and replace all prior oral or
                  written understandings or agreements between you and Klydo regarding the VaultLeap Platform.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  15.2. Severability.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  If any provision of these Terms is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable
                  for any reason, such provision shall be eliminated or limited to the minimum extent possible, and the remaining
                  provisions of these Terms will continue in full force and effect.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  15.3. Waiver.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  The failure of Klydo to exercise or enforce any right or provision of these Terms will not constitute a waiver of
                  such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by Klydo.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  15.4. Assignment.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  You may not assign or transfer these Terms, by operation of law or otherwise, without Klydo's prior written consent.
                  Any attempt by you to assign or transfer these Terms without such consent will be null and void. Klydo may assign or
                  transfer these Terms, at its sole discretion, without restriction.
                </Typography>
              </div>

              <div className="mb-6">
                <Typography variant="h3" className="mb-3">
                  15.5. Notices.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose">
                  Any notices or other communications permitted or required hereunder, including those regarding modifications to these
                  Terms, will be in writing and given by Klydo: (i) via email to the email address specified in your account; or (ii) by
                  posting to the VaultLeap Platform. For notices made by email, the date of receipt will be deemed the date on which such
                  notice is transmitted.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="mb-3">
                  15.6. Contact Information.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-loose mb-4">
                  If you have any questions about these Terms or the VaultLeap Platform, please contact us at:
                </Typography>

                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div>
                    <Typography variant="p" className="text-muted-foreground">
                      Klydo, LLC
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground">
                      PMB 1066
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground">
                      447 Sutter St, Ste 405
                    </Typography>
                    <Typography variant="p" className="text-muted-foreground">
                      San Francisco, CA 94108
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="p" className="text-blue-600">
                      Email: support@klydo.io
                    </Typography>
                  </div>
                </div>
              </div>
            </section>

            {/* Help Center Link */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <Typography variant="h3" className="mb-3">
                Need Help Understanding These Terms?
              </Typography>
              <Typography variant="p" className="text-muted-foreground leading-loose mb-4">
                For detailed explanations of VaultLeap's features, security measures, and how our platform works,
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
