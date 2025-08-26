'use client'

import { useEffect } from 'react'
import { authClient } from '@/lib/auth/client'

export function AutoAuth() {
  useEffect(() => {
    const checkAndSignIn = async () => {
      const { data: { user } } = await authClient.getUser()
      
      if (!user) {
        await authClient.signInAnonymously()
      }
    }
    
    checkAndSignIn()
  }, [])

  return null
}