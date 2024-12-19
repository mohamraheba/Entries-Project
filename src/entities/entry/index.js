export { entryApi } from './api/entryApi'
export { ENTRY_ERRORS } from './model/constants'

import { entryApi } from '@entities/entry'

// Fetch entries
const entries = await entryApi.getEntries()

// Create entry
const newEntry = await entryApi.createEntry({
  title: 'New Entry',
  active: true,
})

// Update entry
const updatedEntry = await entryApi.updateEntry(1, {
  active: false,
})

// Delete entry
await entryApi.deleteEntry(1)
