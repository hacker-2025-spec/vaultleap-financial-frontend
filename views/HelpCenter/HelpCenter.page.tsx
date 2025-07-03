import {
  Lightbulb,
  Globe,
  DollarSign,
  CreditCard,
  Smartphone,
  Shield,
  Key,
  Trophy,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Mail,
  Clock,
  Banknote,
  Wallet,
  Lock,
  Eye,
  Download,
  Bell,
  Users,
  Zap,
  List,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

// Table of Contents data
const tableOfContents = [
  { id: 'getting-started', title: 'Getting Started', icon: Lightbulb },
  { id: 'global-banking', title: 'Global Banking Features', icon: Globe },
  { id: 'stablecoins', title: 'Understanding Stablecoins', icon: DollarSign },
  { id: 'receiving-sending', title: 'Receiving & Sending Money', icon: CreditCard },
  { id: 'dashboard-reporting', title: 'Dashboard & Reporting', icon: Smartphone },
  { id: 'security-control', title: 'Security & Control', icon: Shield },
  { id: 'private-keys', title: 'Private Keys & Security', icon: Key },
  { id: 'vault-features', title: 'Premium Vault Features', icon: Trophy },
  { id: 'advanced-money', title: 'Advanced Money Management', icon: Zap },
  { id: 'tax-compliance', title: 'Tax & Compliance', icon: FileText },
  { id: 'industry-solutions', title: 'Industry-Specific Solutions', icon: Users },
  { id: 'pricing-costs', title: 'Pricing & Transaction Costs', icon: DollarSign },
]

// Table of Contents Component
const TableOfContents = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <List className="h-4 w-4" />
          Quick Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {tableOfContents.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className="w-full justify-start h-auto py-2 px-2 text-left"
              onClick={() => scrollToSection(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm leading-tight">{item.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const HelpCenterPage = () => {
  return (
    <div className="container mx-auto px-4 py-48 max-w-7xl">
      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Help Center Content - Left Side */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <Typography variant="h1" className="mb-4">
              VaultLeap Help Center
            </Typography>
            <Typography variant="large" className="text-muted-foreground mb-6">
              Your central hub for support, guides, and getting help with VaultLeap
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-6">
              A simple, secure, and comprehensive guide to everything VaultLeap offers.
              Built for first-time users, businesses, and non-crypto natives.
            </Typography>
          </div>

      {/* Getting Started Section */}
      <Card className="mb-8" id="getting-started">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            Getting Started
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h3" className="mb-3">
              What is VaultLeap, in plain terms?
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              VaultLeap is your global account for getting paid and sending money in stable currency — 
              without worrying about local banks or inflation. You receive USD/EUR, it converts into 
              stable digital dollars, and you can send it anywhere or store it safely in your 
              self-custody wallet.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h3" className="mb-4">
              How It Works - The VaultLeap Process
            </Typography>
            <Typography variant="p" className="mb-4 text-muted-foreground">
              VaultLeap makes global payments simple:
            </Typography>
            
            <div className="space-y-3">
              {[
                { step: 1, title: "Set Up", desc: "Create your account and get personal USD/EUR account details" },
                { step: 2, title: "Get Paid", desc: "Clients send money via ACH or SEPA to your account details" },
                { step: 3, title: "Automatic Conversion", desc: "Funds are immediately converted to stable Digital Dollars (USDC/EURC)" },
                { step: 4, title: "Store Securely", desc: "Your Digital Dollars are stored in your self-custodial smart wallet" },
                { step: 5, title: "Send Anywhere", desc: "Send to bank accounts globally, other VaultLeap users, or via email" },
                { step: 6, title: "Control Everything", desc: "Manage everything through a simple dashboard with built-in security" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div>
                  <Badge variant="outline" className="min-w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    {item.step}
                  </Badge>
                  </div>
                  <div className='"flex items-start'>
                    <Typography className="font-bold">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground leading-loose">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
                    <Typography  className="text-muted-foreground leading-loose mt-2">

                All this happens without you needing to understand the blockchain technology working behind the scenes.
              </Typography>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <Typography variant="h4" className="mb-2">
                Do I need a crypto wallet?
              </Typography>
              <Typography variant="p" className="text-muted-foreground mb-3">
                No. VaultLeap gives you a built-in smart wallet automatically when you sign up.
              </Typography>
              <Typography className="text-muted-foreground leading-loose">
                It's fully self-custodial and doesn't require any crypto knowledge. You don't manage seed phrases
                or download extensions. Once set up, you can activate biometric login (Face ID or fingerprint) for
                added security, and recover access anytime using your email. It works like a secure digital wallet —
                just smarter and easier to use.
              </Typography>
            </div>

            <div>
              <Typography variant="h4" className="mb-2">
                Is this crypto? Do I need to understand tokens and blockchain?
              </Typography>
              <Typography className="text-muted-foreground leading-loose">
                Technically yes — but we've hidden all the complexity. You'll never deal with seed phrases or gas fees.
                VaultLeap offers the familiar experience of traditional digital finance with the enhanced capabilities
                of blockchain technology.
              </Typography>
            </div>

            <div>
              <Typography variant="h4" className="mb-2">
                How do I create an account?
              </Typography>
              <Typography className="text-muted-foreground leading-loose">
                Sign up online in minutes. Verify your identity and get access to personal USD and EUR accounts
                for payments — no U.S. or EU residency required.
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Banking Features Section */}
      <Card className="mb-8" id="global-banking">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-6 w-6 text-green-600" />
            Global Banking Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              Can I receive USD/EUR payments no matter where I live?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Yes! VaultLeap provides you with legitimate U.S. and EU bank account details that work with 
              standard banking systems. Your clients can pay you via ACH or SEPA just like they would any 
              local business—no special setup required on their end.
            </Typography>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Typography className="text-blue-800 leading-loose">
                <strong>Real-world example:</strong> A Mexican manufacturer used their VaultLeap US account details
                and W-9 forms to secure contracts with American companies who previously refused to work with
                "foreign vendors" due to payment complexities.
              </Typography>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How does VaultLeap help me avoid currency devaluation?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              When clients send you USD or EUR, we immediately convert these funds to digital stablecoins 
              (USDC or EURC) that maintain their value regardless of what happens to your local currency.
            </Typography>
            <div className="bg-green-50 p-4 rounded-lg">
              <Typography className="text-green-800">
                <strong>Real-world example:</strong> An Argentine freelancer avoided losing 140% of their earnings 
                to inflation by storing funds in USD-backed stablecoins, preserving purchasing power despite 
                local economic challenges.
              </Typography>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              How quickly can I send international payments?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Unlike traditional cross-border transfers that take days, VaultLeap enables:
            </Typography>
            <ul className="list-[square] pl-4 space-y-2 text-blue-500">
              <li>
                <Typography className="text-muted-foreground leading-loose">
                  Wire/SEPA transfers that arrive in recipient bank accounts within 5 minutes*
                </Typography>
              </li>
              <li>
                <Typography className="text-muted-foreground leading-loose">
                  Same-day ACH at a fraction of the cost of standard international wires
                </Typography>
              </li>
              <li>
                <Typography className="text-muted-foreground leading-loose">
                  24/7 transaction capability, even when banks are closed
                </Typography>
              </li>
            </ul>
            <Typography className="text-muted-foreground mt-3 italic">
              *Times may vary. Wire/SEPA typically complete within an hour, ACH within 1-2 business days. 
              VaultLeap processing completes in minutes.
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Understanding Stablecoins Section */}
      <Card className="mb-8" id="stablecoins">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-6 w-6 text-yellow-600" />
            Understanding Stablecoins
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              What are Digital Dollars?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Digital Dollars are stablecoins like USDC (USD Coin) and EURC (Euro Coin) that we use at VaultLeap.
              They're digital versions of traditional currencies, pegged 1:1 to the US dollar or euro. When you
              receive funds at VaultLeap, they're automatically converted to these Digital Dollars.
            </Typography>
            <Typography className="text-muted-foreground leading-loose">
              Unlike volatile cryptocurrencies (like Bitcoin), Digital Dollars maintain consistent value while
              offering the benefits of blockchain technology — borderless transfers, 24/7 availability, and
              programmable payments.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Are stablecoins safe to use?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Stablecoins are considered safe when they are properly backed by reserves and issued by reputable
              companies. Circle's USDC and EURC are fully backed by cash and short-term US Treasury bonds,
              verified by regular audits. The safety of a stablecoin depends on:
            </Typography>
            <ul className="list-[square] pl-4 space-y-1 text-green-500">
              {[
                "The quality and transparency of its reserves",
                "Regulatory compliance",
                "The issuer's reputation and financial stability",
                "Regular independent audits"
              ].map((item, index) => (
                <li key={index}>
                  <Typography className="text-muted-foreground leading-loose">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-3">
              What reserves back VaultLeap's supported stablecoins?
            </Typography>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <Typography variant="h5" className="mb-2 flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-blue-600" />
                  USDC (USD Coin)
                </Typography>
                <Typography className="text-muted-foreground">
                  USDC is 100% backed by highly liquid cash and cash-equivalent assets stored in transparently
                  managed reserves with independent attestations conducted by a Big Four accounting firm. The
                  reserve is designed to provide holders with ready liquidity, even under extremely stressed
                  conditions. With reserves managed by BlackRock and custodied at The Bank of New York Mellon,
                  Circle ensures full regulatory compliance.
                </Typography>
              </div>

              <div className="border rounded-lg p-4">
                <Typography variant="h5" className="mb-2 flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-purple-600" />
                  EURC (Euro Coin)
                </Typography>
                <Typography className="text-muted-foreground leading-loose">
                  EURC is a euro-backed stablecoin fully compliant with the EU's MiCA regulatory framework.
                  Circle's EMI licensing in Europe reinforces EURC's reliability, with reserves held in reputable
                  financial institutions to ensure stability. As of late 2024, there are €81.59 million EURC in
                  circulation, with €83.01 million in reserves.
                </Typography>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Why does VaultLeap use stablecoins?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              VaultLeap uses stablecoins because they offer:
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Globe, title: "Global accessibility", desc: "Send and receive money worldwide without traditional banking limitations" },
                { icon: Shield, title: "Price stability", desc: "Maintain the value of your funds without exposure to crypto market volatility" },
                { icon: Zap, title: "Fast transactions", desc: "Move money quickly across borders without lengthy settlement times" },
                { icon: Clock, title: "24/7 availability", desc: "Access and move your money anytime, not just during banking hours" },
                { icon: Eye, title: "Transparency", desc: "Clearly audited reserves ensure your digital dollars are properly backed" },
                { icon: Users, title: "Programmability", desc: "Enable automated payments, splits, and other smart contract functions" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <item.icon className="h-4 w-4 text-blue-600 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receiving & Sending Money Section */}
      <Card className="mb-8" id="receiving-sending">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-6 w-6 text-purple-600" />
            Receiving & Sending Money
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              How do I get paid?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              You get your own U.S. and EU bank account numbers. Your clients send funds via ACH or SEPA.
              We instantly convert that to Digital Dollars (USDC or EURC) and deposit them into your wallet.
            </Typography>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Typography className="text-blue-800 leading-loose">
                <strong>Real-world example:</strong> Sarah is a freelance designer with clients in both the US and Europe.
                Instead of managing multiple bank accounts, she gives her US clients her VaultLeap ACH details and her
                EU clients her SEPA details. When a US client pays her $3,000, it automatically shows up as 3,000 USDC
                in her VaultLeap wallet - ready to use instantly.
              </Typography>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What currencies can I receive?
            </Typography>
            <Typography className="text-muted-foreground">
              USD and EUR. We automatically convert to digital stablecoins so your money is protected from devaluation.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How do I send money to others?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              From your smart wallet, you can send to:
            </Typography>
            <ul className="list-[square] pl-4 space-y-2 text-blue-500">
              {[
                "Bank accounts globally (your own or others)",
                "Other VaultLeap users",
                "Anyone via email with a secure claim link (premium Vault feature)"
              ].map((item, index) => (
                <li key={index}>
                  <Typography className="text-muted-foreground leading-loose">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Can I withdraw to my bank?
            </Typography>
            <Typography className="text-muted-foreground">
              Yes. Withdrawals can be sent to bank accounts worldwide, typically arriving within minutes
              (SEPA/Wire) or 1–2 business days (ACH).
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard & Reporting Section */}
      <Card className="mb-8" id="dashboard-reporting">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="h-6 w-6 text-indigo-600" />
            Dashboard & Reporting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              What financial tracking tools are available?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              VaultLeap provides comprehensive financial tracking and management:
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Eye, title: "Real-Time Dashboard", desc: "Monitor all balances and transfers from a central location" },
                { icon: Bell, title: "Instant Notifications", desc: "Receive email alerts for all transactions and account activity" },
                { icon: Download, title: "Downloadable Reports", desc: "Export financial data in formats compatible with accounting systems" },
                { icon: Clock, title: "Transaction History", desc: "View detailed records of all account activity with search and filter options" },
                { icon: DollarSign, title: "Currency Display Options", desc: "Customize how balances are displayed based on your preferences" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <item.icon className="h-4 w-4 text-indigo-600 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Can I get notifications for transactions?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Yes, VaultLeap sends instant email notifications for:
            </Typography>
            <ul className="list-[square] pl-4 space-y-1 text-blue-500">
              {[
                "Incoming payments",
                "Outgoing transfers",
                "Vault creations and claims",
                "Tax document availability",
                "Security alerts"
              ].map((item, index) => (
                <li key={index}>
                  <Typography className="text-muted-foreground leading-loose">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography className="text-muted-foreground mt-2">
              You can customize notification preferences in your account settings.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How do I track my finances in VaultLeap?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Our intuitive dashboard gives you complete visibility into your financial activity:
            </Typography>
            <ul className="list-[square] pl-4 space-y-1 text-green-500">
              {[
                "View all transactions with detailed information",
                "Filter by transaction type, date range, or amount",
                "Download statements and reports for accounting purposes",
                "Generate tax documentation directly from transaction history",
                "Track conversions between currencies"
              ].map((item, index) => (
                <li key={index}>
                  <Typography className="text-muted-foreground leading-loose">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Security & Control Section */}
      <Card className="mb-8" id="security-control">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-6 w-6 text-red-600" />
            Security & Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              Is VaultLeap safe to use?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              VaultLeap was built with security at its core — not as an afterthought.
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              We use:
            </Typography>
            <ul className="space-y-2 ml-4">
              {[
                { icon: Smartphone, text: "Biometric login (Face ID or fingerprint) for smart wallet access" },
                { icon: Shield, text: "SOC 2–ready infrastructure with regular audits" },
                { icon: Lock, text: "AES-256 encryption for stored data and TLS 1.2+ for all transfers" },
                { icon: Wallet, text: "Self-custodial architecture — your keys, your money, always" },
                { icon: CheckCircle, text: "Smart contract audits by top-tier security firms" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <item.icon className="h-4 w-4 text-green-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item.text}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography variant="p" className="text-muted-foreground mt-3">
              We do not store private keys, ever. You alone hold access to your wallet and funds.
            </Typography>

            <div className="space-y-2 mt-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  VaultLeap will never ask you for your seed phrase, password, or personal details through
                  Discord, email, or any other channel.
                </AlertDescription>
              </Alert>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  We will never pressure you to act urgently, click suspicious links, or authorize surprise transactions.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How does VaultLeap protect my funds and data?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              VaultLeap implements institutional-grade security through multiple layers of protection:
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Shield, title: "Secure Infrastructure", desc: "AWS SOC 2 compliant with regular audits" },
                { icon: Lock, title: "Industry-Standard Encryption", desc: "AES-256 for stored data and TLS 1.2+ for all transfers" },
                { icon: Wallet, title: "True Self-Custody", desc: "You always maintain control of your assets, not us" },
                { icon: Users, title: "Expert Partners", desc: "Backed by industry leaders in security and compliance" },
                { icon: CheckCircle, title: "Multiple Protection Layers", desc: "Transaction verification and multi-factor authentication" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <item.icon className="h-4 w-4 text-red-600 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What security measures protect my wallet?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Your VaultLeap smart wallet is protected by:
            </Typography>
            <ul className="space-y-2 ml-4">
              {[
                { icon: Smartphone, text: "Biometric Authentication - Use Face ID or fingerprint verification for access" },
                { icon: Mail, text: "Email-Based Recovery - Secure account recovery if you lose device access" },
                { icon: AlertTriangle, text: "Contextual Security - Alerts for logins from new countries or unusual activity" },
                { icon: Eye, text: "Session Management - View and revoke device access from a central dashboard" },
                { icon: Key, text: "No Stored Private Keys - VaultLeap never stores your private keys on our servers" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <item.icon className="h-4 w-4 text-blue-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item.text}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Who controls my money?
            </Typography>
            <Typography className="text-muted-foreground">
              You do. VaultLeap is self-custodial. That means your funds are never stored by us or any third party.
              You're always in control.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How do I recover my account if I lose access?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Use your email-based recovery. If biometric login is enabled, it can help too. We'll guide you
              securely through the process.
            </Typography>
            <Typography className="text-muted-foreground mb-3">
              You can recover your wallet using secure, email-based recovery. If you've activated biometric login,
              you may also be able to restore access through your device.
            </Typography>

            <Alert variant="destructive" className="mb-3">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>IMPORTANT:</strong> If private keys are lost or compromised, whoever has those private keys
                has permanent access to that wallet. Private keys cannot be changed or revoked.
              </AlertDescription>
            </Alert>

            <Typography className="text-muted-foreground">
              Need help? Our support team is here — but we'll never ask for your keys or sensitive info during recovery.
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Private Keys & Security Section */}
      <Card className="mb-8" id="private-keys">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Key className="h-6 w-6 text-orange-600" />
            Private Keys & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              What are private keys?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Private keys are unique, secret cryptographic codes that serve as your digital signature and proof
              of ownership for your crypto assets. They function similar to the master key for a safe deposit box -
              whoever has the private key controls the assets inside.
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              In VaultLeap's self-custodial wallet:
            </Typography>
            <ul className="list-[square] pl-4 space-y-1 text-orange-500">
              {[
                "You alone hold your private keys",
                "These keys are never stored by VaultLeap",
                "Private keys are mathematically linked to your public address",
                "Transactions require your private key's signature"
              ].map((item, index) => (
                <li key={index}>
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Why are private keys important?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Private keys are the foundation of blockchain security and self-custody. Here's why they're critical:
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Lock, title: "Complete Control", desc: "Only the holder of the private key can access and move funds" },
                { icon: AlertTriangle, title: "Irrevocable Access", desc: "Unlike passwords, private keys cannot be changed or reset" },
                { icon: Shield, title: "Permanent Ownership", desc: "If someone gains your private key, they permanently control your wallet" },
                { icon: Key, title: "No Third-Party Recovery", desc: "There is no \"forgot password\" option with private keys" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <item.icon className="h-4 w-4 text-orange-600 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How does VaultLeap handle private keys?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              VaultLeap's approach to private keys prioritizes both security and user experience:
            </Typography>
            <ul className="space-y-2 ml-4">
              {[
                { icon: Wallet, text: "Self-Custodial: Your private keys belong only to you" },
                { icon: Key, text: "No Seed Phrases: Unlike traditional crypto wallets, you don't need to manage complex seed phrases" },
                { icon: Lock, text: "Secure Storage: Your keys are securely stored in your device's protected environment" },
                { icon: Smartphone, text: "Biometric Protection: Face ID or fingerprint verification can be enabled for extra security" },
                { icon: Mail, text: "Email Recovery: We provide a secure, email-based recovery system if you lose access" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <item.icon className="h-4 w-4 text-blue-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item.text}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What if my private keys are compromised?
            </Typography>

            <Alert variant="destructive" className="mb-3">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>WARNING:</strong> If your private keys are compromised, the security of your wallet is permanently affected
              </AlertDescription>
            </Alert>

            <Typography variant="p" className="text-muted-foreground mb-3">
              If you suspect your private keys have been compromised:
            </Typography>
            <ol className="space-y-1 ml-4">
              {[
                "Immediately create a new wallet",
                "Transfer any remaining funds to the new wallet",
                "Never use the compromised wallet again",
                "Contact support for additional guidance"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="min-w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </Badge>
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ol>
            <Typography className="text-muted-foreground mt-3">
              Remember: VaultLeap will never ask for your private keys under any circumstances.
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Premium Vault Features Section */}
      <Card className="mb-8" id="vault-features">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Premium Vault Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              What is a Vault?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              A Vault is an on-chain payment container that holds funds until they're claimed. It's used for things like:
            </Typography>
            <ul className="list-[square] pl-4 space-y-1 text-yellow-500">
              {[
                "Revenue splitting with teams",
                "Pay-per-project contracts",
                "Milestone-based or delayed payouts",
                "Lending repayment"
              ].map((item, index) => (
                <li key={index}>
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
            <div className="bg-yellow-50 p-4 rounded-lg mt-3">
              <Typography className="text-yellow-800">
                <strong>Real-world example:</strong> A podcast has three co-hosts who split revenue 40/30/30. They set up
                a VaultLeap Vault with these percentages, and when a sponsor sends $10,000 to their Vault, it automatically
                allocates $4,000 to the main host and $3,000 to each co-host. Everyone claims their share without any
                manual calculations or transfers.
              </Typography>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What is a Vault Key?
            </Typography>
            <Typography className="text-muted-foreground">
              A Vault Key is your access pass to a specific Vault. It's a secure token stored in your wallet that proves
              what you're entitled to. You get it via email, and you must claim it to unlock access to funds.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What's the difference between a smart wallet and a Vault?
            </Typography>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <Typography variant="h5" className="mb-2 flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-blue-600" />
                  Smart Wallet
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  Your personal, self-custodial wallet where all your funds are held.
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  When someone sends you a bank transfer, we automatically convert it into Digital Dollars (USDC or EURC)
                  and store it in your wallet.
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  From your wallet, you can:
                </Typography>
                <ul className="space-y-1 ml-4">
                  {[
                    "Send funds out globally to bank accounts (yours or others)",
                    "Receive direct payments",
                    "Manage your account with biometric login and email-based recovery"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <Typography className="text-muted-foreground text-sm">
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
                <Typography className="text-muted-foreground mt-2">
                  It works like a modern banking layer — but with borderless capabilities and full self-custody.
                </Typography>
              </div>

              <div className="border rounded-lg p-4">
                <Typography variant="h5" className="mb-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  Vault
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  A premium on-chain account used for managing conditional or multi-party payouts.
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  Funds sent to a Vault remain locked until claimed. To access a Vault, you must hold a Vault Key —
                  a secure ERC-1155 token that lives in your wallet and defines your share, permissions, and payout rules.
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  Note: Vault Keys are delivered via email and must be claimed to unlock access
                </Typography>
                <Typography className="text-muted-foreground mb-2">
                  Vaults are perfect for:
                </Typography>
                <ul className="space-y-1 ml-4">
                  {[
                    "Splitting revenue automatically",
                    "Releasing funds after reaching a goal (via Profit Switch)",
                    "Sending payments via email with embedded tax and compliance data"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                      <Typography className="text-muted-foreground text-sm">
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Can I send money to an email address?
            </Typography>
            <Typography className="text-muted-foreground">
              Yes — Vaults let you send money to recipients via email. The recipient receives a vault key via email.
              Once claimed, the key unlocks their designated funds from the Vault.
            </Typography>
          </div>
        </CardContent>
      </Card>



      {/* Advanced Money Management Section */}
      <Card className="mb-8" id="advanced-money">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-6 w-6 text-purple-600" />
            Advanced Money Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              What is Auto-Split?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Auto-Split is a premium feature that automatically divides incoming funds by custom percentages to up to 10 recipients.
              When money hits the vault, it's distributed according to your preset allocations.
            </Typography>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Typography className="text-blue-800 leading-loose">
                <strong>Real-world example:</strong> A podcast with three co-hosts set up Auto-Split percentages of 40/30/30.
                When their $10,000 sponsorship payment arrived, $4,000 was automatically routed to the main host and $3,000 to
                each co-host without any manual calculations or transfers.
              </Typography>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How does Loan Repayment work?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Our Profit Switch feature enables sophisticated loan repayment structures. You can fund a specific wallet up to a
              preset limit, and once that threshold is reached, additional funds automatically route to other destinations.
            </Typography>
            <div className="bg-green-50 p-4 rounded-lg">
              <Typography className="text-green-800">
                <strong>Real-world example:</strong> An indie film project raised $50,000 from investors who needed to be repaid
                before profits were distributed. They set a Profit Switch threshold of $50,000 going to the investor wallet.
                All revenue up to that amount went to investors, and anything beyond split 50/50 between the director and producer.
              </Typography>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How can I pay someone who doesn't have VaultLeap?
            </Typography>
            <Typography className="text-muted-foreground">
              With our "Pay Anyone via Email" feature, you simply enter an email address and payment amount. The recipient
              receives a secure vault key via email that they can claim to access their funds—no account required beforehand.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Do you have plans for additional features?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Yes, we're continuously expanding our platform. Coming soon:
            </Typography>
            <ul className="space-y-2 ml-4">
              {[
                { title: "Yield-bearing accounts", desc: "Earn returns on your stable currency holdings" },
                { title: "Enhanced Tax Integration", desc: "Attach tax documentation to each payment for compliance" },
                { title: "QR Payment Capabilities", desc: "Accept QR code payments in stablecoin and settle directly to your bank account" },
                { title: "Advanced Financial Reporting", desc: "Downloadable reports formatted for accounting systems" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tax & Compliance Section */}
      <Card className="mb-8" id="tax-compliance">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-6 w-6 text-blue-600" />
            Tax & Compliance (Premium Accounts)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              Will I get tax documents from VaultLeap?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Yes. If you earn $600+ and you're in the U.S., we'll generate a 1099-NEC for you. International users get W-8BEN
              or W-8BEN-E forms depending on their status.
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              VaultLeap automatically generates:
            </Typography>
            <ul className="space-y-1 ml-4">
              {[
                "1099-NEC for U.S. users earning $600+ (available by January 31st of the following year)",
                "W-9, W-8BEN, and W-8BEN-E for domestic and international recipients"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How does VaultLeap help with tax compliance?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Our Tax Center provides comprehensive compliance tools:
            </Typography>
            <ul className="space-y-2 ml-4">
              {[
                { title: "Form Generation", desc: "Creates real W-9, 1099, and W-8BEN forms as encrypted PDFs" },
                { title: "Form Helper", desc: "Guides users in selecting which forms they need to complete" },
                { title: "Form Attachment", desc: "Attach required tax documentation directly to payments" },
                { title: "Email Notifications", desc: "Get alerted when new tax documents are ready" },
                { title: "Password Protection", desc: "Access forms securely with encrypted protection" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              How does this benefit international businesses?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              For international businesses working with U.S. clients, our tax compliance features help you:
            </Typography>
            <ul className="space-y-1 ml-4">
              {[
                "Appear as a domestic vendor for payment purposes",
                "Avoid the standard 25% withholding tax on international payments",
                "Provide all required documentation without complex international tax filings",
                "Maintain full compliance with U.S. tax regulations"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Where do I find these forms?
            </Typography>
            <Typography className="text-muted-foreground mb-2">
              In your dashboard's Tax Center. They're downloadable as encrypted PDFs and we'll notify you by email when they're ready.
            </Typography>
            <Typography className="text-muted-foreground">
              Encrypted, downloadable PDFs are available in the Tax Center, and a built-in form helper helps users choose the right ones.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What year do tax forms apply to?
            </Typography>
            <Typography className="text-muted-foreground">
              You'll receive tax documents for the year you claim the funds — not the year they were sent.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Do I need to opt in to receive tax forms?
            </Typography>
            <Typography className="text-muted-foreground">
              No separate opt-in is required — by agreeing to our Terms of Service during onboarding, you automatically consent
              to receive tax forms electronically. You can manage or revoke this consent anytime in your settings.
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Industry-Specific Solutions Section */}
      <Card className="mb-8" id="industry-solutions">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-6 w-6 text-indigo-600" />
            Industry-Specific Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              Does VaultLeap offer solutions for my specific business type?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Yes, VaultLeap offers customizable solutions for various industries, including:
            </Typography>
            <ul className="space-y-2 ml-4">
              {[
                { title: "E-commerce businesses", desc: "Easily connect your sales platforms and manage inventory payments" },
                { title: "Service providers", desc: "Create professional invoices and automated billing flows" },
                { title: "Amazon sellers", desc: "Manage marketplace payouts in stable currency across different regions" },
                { title: "Luxury goods", desc: "Secure high-value transactions with enhanced verification options" }
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500 mt-2 flex-shrink-0" />
                  <div>
                    <Typography className="font-medium">
                      {item.title}
                    </Typography>
                    <Typography className="text-muted-foreground text-sm">
                      {item.desc}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
            <Typography className="text-muted-foreground mt-3">
              Our platform adapts to your specific business needs with industry-specific configurations, branding options,
              and settlement flows that work for your unique requirements.
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Transaction Costs Section */}
      <Card className="mb-8" id="pricing-costs">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
            Pricing & Transaction Costs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">
              What are VaultLeap's fees?
            </Typography>
            <ul className="space-y-1 ml-4">
              {[
                "0.5% per transaction",
                "Up to 0.5% on conversions",
                "Blockchain gas fees are covered by VaultLeap",
                "Vaults are part of our premium feature set, with additional capabilities included"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-green-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              What are the transaction costs?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              We pass through payment-method transaction fees at cost. Details below:
            </Typography>

            <div className="space-y-4">
              <div>
                <Typography variant="h5" className="mb-2">USD payments</Typography>
                <ul className="space-y-1 ml-4">
                  {[
                    "ACH: $0.50",
                    "Same Day ACH: $1",
                    "Wire: $20",
                    "ACH and Wire Returns: Varies depending on amount and bank"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                      <Typography className="text-muted-foreground">
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Typography variant="h5" className="mb-2">EUR payments</Typography>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    <Typography className="text-muted-foreground">
                      SEPA: $1
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Typography variant="h5" className="mb-2">Crypto withdrawals</Typography>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                    <Typography className="text-muted-foreground">
                      Gas fees (vary by blockchain, covered by VaultLeap)
                    </Typography>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Are there hidden fees?
            </Typography>
            <Typography className="text-muted-foreground">
              No. Unlike traditional banks and payment processors that often hide fees in exchange rates or monthly charges,
              VaultLeap is completely transparent about all costs. What you see above is what you pay—no surprises, no markups,
              and no inflated exchange rates.
            </Typography>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Do premium users get perks?
            </Typography>
            <Typography variant="p" className="text-muted-foreground mb-3">
              Yes. Premium users get:
            </Typography>
            <ul className="space-y-1 ml-4">
              {[
                "Lower fees",
                "White-label tools",
                "Priority support",
                "Access to Profit Switch and advanced Vault features"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500 mt-2 flex-shrink-0" />
                  <Typography className="text-muted-foreground">
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <Typography variant="h4" className="mb-2">
              Can I test VaultLeap without paying?
            </Typography>
            <Typography className="text-muted-foreground">
              Yes. You can receive and send money with your wallet. Vaults and advanced features are available on a usage-based
              or subscription basis.
            </Typography>
          </div>
        </CardContent>
      </Card>
        </div>

        {/* Navigation Sidebar - Right Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
}
