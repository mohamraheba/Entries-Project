import { useState, useCallback } from 'react'
import { entryApi } from '@/entities/entry/api/entryApi'

export const useEntryForm = ({ initialEntry = {}, onSuccess }) => {
  const [formState, setFormState] = useState(initialEntry) // Track the form state
  const [isLoading, setIsLoading] = useState(false) // Track the loading state
  const [error, setError] = useState(null) // Track errors

  // Update form state when user changes input
  const handleChange = (field, value) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }))
  }

  // Submit form data
  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (formState.id) {
        // Update existing entry
        await entryApi.updateEntry(formState.id, formState)
      } else {
        // Create a new entry
        await entryApi.createEntry(formState)
      }

      if (onSuccess) onSuccess() // Trigger success callback
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [formState, onSuccess])

  return {
    formState,
    handleChange,
    handleSubmit,
    isLoading,
    error,
  }
}
