import { createClient } from '../supabase/server'

export async function getUser() {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    return error || !user ? null : user
  } catch {
    return null
  }
}