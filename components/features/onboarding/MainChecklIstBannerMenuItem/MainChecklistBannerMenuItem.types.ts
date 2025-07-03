import { SetupTask } from "@/components/features/onboarding/MainChecklistBanner/MainChecklistBanner.types"

export type MainChecklistBannerMenuItemProps = SetupTask & { onTriggerTask: (key: string) => void }
