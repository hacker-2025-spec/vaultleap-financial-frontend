export const getFormattedTime = (date: Date) => {
  const locale = navigator.language || 'en-US'
  const hour12 = new Intl.DateTimeFormat(locale).resolvedOptions().hour12
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: hour12,
    timeZoneName: 'short',
  }
  return date.toLocaleString(locale, options).replace('at', ' •')
}
export const getFormattedDate = (date: Date) => {
  const locale = navigator.language || 'en-US'
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleString(locale, options).replace('at', ' •')
}

export const getFormattedCurrentTime = () => getFormattedTime(new Date())
