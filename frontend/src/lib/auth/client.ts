import { createClient } from '../supabase/client'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export class AuthClient {
  private supabase = createClient()

  async signInAnonymously() {
    const { data, error } = await this.supabase.auth.signInAnonymously()
    
    if (error) {
      throw error
    }
    
    return data
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    
    if (error) {
      throw error
    }
  }

  getUser() {
    return this.supabase.auth.getUser()
  }

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
}

export const authClient = new AuthClient()