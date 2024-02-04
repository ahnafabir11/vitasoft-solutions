import EditUserForm from '@/app/components/EditUserForm'
import styles from '@/app/create/page.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit User',
}

export default async function Edit({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://tasks.vitasoftsolutions.com/userdata/${params.id}`,
    { cache: 'no-cache' }
  )
  const user = await res.json()

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h3>Edit User</h3>
            <p>You are able to update user data later!</p>
          </div>

          <EditUserForm user={user} />
        </div>
      </div>
    </main>
  )
}
