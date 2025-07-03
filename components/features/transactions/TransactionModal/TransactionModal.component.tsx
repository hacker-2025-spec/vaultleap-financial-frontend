import React from 'react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { getStatusColor, getStageTextStyles, getProgressDotStyles, getProgressLineStyles } from './TransactionModal.styles'
import type { TransactionModalComponentProps } from './TransactionModal.types'
import { StatusTexts, TransactionTypeNames, TransactionStageNames, TransactionStageDescriptions } from './TransactionModal.texts'

export const TransactionModalComponent: React.FC<TransactionModalComponentProps> = ({
  currentProcessedTransactionRemainingStages,
  currentProcessedTransactionStage,
  currentProcessedTransactionStages,
  currentProcessedTransactionStatus,
  currentProcessedTransactionType,
  error,
  handleCloseModal,
  className,
  ...props
}) => {
  const currentStageIndex = currentProcessedTransactionStages.indexOf(
    currentProcessedTransactionStage ?? currentProcessedTransactionStages[0]
  )

  console.log('has error', Boolean(error))
  return (
    <div className="h-full overflow-auto relative" {...props}>
      <div className="box-border p-12 flex flex-col gap-12 justify-center items-center self-center">
        <div className="relative w-full h-full flex justify-center items-center p-12 bg-[#0c5186] rounded-[10px]">
          <div className="w-full h-full flex flex-col items-center gap-4 relative z-[1000]">
            <div className="flex flex-col gap-1 mb-4">
              <Typography variant="h3" className="text-white font-inter text-center">
                {TransactionTypeNames[currentProcessedTransactionType]}
              </Typography>
              <div className={`p-2.5 rounded-[10px] mb-5 w-auto text-center ${getStatusColor(currentProcessedTransactionStatus)}`}>
                <Typography variant="p" className="text-white font-inter text-center text-lg">
                  {StatusTexts[currentProcessedTransactionType][currentProcessedTransactionStatus]}
                </Typography>
              </div>
            </div>

            <div className="relative w-full flex flex-col items-center">
              <div className={getProgressLineStyles(currentProcessedTransactionStages.length, currentStageIndex)} />
              {currentProcessedTransactionStages.map((stage, index) => {
                const isActive = stage === currentProcessedTransactionStage
                const isDone = index < currentStageIndex
                const isError = isActive && Boolean(error)
                return (
                  <div key={index} className="flex items-center gap-2 w-full pb-6 relative">
                    <div className={getProgressDotStyles(isActive, isDone)}>
                      {isDone && <span className="text-xs text-white w-[15px] h-[18px] text-center">✓</span>}
                    </div>
                    <div className="bg-[#2595EB] p-2 rounded-[10px] text-white text-center flex-grow">
                      <Typography
                        variant="h5"
                        className={getStageTextStyles(isDone, isActive, isError)}
                      >
                        {TransactionStageNames[stage]}
                      </Typography>
                      <Typography
                        variant="p"
                        className={`text-lg ${getStageTextStyles(isDone, isActive, isError)}`}
                      >
                        {TransactionStageDescriptions[stage]}
                      </Typography>
                    </div>
                  </div>
                )
              })}
            </div>

            {Boolean(error) && (
              <Button
                variant="default"
                className="self-center"
                onClick={handleCloseModal}
              >
                GO BACK
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
