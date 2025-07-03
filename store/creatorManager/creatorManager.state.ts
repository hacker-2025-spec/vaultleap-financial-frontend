import { customOrderedStagesList } from './creatorManager.const'
import { CreatorManager, CreatorStages } from './creatorManager.types'

export class CreatorManagerState implements CreatorManager {
  currentStage: CreatorStages = CreatorStages.NOT_STARTED
  stagesList: CreatorStages[] = customOrderedStagesList
}
