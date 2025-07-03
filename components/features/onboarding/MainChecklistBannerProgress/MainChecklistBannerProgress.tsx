import { MainChecklistBannerProgressProps } from "./MainChecklistBannerProgress.types"
import { cn } from "@/lib/utils"

export default function MainChecklistBannerProgress (props: MainChecklistBannerProgressProps) {
    const percentage = props.max > 0 ? Math.round((props.value / props.max) * 100) : 0

    return (
        <div className="flex flex-row items-center gap-2">
            <div className="relative w-[120px] h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "absolute top-0 left-0 h-full rounded-full transition-all duration-300",
                        percentage === 100 ? "bg-green-500" : "bg-primary-500"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <label className="text-xs text-[#666] whitespace-nowrap">
                {props.value}/{props.max}
            </label>
        </div>
    )
}
