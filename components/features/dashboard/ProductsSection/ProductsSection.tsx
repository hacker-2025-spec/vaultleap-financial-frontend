'use client'

import { ProductCard } from '@/components/features/dashboard/ProductCard/ProductCard'
import { ArrowDown, ArrowUp, Percent, QrCode, FileText, Users } from 'lucide-react'
import { SectionCard } from '@/components/layout/SectionCard/SectionCard'
import { SubSection } from '@/components/layout/SubSection/SubSection'

export const ProductsSection = () => {
  // TEMPORARILY DISABLED: Premium features are hidden until implementation is complete
  // TODO: Re-enable premium status checking when premium features are ready
  // Original code: const isPremium = useSelector(userSelectors.selectIsPremiumAccount)

  // TEMPORARY: Force isPremium to false to show all premium products as inactive
  const isPremium = false

  const products = [
    {
      name: 'Receive Funds',
      description: 'Accept fiat payments via bank ACH, automatically converts to Stablecoin',
      tags: ['Core'],
      icon: <ArrowDown className="h-5 w-5 text-white" />,
    },
    {
      name: 'Transfer Funds',
      description: 'Send Stablecoin to a wallet, or as fiat to a bank account',
      tags: ['Core'],
      icon: <ArrowUp className="h-5 w-5 text-white" />,
    },
    {
      name: 'Multi-Payment Vaults',
      description: 'Create vaults that can send payments to multiple recipients in one transaction',
      tags: ['Premium'],
      icon: <Users className="h-5 w-5 text-white" />,
      premiumOnly: true,
    },
    {
      name: 'Split-Payment Vaults',
      description: 'Create vaults that automatically split incoming payments among team members',
      tags: ['Premium'],
      icon: <Percent className="h-5 w-5 text-white" />,
      premiumOnly: true,
    },
    {
      name: 'Merchant Vaults',
      description: 'Create vaults with QR code payments and detailed transaction tracking',
      tags: ['Premium'],
      icon: <QrCode className="h-5 w-5 text-white" />,
      premiumOnly: true,
    },
    {
      name: 'TaxLink',
      description: 'Integrated tax form capabilities for all onchain vaults',
      tags: ['Included'],
      icon: <FileText className="h-5 w-5 text-white" />,
      premiumOnly: true,
    },
  ]

  const subSections = [
    {
      name: 'Your VaultLeap Products',
      products: products.filter((i) => !i.premiumOnly),
      dataTour: 'products',
    },
    // {
    //   name: 'Premium Onchain Products',
    //   products: products.filter((i) => !!i.premiumOnly),
    //   dataTour: 'premium-products',
    // },
  ]

  const getProductStatus = ({
    premiumOnly,
    notAvailable,
  }: {
    premiumOnly?: boolean
    notAvailable?: boolean
  }): 'active' | 'inactive' | 'notAvailable' => {
    if (notAvailable) return 'notAvailable'
    if (!premiumOnly) return 'active'
    return isPremium ? 'active' : 'inactive'
  }

  return (
    <SectionCard className="mt-4">
      {subSections.map((section) => {
        if (!section.products.length) return null

        return (
          <SubSection title={section.name} key={section.name}>
            <div className={section.dataTour}>
              <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {section.products.map((product) => (
                  <ProductCard key={product.name} {...product} status={getProductStatus(product)} />
                ))}
              </div>
            </div>
          </SubSection>
        )
      })}
    </SectionCard>
  )
}
