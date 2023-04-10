import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIdentityStore = defineStore('identity', () => {
  const isAllowed = ref(false)
  return { isAllowed }
})
