import { createSelector } from '@reduxjs/toolkit'

import { StoreKeys } from '../store.keys'
import { selectReducer } from '../store.utils'
import { CreatorStages } from './creatorManager.types'
import { stagesDescriptions } from './creatorManager.const'

const selectCreatorManagerState = createSelector([selectReducer(StoreKeys.CreatorManager)], (state) => state)

const selectCurrentStage = createSelector([selectCreatorManagerState], (state) => state.currentStage)
const selectStagesList = createSelector([selectCreatorManagerState], (state) => state.stagesList)
const selectStagesLength = createSelector([selectCreatorManagerState], (state) => state.stagesList.length)

const selectCurrentStageIndex = createSelector([selectCurrentStage, selectStagesList], (currentStage, stagesList) => {
  return stagesList.findIndex((stage) => stage === currentStage)
})

const selectIsCreatorInProgress = createSelector([selectCurrentStage], (currentStage) => currentStage !== CreatorStages.NOT_STARTED)
const selectIsCreatorCompleted = createSelector([selectCurrentStage], (currentStage) => currentStage === CreatorStages.FINISEHD)
const selectCurrentStageDescription = createSelector([selectCurrentStage], (currentStage) => stagesDescriptions[currentStage])

export const creatorManagerSelectors = {
  selectStagesList,
  selectCurrentStage,
  selectStagesLength,
  selectCurrentStageIndex,
  selectIsCreatorCompleted,
  selectIsCreatorInProgress,
  selectCurrentStageDescription,
}
