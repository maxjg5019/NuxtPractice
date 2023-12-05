import { useUserStore } from '@/store/auth'

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const userStore = useUserStore()

    if (!userStore.profile?.id) {
      return navigateTo('/login')
    }
  } else {
    return navigateTo('/')
  }
})