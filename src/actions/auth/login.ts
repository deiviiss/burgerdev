'use server'

import { signIn } from '@/auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'SuccessSignin'
  } catch (error) {
    console.error('Error during sign-in:', error)
    return 'CredentialsInvalid'
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })

    return { ok: true, message: 'Sesión iniciada correctamente' }
  } catch (error) {
    console.error('Error during sign-in:', error)
    return { ok: false, message: 'Credenciales incorrectas' }
  }
}
