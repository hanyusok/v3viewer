import { defineStore } from "pinia"
import { serverTimestamp } from 'firebase/firestore'

export const useLeadStore = defineStore({
  id: "lead",
  state: () => ({
    formData: {
      createdAt: serverTimestamp()
    }
  })
})
