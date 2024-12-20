import { createBrowserRouter, redirect } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { sessionApi } from '@/entities/session/api/sessionApi'

// Loader to protect authenticated routes
const authLoader = async () => {
  try {
    await sessionApi.check() // Ensure the user is authenticated
    return null
  } catch (error) {
    return redirect('/login') // Redirect unauthenticated users to login
  }
}

// Loader for guest-only routes
const guestLoader = async () => {
  try {
    await sessionApi.check() // If authenticated, redirect to home
    return redirect('/')
  } catch (error) {
    return null // Allow access for unauthenticated users
  }
}

// Define routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: authLoader, // Protected route
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: guestLoader, // Guest-only route
  },
  {
    path: '/register',
    element: <RegisterPage />,
    loader: guestLoader, // Guest-only route for registration
  },
])
