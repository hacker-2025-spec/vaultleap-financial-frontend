import { CreateLiquidationAddressModalFormFields } from "@/components/features/vaults/CreateLiquidationAddressModal/CreateLiquidationAddressModal.types"
import { PayeeCreator } from "./PayeeCreator.types"

export class PayeeCreatorState implements PayeeCreator {
    data: Partial<CreateLiquidationAddressModalFormFields> = {}
    processing = false
    succeed: boolean | null = null
}
