import { useSelector } from "react-redux"
import { KYCStepComponent } from "./KYCStep.component"
import { knowYourCustomerSelectors } from "@/store/KnowYourCustomer/KnowYourCustomer.selectors"
import { VaultType } from "@/store/KnowYourCustomer/KnowYourCustomer"

export const KYCStepContainer = ({ vaultType }: { vaultType: VaultType }) => {
  const kycVerificationStatus = useSelector(knowYourCustomerSelectors.selectKycVerificationStatus)

  return (
    <KYCStepComponent
      kycVerificationStatus={kycVerificationStatus}
      vaultType={vaultType}
    />
  )
}
