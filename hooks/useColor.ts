import { useCallback } from "react"

export default function useColor<T extends HTMLElement = HTMLElement>(color?: string) {
    const onRefChange = useCallback((node: T) => {
        if (node !== null) { 
            node.setAttribute('style', `--color: ${color || '#007AFF'}`)
        }
    }, [color])

    return { onRefChange }
}
