import { KYCVerificationStatus } from "@/store/KnowYourCustomer/KnowYourCustomer"

export interface KYCModalProps {
    isOpen: boolean
    onClose: (status?: KYCVerificationStatus) => void
    kycVerificationStatus: KYCVerificationStatus
}