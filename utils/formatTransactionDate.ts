import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

/**
 * Formats a date string for transaction tooltip display
 * @param dateString - ISO date string or date string
 * @returns Formatted date and time string for tooltip
 */
export const formatTransactionDate = (dateString: string): string => {
  try {
    const date = dayjs(dateString)

    // Check if date is valid
    if (!date.isValid()) {
      return 'Invalid date'
    }

    // Format with full date and time information
    return date.format('MMMM D, YYYY [at] h:mm:ss A')
  } catch (error) {
    console.error('Error formatting transaction date:', error)
    return 'Date unavailable'
  }
}

/**
 * Formats a date for wallet transaction grouping
 * Returns "Today", "Yesterday", or formatted date
 * @param dateString - ISO date string or date string
 * @returns Formatted date string for grouping
 */
export const formatWalletGroupDate = (dateString: string): string => {
  try {
    const date = dayjs(dateString)

    if (!date.isValid()) {
      return 'Unknown Date'
    }

    if (date.isToday()) {
      return 'Today'
    }

    if (date.isYesterday()) {
      return 'Yesterday'
    }

    return date.format('D MMMM YYYY')
  } catch (error) {
    console.error('Error formatting wallet group date:', error)
    return 'Unknown Date'
  }
}

/**
 * Formats a date for widget relative time display
 * Returns humanized relative time if less than a week old, otherwise formatted date
 * @param dateString - ISO date string or date string
 * @returns Formatted relative time or date string
 */
export const formatWidgetRelativeTime = (dateString: string): string => {
  try {
    const date = dayjs(dateString)

    if (!date.isValid()) {
      return ''
    }

    const now = dayjs()
    const diffInDays = now.diff(date, 'day')

    // If less than a week old, show relative time
    if (diffInDays < 7) {
      return date.fromNow()
    }

    // Otherwise show formatted date
    return date.format('D MMMM YYYY')
  } catch (error) {
    console.error('Error formatting widget relative time:', error)
    return ''
  }
}
