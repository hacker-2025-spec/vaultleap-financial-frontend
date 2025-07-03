import { X } from 'lucide-react'
import { MainChecklistBannerProps } from './MainChecklistBanner.types'
import MainChecklistPopover from '@/components/features/onboarding/MainChecklistPopover/MainChecklistPopover'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Rocket } from '@/assets/svg/Rocket.tsx'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion } from 'framer-motion'

export default function MainChecklistBanner(props: MainChecklistBannerProps) {
  const isMobile = useIsMobile()

  const handleTriggerTask = (key: string) => {
    props.onTriggerTask?.(key)
  }

  const handleDismiss = () => {
    props.onDissmiss?.()
  }

  const completedTasks = props.tasks.filter((t) => t.completed).length
  const totalTasks = props.tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const isCompleted = completedTasks === totalTasks

  return (
    <Card size="xs" rounded={'xl'} color={'gray'} className="rounded-xl">
      <CardContent size="xs" className={cn('flex w-full px-4', isMobile ? 'flex-col gap-3' : 'flex-row gap-4')}>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className={'flex flex-row gap-2 justify-center items-center'}>
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                }}
              >
                <div className={'size-6 text-white bg-primary rounded-full flex items-center justify-center'}>
                  <Rocket />
                </div>
              </motion.div>
              <div>
                <h5 className="text-sm font-bold">Complete your VaultLeap setup</h5>
                <p className="text-[11px] text-[#666]">
                  {/* Find the first incomplete task to show as 'Next' */}
                  Next: {props.tasks.find((t) => !t.completed)?.label || 'All tasks completed!'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('flex items-center gap-2', isMobile ? 'flex-row w-full' : 'flex-row grow')}>
          <div className={cn('flex items-center gap-2', isMobile ? 'flex-1' : 'grow justify-end')}>
            <Progress
              value={progressPercentage}
              className={cn('h-2', isCompleted ? '[&>*]:bg-green-500' : '[&>*]:bg-primary', isMobile ? 'flex-1' : 'w-[160px]')}
            />
            <span className="text-xs text-[#666] whitespace-nowrap">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <div className={'flex justify-center w-fit items-center'}>
            <MainChecklistPopover tasks={props.tasks} onTriggerTask={handleTriggerTask} onDissmiss={handleDismiss} />

            <Button size={'sm'} variant={'ghost'} aria-label="close" onClick={handleDismiss}>
              <X size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
