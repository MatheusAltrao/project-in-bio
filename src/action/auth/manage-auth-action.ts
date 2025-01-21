'use server'

import { auth, signIn, signOut } from '../../lib/auth'

export async function manageAuthAction() {
  const session = await auth()

  if (!session) {
    return await signIn('google', {
      redirectTo: '/criar',
    })
  }

  return await signOut({
    redirectTo: '/',
  })
}
