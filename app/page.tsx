import styles from './page.module.css'
import { Metadata } from 'next'
import UserListTable from './components/UserListTable'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Users',
}

export default async function List() {
  const res = await fetch('https://tasks.vitasoftsolutions.com/userdata', {
    cache: 'no-cache',
  })
  const data = await res.json()

  return (
    <main>
      <div className="container">
        <div className={styles.header}>
          <h1 style={{ marginBottom: 12 }}>All Users</h1>
          <Link href="/create">Create User</Link>
        </div>

        <UserListTable users={data} />
      </div>
    </main>
  )
}
