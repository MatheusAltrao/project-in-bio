'use server'

import { db } from '@/lib/firebase'

export async function verifyLinkAction(link: string) {
  const snapshot = await db.collection('profiles').doc(link).get()

  return snapshot.exists
}
