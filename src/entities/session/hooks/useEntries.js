import { useEffect, useState } from 'react'
import { entryApi } from '@/entities/entry/api/entryApi'

export const useEntries = () => {
  const [entries, setEntries] = useState([]) // State for storing entries
  const [loading, setLoading] = useState(false) // Loading state for asynchronous operations
  const [error, setError] = useState(null) // State for storing errors

  // Fetch entries from the API
  const fetchEntries = async () => {
    try {
      setLoading(true) // Start loading
      const data = await entryApi.getEntries() // Fetch entries from the API
      setEntries(data) // Set fetched entries to state
    } catch (err) {
      setError(err.message) // Handle any errors
    } finally {
      setLoading(false) // Stop loading
    }
  }

  // Delete an entry by ID
  const deleteEntry = async (id) => {
    try {
      await entryApi.deleteEntry(id) // API call to delete the entry
      setEntries(entries.filter(entry => entry.id !== id)) // Remove deleted entry from state
    } catch (err) {
      setError(err.message) // Handle any errors
    }
  }

  // Create a new entry
  const createEntry = async (newEntry) => {
    try {
      const createdEntry = await entryApi.createEntry(newEntry) // API call to create an entry
      setEntries([...entries, createdEntry]) // Add the new entry to the state
    } catch (err) {
      setError(err.message) // Handle any errors
    }
  }

  // Update an existing entry by ID
  const updateEntry = async (id, updatedData) => {
    try {
      const updatedEntry = await entryApi.updateEntry(id, updatedData) // API call to update the entry
      setEntries(entries.map(entry => 
        entry.id === id ? updatedEntry : entry
      )) // Update the state with the modified entry
    } catch (err) {
      setError(err.message) // Handle any errors
    }
  }

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEntries()
  }, [])

  // Return state and actions
  return { 
    entries, 
    loading, 
    error, 
    refresh: fetchEntries, 
    deleteEntry, 
    createEntry, 
    updateEntry 
  }
}
