'use client'

import { useRouter } from 'next/navigation'
import UserForm from './UserForm'

interface EditUserFormProps {
  user: any
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const router = useRouter()
  const { id, name, profile_picture, birthdate, active_status, description } =
    user

  const handleEditUser = async (userData: FormData) => {
    try {
      await fetch(`https://tasks.vitasoftsolutions.com/userdata/${id}/`, {
        method: 'PUT',
        body: userData,
      })

      router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <UserForm
      isEditing
      initialValues={{
        name,
        description,
        birthDate: birthdate,
        isActive: active_status,
        profilePicture: profile_picture,
      }}
      onSubmit={handleEditUser}
    />
  )
}
