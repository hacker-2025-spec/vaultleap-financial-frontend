import { VirtualAccountEntity } from "@klydo-io/getrewards-backend-api"
import { VACreator } from "./VACreator.types"
import { CreateVirtualAccountModalFormFields } from "@/components/features/vaults/CreateVirtualAccountModal/CreateVirtualAccountModal.types"

export class VACreatorState implements VACreator {
    data: Partial<CreateVirtualAccountModalFormFields> = {}
    processing = false
    fetching = false
    succeed: boolean | null = null
    virtualAccounts: VirtualAccountEntity[] = []
}
