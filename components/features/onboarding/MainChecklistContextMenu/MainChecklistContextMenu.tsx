import { ReactNode } from "react"
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuSeparator
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"
import { MainChecklistBannerProps } from "@/components/features/onboarding/MainChecklistBanner/MainChecklistBanner.types"
import MainChecklistBannerProgress from "@/components/features/onboarding/MainChecklistBannerProgress/index"

interface MainChecklistContextMenuProps extends MainChecklistBannerProps {
  trigger: ReactNode
}

export default function MainChecklistContextMenu(props: MainChecklistContextMenuProps) {
  // Sort tasks to show incomplete tasks first, then completed tasks
  const sortedTasks = [...props.tasks].sort((a, b) => {
    // Sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // If completion status is the same, maintain original order
    return 0
  })

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {props.trigger}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-[320px] p-0 rounded-xl shadow-lg">
        <div className="flex flex-row justify-between items-center p-4 border-b border-[#e9ecef]">
          <h4 className="m-0">Setup Progress</h4>
          <MainChecklistBannerProgress 
            value={props.tasks.filter(t => t.completed).length} 
            max={props.tasks.length} 
          />
        </div>
        
        <div className="max-h-[400px] overflow-y-auto py-2">
          {sortedTasks.map((task, index) => (
            <ContextMenuItem
              key={task.taskKey || index}
              className="flex items-start gap-3 px-4 py-2 cursor-default"
              onClick={() => {
                if (!task.completed && task.taskKey) {
                  props.onTriggerTask(task.taskKey)
                }
              }}
            >
              <div className="mt-1 text-[#34C759] text-base min-w-7">
                {task.completed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16">
                    <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                  </svg>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-[#999]" />
                )}
              </div>
              <div className="flex flex-col flex-grow">
                <h5 className="m-0 mb-1">{task.label}</h5>
                <p className="text-xs text-[#666] m-0">{task.description}</p>
              </div>
              <div>
                <button
                  className={cn(
                    "text-white border-none py-1 px-2 rounded text-xs whitespace-nowrap",
                    task.completed ? "bg-[#34C759] cursor-default" : "bg-[#007AFF] cursor-pointer"
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!task.completed && task.taskKey) {
                      props.onTriggerTask(task.taskKey)
                    }
                  }}
                >
                  {task.completed ? task.buttonLabel.completed : task.buttonLabel.opened}
                </button>
              </div>
            </ContextMenuItem>
          ))}
        </div>
        
        <ContextMenuSeparator />
        
        <div className="flex flex-row justify-center p-4">
          <button
            className="bg-transparent border-none text-[#007AFF] text-xs cursor-pointer p-0 hover:underline"
            onClick={props.onDissmiss}
          >
            Dismiss all tasks
          </button>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  )
}
