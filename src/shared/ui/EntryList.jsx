import { useEffect } from 'react'
import { useEntries } from '@/entities/entry/hooks/useEntries'

export const EntryList = () => {
  const { entries, refresh, deleteEntry, loading, error } = useEntries()

  useEffect(() => {
    refresh() // Fetch entries on component mount
  }, [])

  if (loading) return <p>Loading entries...</p>
  if (error) return <p>Error loading entries: {error}</p>

  return (
    <div>
      <h1>Entry List</h1>
      <ul>
        {entries.length === 0 ? (
          <p>No entries found. Add some!</p>
        ) : (
          entries.map((entry) => (
            <li key={entry.id}>
              <div>
                <strong>{entry.title}</strong>
                <p>{entry.description}</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this entry?')) {
                    deleteEntry(entry.id)
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
