import { axiosInstance } from '@shared/api/axios'

const ENDPOINTS = {
  GET_ENTRIES: '/entries',
  GET_ENTRY: (id) => `/entries/${id}`,
  CREATE_ENTRY: '/entries',
  UPDATE_ENTRY: (id) => `/entries/${id}`,
  DELETE_ENTRY: (id) => `/entries/${id}`,
}

export const entryApi = {
  async getEntries() {
    const { data } = await axiosInstance.get(ENDPOINTS.GET_ENTRIES)
    return data
  },

  async getEntryById(id) {
    const { data } = await axiosInstance.get(ENDPOINTS.GET_ENTRY(id))
    return data
  },

  async createEntry(entry) {
    const { data } = await axiosInstance.post(ENDPOINTS.CREATE_ENTRY, entry)
    return data
  },

  async updateEntry(id, entry) {
    const { data } = await axiosInstance.put(ENDPOINTS.UPDATE_ENTRY(id), entry)
    return data
  },

  async deleteEntry(id) {
    await axiosInstance.delete(ENDPOINTS.DELETE_ENTRY(id))
  },
}
