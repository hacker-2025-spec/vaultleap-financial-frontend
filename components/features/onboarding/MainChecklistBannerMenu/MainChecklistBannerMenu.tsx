import { MainChecklistBannerMenuProps } from "./MainChecklistBannerMenu.types"
import MainChecklistBannerProgress from "@/components/features/onboarding/MainChecklistBannerProgress/index"
import MainChecklistBannerMenuItem from "@/components/features/onboarding/MainChecklIstBannerMenuItem/MainChecklistBannerMenuItem"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function MainChecklistBannerMenu (props: MainChecklistBannerMenuProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {props.trigger}
            </PopoverTrigger>
            <PopoverContent className="w-[320px] h-full p-0 rounded-xl shadow-lg" align="end">
                <div className="flex flex-row justify-between items-center p-4 border-b border-[#e9ecef]">
                    <h4>Setup Progress</h4>
                    <MainChecklistBannerProgress value={props.tasks.filter(t => t.completed).length} max={props.tasks.length} />
                </div>
                <div className="max-h-[400px] overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto">
                        {/* Sort tasks to show incomplete tasks first, then completed tasks */}
                        {[...props.tasks]
                            .sort((a, b) => {
                                // Sort by completion status (incomplete first)
                                if (a.completed !== b.completed) {
                                    return a.completed ? 1 : -1
                                }
                                // If completion status is the same, maintain original order
                                return 0
                            })
                            .map((t, index) => <MainChecklistBannerMenuItem key={t.taskKey || index} {...t} onTriggerTask={props.onTriggerTask} />)}
                    </div>
                </div>
                <div className="flex flex-row justify-center p-4 border-t border-[#e9ecef]">
                    <button
                        className={cn(
                            "bg-transparent border-none text-[#007AFF] text-xs cursor-pointer p-0",
                            "hover:underline"
                        )}
                        onClick={props.onDissmiss}
                    >
                        Dismiss all tasks
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
