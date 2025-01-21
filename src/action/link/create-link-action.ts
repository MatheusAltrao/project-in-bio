import { auth } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'

export async function createLinkAction(link: string) {
  const session = await auth()

  if (!session?.user) return

  try {
    await db.collection('profiles').doc(link).set({
      userId: session?.user?.id,
      totalVisits: 0,
      createdAt: Timestamp.now().toMillis(),
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
