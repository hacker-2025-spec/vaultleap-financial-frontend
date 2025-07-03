import { MainChecklistBannerMenuItemProps } from "./MainChecklistBannerMenuItem.types"
import { cn } from "@/lib/utils"

export default function MainChecklistBannerMenuItem (props: MainChecklistBannerMenuItemProps) {
    const handleClick = () => {
        if (!props.completed && props.taskKey) {
            console.log('Triggering task with key:', props.taskKey)
            props.onTriggerTask(props.taskKey)
        }
    }

    return (
        <div className="flex flex-row justify-start items-start p-3 px-4 border-b border-[#f1f1f1]">
            <div className="mr-3 mt-1 text-[#34C759] text-base min-w-7">
                {props.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16">
                        <path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                ) : (
                    <div className="w-4 h-4 rounded-full bg-[#999]" />
                )}
            </div>
            <div className="flex flex-col flex-grow">
                <h5>{props.label}</h5>
                <p className="text-xs text-[#666]">{props.description}</p>
            </div>
            <div>
                <button
                    className={cn(
                        "text-white border-none py-1 px-2 rounded text-xs whitespace-nowrap",
                        props.completed ? "bg-[#34C759] cursor-default" : "bg-[#007AFF] cursor-pointer"
                    )}
                    onClick={handleClick}
                >
                    {props.completed ? props.buttonLabel.completed : props.buttonLabel.opened}
                </button>
            </div>
        </div>
    )
}
