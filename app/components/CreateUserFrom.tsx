'use client'

import { useRouter } from 'next/router'
import UserForm from './UserForm'

export default function CreateUserForm() {
  const router = useRouter()

  const handleCreateUser = async (userData: FormData) => {
    try {
      await fetch('https://tasks.vitasoftsolutions.com/userdata', {
        method: 'POST',
        body: userData,
      })
      router.push('/list')
    } catch (e) {
      console.log(e)
    }
  }

  return <UserForm onSubmit={handleCreateUser} />
}
