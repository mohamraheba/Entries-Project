export const sessionApi = {
    // Login function
    async login({ email, password }) {
      try {
        // Simulate an API call to authenticate
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
  
        if (!response.ok) {
          throw new Error('Invalid email or password')
        }
  
        const { token } = await response.json()
        sessionStorage.setItem('authToken', token) // Use sessionStorage instead of localStorage
        return { token }
      } catch (error) {
        throw new Error(error.message || 'An error occurred during login')
      }
    },
  
    // Register function
    async register({ email, password, name }) {
      try {
        // API call to register the user
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        })
  
        if (!response.ok) {
          const errorDetails = await response.json()
          throw new Error(errorDetails.message || 'Registration failed')
        }
  
        const { token } = await response.json()
        sessionStorage.setItem('authToken', token) // Store the token
        return { token }
      } catch (error) {
        throw new Error(error.message || 'An error occurred during registration')
      }
    },
  
    // Password Recovery
    async forgotPassword(email) {
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        })
  
        if (!response.ok) {
          throw new Error('Failed to send password recovery email')
        }
  
        return await response.json()
      } catch (error) {
        throw new Error(error.message || 'An error occurred during password recovery')
      }
    },
  
    // Check authentication status
    async check() {
      const token = sessionStorage.getItem('authToken') // Check token in sessionStorage
      if (!token) throw new Error('Unauthorized')
      return true
    },
  
    // Logout function
    async logout() {
      sessionStorage.removeItem('authToken') // Remove token from sessionStorage
    },
  }
  