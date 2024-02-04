import { Metadata } from 'next'
import CreateUserForm from '../components/CreateUserFrom'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Create User',
}

export default function Create() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h3>Create User</h3>
            <p>You are able to update user data later!</p>
          </div>

          <CreateUserForm />
        </div>
      </div>
    </main>
  )
}
