export interface SetupTask {
    taskKey: string
    label: string
    description: string
    completed: boolean
    buttonLabel: {
        completed: string
        opened: string
    }
}

export interface MainChecklistBannerProps {
    tasks: SetupTask[]
    onTriggerTask: (key: string) => void
    onDissmiss: () => void
}
