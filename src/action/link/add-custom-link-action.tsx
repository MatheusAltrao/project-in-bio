'use server'

import { db } from '@/lib/firebase'

export type LinkProps = {
  title: string
  url: string
}

interface AddCustomLinkActionProps {
  profileId: string
  link1: LinkProps
  link2: LinkProps
  link3: LinkProps
}

export async function addCustomLinkAction({
  profileId,
  link1,
  link2,
  link3,
}: AddCustomLinkActionProps) {
  try {
    await db.collection('profiles').doc(profileId).update({
      link1,
      link2,
      link3,
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
