'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

interface CreateSocialLinksActionProps {
  profileId: string
  github: string
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
}

export default async function createSocialLinksAction({
  facebook,
  github,
  instagram,
  linkedin,
  profileId,
  twitter,
}: CreateSocialLinksActionProps) {
  const session = await auth()

  if (!session) return false

  try {
    await db.collection('profiles').doc(profileId).update({
      socialMedias: {
        facebook,
        github,
        instagram,
        linkedin,
        twitter,
      },
      updatedAt: Timestamp.now().toMillis(),
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
