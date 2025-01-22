'use server'

import { db } from '@/lib/firebase'

export interface ProfileProps {
  userId: string
  createdAt: string
  totalVisits: number
  socialMedias?: {
    facebook: string
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
  updatedAt: number | undefined
}

export async function getProfileDataAction(profileId: string) {
  if (!profileId) return
  const snapshot = await db.collection('profiles').doc(profileId).get()

  return snapshot.data() as ProfileProps
}
