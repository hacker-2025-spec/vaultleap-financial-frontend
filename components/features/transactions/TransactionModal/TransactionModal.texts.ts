import {
  TRANSACTION_TYPES,
  CREATE_VAULT_STAGES,
  CREATE_VAULTS_STAGES,
  WITHDRAW_USDC_STAGES,
  TRANSFER_VAULT_STAGES,
  CLAIM_VAULT_KEY_STAGES,
  CLAIMING_REWARDS_STAGES,
  SAGA_TRANSACTION_STATUS,
  RECLAIM_VAULT_KEY_STAGES,
  SEND_FUNDS_TO_VAULT_STAGES,
  TAvailableTransactionStages,
  CREATE_SELF_MANAGED_VAULT_STAGES,
  CLAIM_SELF_MANAGED_VAULT_KEYS_STAGES,
  CREATE_VAULTS_SINGLE_STAGES,
} from '@/store/transaction/transaction.types'

export const TransactionTypeNames: Record<TRANSACTION_TYPES, string> = {
  [TRANSACTION_TYPES.CREATE_VAULT]: 'Creating Your Vault',
  [TRANSACTION_TYPES.CREATE_VAULTS]: 'Creating Your Vaults',
  [TRANSACTION_TYPES.CREATE_VAULTS_SINGLE]: 'Creating Your Vault',
  [TRANSACTION_TYPES.SEND_FUNDS_TO_VAULT]: 'Sending Funds',
  [TRANSACTION_TYPES.CLAIM_VAULT_KEY]: 'Claim Vault Key',
  [TRANSACTION_TYPES.CLAIM_REWARD]: 'Claiming funds',
  [TRANSACTION_TYPES.TRANSFER_VAULT]: 'Transfer Vault Key',
  [TRANSACTION_TYPES.WITHDRAW_USDC]: 'Withdraw USDC',
  [TRANSACTION_TYPES.RECLAIM_VAULT_KEY]: 'Reclaim Vault Key',
  [TRANSACTION_TYPES.CREATE_SELF_MANAGED_VAULT]: 'Creating your Vault',
  [TRANSACTION_TYPES.CLAIM_SELF_MANAGED_VAULT_KEYS]: 'Claiming your Vault'
}

export const TransactionStageNames: Record<TAvailableTransactionStages, string> = {
  [CREATE_VAULT_STAGES.INITIALIZE_VAULT]: 'Getting Your Vault Ready',
  [CREATE_VAULT_STAGES.SUBMIT_VAULT_CONTRACTS_DEPLOYMENTS]: 'Sending a Vault Setup Request',
  [CREATE_VAULT_STAGES.WAIT_FOR_VAULT_CONTRACTS_DEPLOYMENT]: 'Setting Up Your Vault',
  [CREATE_VAULT_STAGES.SEND_VAULT_SUMMARY]: 'Emailing Your Vault Summary',
  [CREATE_VAULT_STAGES.SEND_VAULT_INVITATIONS]: 'Delivering Your Vault Keys',
  [CREATE_VAULTS_STAGES.INITIALIZE_VAULTS]: 'Getting Your Vaults Ready',
  [CREATE_VAULTS_STAGES.SUBMIT_VAULTS_CONTRACTS]: 'Setting Up Your Vaults',
  [CREATE_VAULTS_STAGES.SEND_VAULTS_EMAILS]: 'Sending Your Vaults Emails',
  [SEND_FUNDS_TO_VAULT_STAGES.CHECKING_VAULT]: 'Checking Vault Info',
  [SEND_FUNDS_TO_VAULT_STAGES.CHECKING_ALLOWANCE]: 'Confirming Available Amount of Funds',
  [SEND_FUNDS_TO_VAULT_STAGES.APPROVING_FUNDS]: 'Approving funds',
  [SEND_FUNDS_TO_VAULT_STAGES.SENDING_FUNDS]: 'Sending Funds to Vault',
  [CLAIMING_REWARDS_STAGES.CLAIMING_FUNDS]: 'Claiming USDC',
  [CLAIM_VAULT_KEY_STAGES.SYNCHRONIZE_CONTRACTS]: 'Checking Vault Info',
  [CLAIM_VAULT_KEY_STAGES.SIGNING_TRANSACTION]: 'Signing Vault Transaction',
  [CLAIM_VAULT_KEY_STAGES.WAIT_FOR_TRANSACTION_CONFIRMATION]: 'Confirming Vault',
  [TRANSFER_VAULT_STAGES.SENDING_VAULT_KEYS]: 'Sending Vault Keys',
  [WITHDRAW_USDC_STAGES.SENDING_USDC]: 'Sending USDC',
  [RECLAIM_VAULT_KEY_STAGES.SYNCHRONIZE_CONTRACTS]: 'Checking Vault Info',
  [RECLAIM_VAULT_KEY_STAGES.WAIT_FOR_TRANSACTION_CONFIRMATION]: 'Confirming Vault',

  [CREATE_SELF_MANAGED_VAULT_STAGES.INITIALIZE_VAULT]: 'Getting Your Vault Ready',
  [CREATE_SELF_MANAGED_VAULT_STAGES.WAIT_FOR_VAULT_CONTRACT_DEPLOYMENT]: 'Setting Up Your Vault',
  [CREATE_SELF_MANAGED_VAULT_STAGES.CLAIMING_VAULT_KEYS]: 'Claiming Your Vault Key',

  [CLAIM_SELF_MANAGED_VAULT_KEYS_STAGES.CLAIMING_VAULT_KEYS]: 'Claiming Your Vault Key',

  // CREATE_VAULTS_SINGLE transaction type is used in case of creating multiple vaults when amount of vaults equals 1
  [CREATE_VAULTS_SINGLE_STAGES.INITIALIZE_VAULTS]: 'Getting Your Vault Ready',
  [CREATE_VAULTS_SINGLE_STAGES.SUBMIT_VAULTS_CONTRACTS]: 'Setting Up Your Vault',
  [CREATE_VAULTS_SINGLE_STAGES.SEND_VAULTS_EMAILS]: 'Setting Up Your Vault',
}

export const TransactionStageDescriptions: Record<TAvailableTransactionStages, string> = {
  [CREATE_VAULT_STAGES.INITIALIZE_VAULT]: 'We’re Getting Everything Ready For Your New Vault',
  [CREATE_VAULT_STAGES.SUBMIT_VAULT_CONTRACTS_DEPLOYMENTS]: 'We’re Sending Out a Setup Request For Your Vault',
  [CREATE_VAULT_STAGES.WAIT_FOR_VAULT_CONTRACTS_DEPLOYMENT]: 'We’re Registering Your Vault on The Blockchain',
  [CREATE_VAULT_STAGES.SEND_VAULT_SUMMARY]: 'We’re Emailing You a Summary of Your Vault',
  [CREATE_VAULT_STAGES.SEND_VAULT_INVITATIONS]: 'We’re Sending All Your Teammates Their Vault Keys',
  [CREATE_VAULTS_STAGES.INITIALIZE_VAULTS]: 'We’re Getting Everything Ready For Your New Vaults',
  [CREATE_VAULTS_STAGES.SUBMIT_VAULTS_CONTRACTS]: 'We’re Sending Out a Setup Request and Registering Your Vaults on The Blockchain',
  [CREATE_VAULTS_STAGES.SEND_VAULTS_EMAILS]: 'We’re Emailing You a Summary of Your Vaults and Sending All Your Teammates Their Vault Keys',
  [SEND_FUNDS_TO_VAULT_STAGES.CHECKING_VAULT]: 'Preparing To Send Your Funds',
  [SEND_FUNDS_TO_VAULT_STAGES.CHECKING_ALLOWANCE]: 'Confirming Approved Amount for Fund Transfer',
  [SEND_FUNDS_TO_VAULT_STAGES.APPROVING_FUNDS]: 'Confirming Your Spending Limit..',
  [SEND_FUNDS_TO_VAULT_STAGES.SENDING_FUNDS]: 'We’re Sending Funds To Your Vault',
  [CLAIMING_REWARDS_STAGES.CLAIMING_FUNDS]: 'We’re Sending Funds To Your Wallet',
  [CLAIM_VAULT_KEY_STAGES.SYNCHRONIZE_CONTRACTS]: 'Making Sure Everything is Good To Go With Your Vault',
  [CLAIM_VAULT_KEY_STAGES.SIGNING_TRANSACTION]: 'We’re Covering The Gas Fees and Signing the Transaction For You!',
  [CLAIM_VAULT_KEY_STAGES.WAIT_FOR_TRANSACTION_CONFIRMATION]: 'Almost There! Waiting For The Vault Transaction To Be Confirmed..',
  [TRANSFER_VAULT_STAGES.SENDING_VAULT_KEYS]: 'We’re Sending Vault Keys To Another Wallet',
  [WITHDRAW_USDC_STAGES.SENDING_USDC]: 'We’re Withdrawing USDC To Another Wallet',
  [RECLAIM_VAULT_KEY_STAGES.SYNCHRONIZE_CONTRACTS]: 'Making Sure Everything is Good To Go With Your Vault',
  [RECLAIM_VAULT_KEY_STAGES.WAIT_FOR_TRANSACTION_CONFIRMATION]: 'Almost There! Waiting For The Vault Transaction To Be Confirmed..',

  [CREATE_SELF_MANAGED_VAULT_STAGES.INITIALIZE_VAULT]: 'We’re Getting Everything Ready For Your New Vault',
  [CREATE_SELF_MANAGED_VAULT_STAGES.WAIT_FOR_VAULT_CONTRACT_DEPLOYMENT]: 'We’re Registering Your Vault on The Blockchain',
  [CREATE_SELF_MANAGED_VAULT_STAGES.CLAIMING_VAULT_KEYS]: 'Claiming Your Vault',

  [CLAIM_SELF_MANAGED_VAULT_KEYS_STAGES.CLAIMING_VAULT_KEYS]: 'Claiming Your Vault',

  // CREATE_VAULTS_SINGLE transaction type is used in case of creating multiple vaults when amount of vaults equals 1
  [CREATE_VAULTS_SINGLE_STAGES.INITIALIZE_VAULTS]: 'We’re Getting Everything Ready For Your New Vault',
  [CREATE_VAULTS_SINGLE_STAGES.SUBMIT_VAULTS_CONTRACTS]: 'We’re Sending Out a Setup Request and Registering Your Vault on The Blockchain',
  [CREATE_VAULTS_SINGLE_STAGES.SEND_VAULTS_EMAILS]: 'We’re Emailing You a Summary of Your Vault and Sending Your Teammate Their Vault Keys',
}

export const StatusTexts: Record<TRANSACTION_TYPES, Record<SAGA_TRANSACTION_STATUS, string>> = {
  [TRANSACTION_TYPES.CREATE_VAULT]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vault Creation in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vault Creation Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Vault Creation Failed',
  },
  [TRANSACTION_TYPES.CREATE_VAULTS]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vaults Creation in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vaults Creation Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Vaults Creation Failed',
  },
  // CREATE_VAULTS_SINGLE transaction type is used in case of creating multiple vaults when amount of vaults equals 1
  [TRANSACTION_TYPES.CREATE_VAULTS_SINGLE]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vault Creation in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vault Creation Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Vault Creation Failed',
  },
  [TRANSACTION_TYPES.SEND_FUNDS_TO_VAULT]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Sending Funds in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Funds Successfully Sent',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Sending Funds Failed',
  },
  [TRANSACTION_TYPES.CLAIM_VAULT_KEY]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vault Key Claiming in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vault Key Claimed Successfully',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Claiming Keys Failed',
  },
  [TRANSACTION_TYPES.CLAIM_REWARD]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Claiming Funds in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Funds Claimed Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Claiming Funds Failed',
  },
  [TRANSACTION_TYPES.TRANSFER_VAULT]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vault Key Transfer in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vault Key Transfer Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Vault Key Transfer Failed',
  },
  [TRANSACTION_TYPES.WITHDRAW_USDC]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Withdraw USDC in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Withdraw USDC Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Withdraw USDC Failed',
  },
  [TRANSACTION_TYPES.RECLAIM_VAULT_KEY]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vault Key Reclaiming in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vault Key Reclaimed Successfully',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Reclaiming Keys Failed',
  },
  [TRANSACTION_TYPES.CREATE_SELF_MANAGED_VAULT]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vaults Creation in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vaults Creation Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Vaults Creation Failed',
  },
  [TRANSACTION_TYPES.CLAIM_SELF_MANAGED_VAULT_KEYS]: {
    [SAGA_TRANSACTION_STATUS.IDLE]: 'Waiting For Transaction To Start',
    [SAGA_TRANSACTION_STATUS.PENDING]: 'Vaults Claiming in Progress',
    [SAGA_TRANSACTION_STATUS.SUCCESS]: 'Vaults Claiming Successful',
    [SAGA_TRANSACTION_STATUS.FAILURE]: 'Vaults Claiming Failed',
  }
}
