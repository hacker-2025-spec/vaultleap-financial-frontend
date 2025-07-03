// Basic encryption utilities for auth
const ENCRYPTION_KEY = 'vaultleap_auth_2024'

// Simple XOR encryption (basic obfuscation)
export const encrypt = (text: string): string => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
    result += String.fromCharCode(charCode)
  }
  return btoa(result) // Base64 encode
}

export const decrypt = (encryptedText: string): string => {
  try {
    const decoded = atob(encryptedText) // Base64 decode
    let result = ''
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      result += String.fromCharCode(charCode)
    }
    return result
  } catch {
    return ''
  }
}

// Hash function for password verification
export const simpleHash = (text: string): string => {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

// Credentials
export const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'K7mN9pQ2'
}

// Verify credentials
export const verifyCredentials = (username: string, password: string): boolean => {
  return username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password
}

// Generate auth token
export const generateAuthToken = (username: string, password: string): string => {
  const timestamp = Date.now()
  const payload = `${username}:${simpleHash(password)}:${timestamp}`
  return encrypt(payload)
}

// Verify auth token
export const verifyAuthToken = (token: string): boolean => {
  try {
    const decrypted = decrypt(token)
    const [username, hashedPassword, timestamp] = decrypted.split(':')
    
    // Check if token is not older than 24 hours
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    if (tokenAge > maxAge) {
      return false
    }
    
    // Verify credentials
    const expectedHash = simpleHash(VALID_CREDENTIALS.password)
    return username === VALID_CREDENTIALS.username && hashedPassword === expectedHash
  } catch {
    return false
  }
}
