import { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { MainChecklistBannerProps } from '@/components/features/onboarding/MainChecklistBanner/MainChecklistBanner.types'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { Progress } from '@/components/ui/progress'

interface MainChecklistPopoverProps extends MainChecklistBannerProps {
  trigger: ReactNode
}

export default function MainChecklistPopover(props: MainChecklistPopoverProps) {
  // Sort tasks to show incomplete tasks first, then completed tasks
  const sortedTasks = [...props.tasks].sort((a, b) => {
    // Sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    // If completion status is the same, maintain original order
    return 0
  })

  const completedCount = props.tasks.filter((t) => t.completed).length
  const totalCount = props.tasks.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <Popover>
      <PopoverTrigger>
        <Button size={'xs'}>Continue setup</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 rounded-xl shadow-lg">
        <div className="flex flex-col p-4 border-b border-[#e9ecef]">
          <div className="flex flex-row justify-between items-center mb-2">
            <div>
              <h4 className="m-0 text-base font-medium">Setup Progress</h4>
              <p className="text-xs text-muted-foreground m-0 mt-1">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
            <div className="flex items-center">
              <span className={cn('text-sm font-medium', progressPercentage === 100 ? 'text-green-500' : 'text-primary-500')}>
                {progressPercentage}%
              </span>
            </div>
          </div>

          <Progress
            value={progressPercentage}
            className={cn('w-full h-2', progressPercentage === 100 ? '[&>*]:bg-green-500' : '[&>*]:bg-primary')}
          />
        </div>

        <div className="max-h-[400px] overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {sortedTasks.map((task, index) => (
              <div
                key={task.taskKey || index}
                className="flex items-start gap-1 px-3 py-3 border-b border-[#f1f1f1] hover:bg-slate-50 transition-colors"
              >
                <div className="mt-1 text-[#34C759] text-base min-w-7">
                  {task.completed ? (
                    <CheckCircle2 className="text-green-500" size={18} />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="m-0 text-sm mb-1 font-medium text-slate-700">{task.label}</span>
                  <p className="text-xs text-slate-500 m-0">{task.description}</p>
                </div>
                <div>
                  <button
                    className={cn(
                      'text-white border-none py-1.5 px-2 rounded-md text-xs whitespace-nowrap font-medium',
                      task.completed ? 'bg-green-500 cursor-default' : 'bg-primary hover:bg-primary/60 cursor-pointer transition-colors'
                    )}
                    onClick={() => {
                      if (!task.completed && task.taskKey) {
                        props.onTriggerTask(task.taskKey)
                      }
                    }}
                  >
                    {task.completed ? task.buttonLabel.completed : task.buttonLabel.opened}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-center p-4 border-t border-[#e9ecef]">
          <button
            className="bg-transparent border-none text-primary-500 text-xs cursor-pointer p-0 hover:underline"
            onClick={props.onDissmiss}
          >
            Dismiss all tasks
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
