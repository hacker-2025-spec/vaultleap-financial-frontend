import { VAULT_FEE_PERCENT_NORMAL, VAULT_FEE_PERCENT_PREMIUM } from "@/config/config"

export const DO_I_NEED_TO_INSTALL_WALLET_TEXT =
  "Our smart wallet integration simplifies the process significantly. To get started, simply click on the 'Create Wallet' button within the Vaultleap platform.\n" +
  "1. One-click Coinbase Smart Wallet creation\n" +
  "2. Biometric authentication (fingerprint or face ID) instead of seed phrases\n" +
  "3. Klydo covers all gas fees for transactions within the Vaultleap ecosystem\n\n" +
  "Our smart wallet solution combines the security of blockchain technology with the convenience of modern app interfaces, making it accessible even if you're new to crypto."

export const CAN_I_USE_OWN_WALLET_TEXT =
  "1. Navigate to the Dashboard Page within the Vaultleap platform.\n" +
  "2. Locate the \"Transfer Vault Keys\" button.\n" +
  "3. Clicking the \"Transfer Vault Keys\" button allows you to transfer your Vault Keys to another wallet you own.\n" +
  "4. Enter the wallet address you'd like to transfer your Vault Key to.\n5. Confirm the transfer, and your Vault Keys will be sent to your specified wallet address.\n" +
  "Note: If a Vault Creator has activated Tax Reporting on a vault, it is crucial to ensure that the wallet owner of the address you're transferring the Vault Keys to matches the owner of the Vaultleap account. This is important for tax purposes and to comply with legal requirements.Transferring Tax Reported Vault Keys to friends, family, or any other third party is strictly prohibited and violates the rules of the Vaultleap platform. Klydo strongly advises against transferring Vault Keys to anyone other than the rightful owner of the Vaultleap account."

export const PAY_GAS_FEES_TEXT =
  "Klydo covers gas fees for the following transactions:\n\n" +
  "For Smart Wallets:\n" +
  "• Creating Vaults\n" +
  "• Funding Vaults\n" +
  "• Claiming Vault Keys\n" +
  "• Claiming Funds\n" +
  "• Withdrawing Funds\n\n" +
  "For EOA Wallets:\n" +
  "• Creating Vaults\n" +
  "• Claiming Vault Keys\n" +
  "• Claiming Funds\n" +
  "• Withdrawing Funds"

export const IS_VAULTLEAP_LEGALLY_COMPLIANT_TEXT =
  "Klydo is committed to maintaining the highest standards of legal compliance in the digital asset space.\n\n" +
  "Our platform is designed with regulatory requirements in mind, ensuring that we meet or exceed industry standards. We continuously monitor and adapt to changes in relevant laws and regulations, including those related to digital assets, financial transactions, and data protection.\n\n" +
  "We work closely with legal experts to ensure our services align with current regulatory frameworks. This includes implementing robust KYC (Know Your Customer) and AML (Anti-Money Laundering) procedures, as well as adhering to tax reporting requirements.\n\n" +
  "If you have any questions about our compliance measures, please don't hesitate to contact our support team."

export const PERSONAL_INFORMATION_SAFE_TEXT =
  "At Klydo, the security and privacy of your personal information is our top priority.\n\n" +
  "We adhere to strict data privacy regulations and industry best practices. Our data handling procedures are designed to minimize risk and maximize protection, ensuring that your personal information is safeguarded at every step.\n\n" +
  "For more detailed information about our data protection practices, please refer to our Privacy Policy. If you have any concerns about the safety of your personal information, our dedicated support team is always available to assist you."

export const ARE_YOU_AUDITED_TEXT = {
  part1: "Yes, Vaultleap undergoes regular security audits by reputable third-party firms. These audits cover our smart contracts, platform infrastructure, and overall security practices. We're committed to maintaining the highest standards of security and transparency. Audit reports are available upon request. For more details, you can view our ",
  hyperlink: "https://nft.klydo.io/audit/Klydo_Secure3_Audit_Report.pdf",
  hyperlinkText: "latest audit report",
}

export const EMAIL_SAFETY_TEXT =
  "We have implemented personalized security markers in our emails. To ensure authenticity of emails from Vaultleap:\n" +

  "1. Look for personalization: Our emails start with 'Hello [Your Name]' and include your role as specified by the Vault creator.\n" +
  "2. Identify the Vault creator: We always mention who sent you the Vault. If you're unsure about this person, contact them directly before clicking any links.\n" +
  "3. Find the footer confirmation: At the bottom of every email, you'll see 'This email was intended for [Your Name]'.\n" +
  "4. Check the sender: Official emails always come from noreply@klydo.io.\n" +
  "5. Verify the recipient: Make sure your email address is in the 'To' field.\n" +
  "6. Be cautious of urgent requests: We never pressure you to act immediately.\n" +
  "7. Verify links: Hover over links to check their destination before clicking.\n\n" +
  "If you're ever in doubt, please reach out to us on Discord or email us directly. Remember, we never ask for sensitive information like passwords via email."

export const WALLET_SAFETY_TOOLS_TEXT =
  "We recommend the following wallet safety tools and practices:\n" +
  "1. Hardware Wallets: Use devices like Ledger or Trezor for cold storage of large amounts.\n" +
  "2. Multi-Factor Authentication (MFA): Enable MFA on all your accounts, including exchanges and web wallets.\n" +
  "3. Wallet Monitoring Tools: Services such as Wallet Guard or Pocket Universe that alert you of suspicious activities on your addresses.\n" +
  "5. Education: Stay informed about the latest security practices and potential threats in the crypto space.\n\n" +
  "Remember, the security of your funds ultimately relies on your personal practices. Always exercise caution."

export const CREATION_HELP_TEXT =
  "Absolutely. Someone from the Klydo team can assist you in creating a Vaultleap Vault. We understand that the process of setting up a Vault may be new or unfamiliar to some users, and we're here to help ensure a smooth and hassle-free experience for all our users.\n\n" +
  "If you would like assistance in creating a Vaultleap Vault, simply reach out to our support team in our discord channel or email support@klydo.io."

export const HOW_TO_FUND_VAULTLEAP_TEXT =
  "You have two convenient methods to fund your Vaultleap vault:\n\n" +
  "Method 1: Via Dashboard (Recommended)\n" +
  "1. Navigate to the Vaultleap dashboard and locate the 'Claim Payments' tab.\n" +
  "2. Under the Vault Keys tab, locate the Vault you wish to fund and find the $ sign icon.\n" +
  "3. Click the $ icon to initiate the funding process.\n" +
  "4. Follow the prompts to complete the transaction.\n\n" +
  "Method 2: Via Email Confirmation\n" +
  "1. Locate the Vaultleap Vault confirmation email in your inbox.\n" +
  "2. Find and copy the 'Vault Address' from the highlighted section in the email.\n" +
  "3. Access your preferred cryptocurrency exchange or wallet that supports USDC (e.g., Coinbase).\n" +
  "4. Navigate to the 'Send' or 'Withdraw' section of your exchange or wallet.\n" +
  "5. Select USDC as the currency to send.\n" +
  "6. Paste the copied Vaultleap Vault address into the recipient field.\n" +
  "7. Confirm the transaction details and submit.\n\n" +
  "For both methods, once the transaction is confirmed on the blockchain, the USDC will be credited to your Vaultleap Vault balance. Please allow for standard blockchain processing times.\n\n" +
  "Important Disclaimer: For Vaults using the Profit Switch feature, only send funds via the Vaultleap platform UI (Method 1). Do not send bare ERC-20 transactions directly to the vault address, as this may result in improper fund allocation."

export const HOW_DO_I_WITHDRAW_TEXT =
  "\n1. Log in to your Vaultleap account and navigate to the Dashboard page.\n" +
  "2. Claim your funds by clicking the \"Claim USDC\" button. This moves your funds from the Vault to your self custody wallet.\n" +
  "3. To transfer, simply click \"Transfer,\" enter the amount, and provide your USDC receiving address from your preferred cryptocurrency account, like Coinbase.\n" +
  "4. Confirm the transaction, and you're done! Your USDC funds will be on their way to your designated account."

export const WHAT_IS_PROFIT_SWIITCH_TEXT =
  "The Profit Switch is a powerful feature that enables Vault Creators to set financial targets. It allows business owners to define a specific financial target or milestone, such as reaching a certain amount of profit or revenue. Once this preset milestone is achieved, the Profit Switch automatically activates your Vaultleap Vault, granting your team access to their earned funds.\n\n" +
  "Here's an example of how to use the Profit Switch in a lending scenario:\n1. Secure a loan from a lender to fuel your business expansion.\n2. Select the Target Payout template on the Vault Creator (This template contains the Profit Switch feature).\n3. Profit Switch Name: Give your Profit Switch a unique name. This helps you identify and track different campaigns.\n4. Profit Switch Amount: Establish the Profit Switch target amount, representing the total repayment to the lender.\n5. Custody Wallet: Enter the wallet address where funds will be held until the target is reached. \n6. As your business generates revenue, funds are directed to the custody wallet until the Profit Switch is activated. This ensures full reimbursement to the lender before the Vaultleap Vault becomes active.\n7. Subsequent funds sent to the vault are distributed based on the Vaultleap percentages you've designated.\n8. Both you and the lender benefit: the lender receives a return on their investment, while you enjoy a share of the profits for your business success.\n\n" +
  "In the above example, The Profit Switch simplifies the process of repaying loans and distributing profits by automating the flow of funds. It provides a transparent and efficient way to manage financial agreements between parties. It can also be effectively utilized to drive sales teams toward meeting sales targets or aid small businesses in achieving specific income milestones, offering a versatile solution for optimizing financial agreements and incentivizing performance across various business scenarios.\n\n" +
  "Important Disclaimer: For vaults using the profit switch feature, only send funds via the Vaultleap platform UI. Do not send bare ERC-20 transactions directly to the vault address, as this may result in improper fund allocation to the Profit Switch custody wallet."

export const WHAT_IS_VAULT_FEE_TEXT =
  "Vaultleap applies a " + VAULT_FEE_PERCENT_NORMAL +"% transaction fee on funds distributed through our platform. This fee is deducted from the amount sent by the vault creator, affecting the final amount received by the recipient.\n\n" +
  "Important Information for Vault Creators:\n" +
  "• The " + VAULT_FEE_PERCENT_NORMAL + "% transaction fee is deducted from the amount you send.\n" +
  "• To ensure your recipient receives the intended amount, you should account for this fee when sending funds.\n" +
  "• Example: If you want your recipient to receive $100, you should send $100.75. The " + VAULT_FEE_PERCENT_NORMAL + "% fee ($0.75) will be deducted, and your recipient will receive the intended $100.\n\n" +
  "Note: Premium subscribers benefit from lower transaction fees. Consider upgrading to our premium plan for high-volume or frequent transactions to ensure recipients always get the full intended amount.\n\n" +
  "For any questions regarding transaction fees or premium subscriptions, please contact our customer support team."

export const WHAT_IS_1099_NEC_TEXT =
  "1. 1099-NEC:\n" +
  "   • If you earn $600+ through Vaultleap Vaults in a tax year, you'll receive a 1099-NEC.\n" +
  "   • Forms will be available for download on your Vaultleap dashboard.\n" +
  "   • You must provide consent for electronic delivery to access the forms.\n" +
  "   • After consenting, you'll be notified when your form is ready for download.\n\n" +
  "2. W8-BEN and W8-BEN-E:\n" +
  "   • These forms are for non-U.S. persons (individuals and entities) receiving income from U.S. sources.\n" +
  "   • W8-BEN is for individuals, while W8-BEN-E is for entities.\n" +
  "   • They help determine your tax status and any applicable treaty benefits.\n" +
  "3. Consent and Privacy:\n" +
  "   • Consent is required due to IRS regulations for electronic delivery of all tax forms.\n" +
  "   • You can revoke your consent at any time.\n" +
  "   • For details on revoking consent, please refer to our Privacy Policy.\n\n" +
  "Important: Keep your contact information up to date to ensure timely receipt of notifications. For non-U.S. persons, ensure your W8-BEN or W8-BEN-E is current to avoid unnecessary withholding.\n\n" +
  "For any questions regarding your tax forms or obligations, please consult with a tax professional."

export const WHEN_WILL_RECEIVE_TAX_FORMS =
  "If a Vault has Tax Reporting activated, Vaultleap will provide you with 1099 tax forms by January 31st of the following year. For example, if you received funds through Vaultleap in 2024, your tax forms will be available by January 31st, 2025.\n\n" +
  "Here's what you can expect:\n1. 1099 NEC Form: If you've earned $600 or more in funds during the tax year, you'll receive a 1099 form detailing your earnings\n2. Email Notification: You'll receive an email notification once your 1099 forms and summary are available.\n\n" +
  "Klydo aims to make the tax reporting process as seamless as possible. However, it's always a good idea to consult with a tax professional to ensure you're meeting all your tax obligations.\n\n" +
  "*Please Note* You will receive a 1099 form for the tax year in which you actually claim your funds, which may be different from the year in which the funds were initially earned or sent to the Vault. For example, if you earned funds in 2024 but did not claim them until 2025, those funds will be reported on your 1099 form for the 2025 tax year, not the 2024 tax year. If you have any questions about your funds or 1099 form, please don't hesitate to contact our support team for assistance."

export const CAN_I_EDIT_VAULTLEAP =
  "Once a Vault is created, its structure and distribution are permanent and cannot be changed. This immutability ensures transparency and security for all team members. However, you're not limited to just one Vault! You can create as many new Vaults as you need, each with its own unique structure and team composition.\n\n" +
  "For example, you might create separate Vaults for:\n1. Different projects or clients.\n2. Various team configurations.\n3. Family members.\n4. Friend groups.\n5. Evolving business needs.\n\n" +
  "If you need to include a new team member or adjust distributions, simply create a new Vault with the updated structure. This flexibility allows you to adapt to changing needs while maintaining the integrity of existing Vaults.\n\n" +
  "Remember: Each Vault is a unique, permanent account. Plan your Vault structure carefully before creation, as it cannot be edited afterwards."

export const I_SENT_TO_MUCH_TO_THE_VAULT =
  "When you send funds to a Vaultleap Vault, the transaction is recorded on the blockchain and the smart contract automatically distributes the funds according to the predetermined percentages set during the Vault's creation. Once the transaction is confirmed on the blockchain, it is irreversible and cannot be altered by any party, including Klydo. This immutability is a core feature of blockchain technology, ensuring the integrity and transparency of all transactions. While we understand that mistakes can happen, we strongly encourage all users to exercise caution and verify all transaction details before sending funds to a Vaultleap Vault. If you have any further questions or concerns, please don't hesitate to reach out to our support team, who will be happy to assist you to the best of their abilities within the constraints of the blockchain ecosystem."

export const ARE_THE_FUNDS_LOST_TEXT =
  "At Vaultleap, we understand that there may be instances where users do not claim their Vault Keys within a reasonable timeframe. To ensure that your funds are not locked indefinitely and to provide you with flexibility, we have implemented a time-lock mechanism for unclaimed keys.\n\n" +
  "When you create a Vault and allocate funds to your team members, each recipient is assigned a unique Vault Key. Vaultleap notifies the recipients via email, prompting them to claim their Vault Keys and access their allocated funds.\n\n" +
  "If a recipient does not claim their Vault key within 18 months from the date of allocation, the time-lock mechanism is triggered. Vaultleap will notify the Vault Creator, about the unclaimed keys and provide an option to claw back the unclaimed Vault Key."

export const WHAT_IS_USDC =
  "Our platform, built on Base, a secure and scalable Ethereum Layer 2 solution, utilizes ERC-20 Ethereum-based USD Coin for distribution. USD Coin is a fully-collateralized, US dollar-backed stablecoin, pegged to the US dollar on a 1:1 basis, meaning that 1 USD Coin always equals 1 US dollar. Issued by regulated financial institutions, USD Coin is designed to maintain a stable value, minimizing the volatility typically associated with cryptocurrencies."

export const GLOSSARY =
  "1.  Vault Keys: Vault Keys are like your unique account number and password combined into one. When you're added to a Vault, you'll receive a Vault Key which serves as your proof of ownership and grants you access to claim your allocated funds. Similar to online banking credentials, keep your Vault Key secure and confidential.\n\n" +
  "2.  Vault: A Vault is similar to a joint bank account where funds are held until they're ready to be distributed among the account holders. The Vault is created and managed by the Vault Creator, who sets the distribution rules and invites team members to join.\n\n" +
  "3.  Profit Switch: The Profit Switch is like a target balance that triggers an automatic transfer of funds. It's a threshold set by the Vault Creator, and once the Vault balance reaches that target, the Vaultleap are automatically distributed to the team members. It's similar to setting up an automatic payment or transfer with your bank.\n\n" +
  "4.  Smart Wallet: A self-custodial wallet powered by Coinbase's Smart Wallet technology. Unlike traditional crypto wallets that require seed phrases, Smart Wallets use biometric authentication (like Face ID or fingerprint) for security. They're designed to be user-friendly while maintaining complete control of your funds. Gas fees are covered by Vaultleap, making transactions seamless.\n\n" +
  "5.  Vault Creator: The administrator who sets up and manages the Vault, defines roles, sets payment percentages, and handles team invitations. Similar to a business account administrator in traditional banking.\n\n" +
  "6.  Tax Forms: Automated documentation (W9, 1099, W8-BEN, W8-BEN-E) generated and managed by the platform for compliant payments. These are official IRS forms required for payment reporting, similar to what you'd receive from an employer.\n\n" +
  "7.  Role-Based Allocation: The percentage-based distribution system within a Vault that determines how funds are split among team members based on their assigned roles. Think of it like profit-sharing agreements in traditional business.\n\n" +
  "8.  Vault Claims: The process of receiving your allocated funds from a Vault. Similar to accepting a payment, but with built-in tax compliance and automatic documentation.\n\n" +
  "9.  USDC: The digital currency used for all transactions on Vaultleap. It's a 'stablecoin' that maintains a consistent 1:1 value with the US Dollar, making it as stable as regular USD in your bank account.\n\n" +
  "10. Service Fee: The platform fee charged on transactions (" + VAULT_FEE_PERCENT_NORMAL + "% standard, " + VAULT_FEE_PERCENT_PREMIUM + "% premium), similar to payment processing fees in traditional financial services. This fee helps maintain the platform and cover gas costs.\n\n" +
  "11. Time-Lock: A security feature that allows Vault Creators to reclaim unclaimed Vault Keys after 18 months. Similar to dormant account policies in traditional banking."

export const I_HAVE_SOME_FEEDBACK = {
  part1:
    "We deeply value the insights and suggestions from our users. Join our vibrant Discord and head over to the 'suggestions' channel, or fill out our",
  hyperlink: "https://tally.so/r/nGzZEj",
  hyperlinkText: "feedback form",
}

export const QUESTION_OUTSIDE_FAQ = {
  part1:
    "If you encounter any issues or have questions not addressed in the FAQ, please contact our support team by submitting a support ticket in our discord channel or by emailing ",
  hyperlink: "support@klydo.io",
}

