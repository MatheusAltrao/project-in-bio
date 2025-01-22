'use server'

import { db } from '@/lib/firebase'

export interface ProfileProps {
  userId: string
  createdAt: string
  totalVisits: number
}

export async function getProfileDataAction(profileId: string) {
  if (!profileId) return
  const snapshot = await db.collection('profiles').doc(profileId).get()

  return snapshot.data() as ProfileProps
}
