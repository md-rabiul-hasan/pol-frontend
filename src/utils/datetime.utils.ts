export const formatDateTime = (dateTime: string): string => {
  const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Parse input datetime
  const date: Date = new Date(dateTime)

  // Extract components
  const day: number = date.getDate()
  const month: string = months[date.getMonth()]
  const year: string = date.getFullYear().toString().slice(-2) // Get last two digits of the year
  let hours: number = date.getHours()
  const minutes: string = String(date.getMinutes()).padStart(2, '0')
  const amPm: string = hours >= 12 ? 'pm' : 'am'

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12

  // Format the final string
  return `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`
}