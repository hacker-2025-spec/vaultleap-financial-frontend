export const getGreeting = (name?: string, email?: string) => {
  const hour = new Date().getHours()
  let greeting

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning'
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon'
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening'
  } else {
    greeting = 'Good evening'
  }

  // Use name if available, otherwise use email or a default greeting
  if (name) {
    return `${greeting}, ${name}`
  } else if (email) {
    // Extract username from email (part before @)
    const username = email.split('@')[0]
    return `${greeting}, ${username}`
  } else {
    return ``
  }
}
