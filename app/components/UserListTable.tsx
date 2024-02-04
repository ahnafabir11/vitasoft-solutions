'use client'

import Image from 'next/image'
import styles from './userListTable.module.css'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserListTable({ users }: { users: any[] }) {
  const router = useRouter()
  const [itemOffset, setItemOffset] = useState(0)

  const itemsPerPage = 10
  const endOffset = itemOffset + itemsPerPage
  const currentItems = users.slice(itemOffset, endOffset)

  const pageCount = Math.ceil(users.length / itemsPerPage)

  return (
    <>
      <div className={styles.table_container}>
        <table>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Joining Date</th>
              <th>Active Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map(
              ({
                id,
                profile_picture,
                name,
                birthdate,
                joining_date,
                active_status,
              }: any) => (
                <tr key={id}>
                  <td>
                    <Image
                      width={50}
                      height={50}
                      alt="Profile Picture"
                      className={styles.profile_img}
                      src={profile_picture ?? '/no_profile.png'}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{dayjs(birthdate).format('MM/DD/YYYY')}</td>
                  <td>{dayjs(joining_date).format('MM/DD/YYYY')}</td>
                  <td>{active_status ? 'Active' : 'Inactive'}</td>
                  <td>
                    <Link href={`/edit/${id}`}>Edit</Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        onPageChange={({ selected }) =>
          setItemOffset((selected * itemsPerPage) % users.length)
        }
        pageLinkClassName={styles.pagination_btn}
        containerClassName={styles.pagination_container}
        nextLinkClassName={styles.pagination_special_btn}
        activeLinkClassName={styles.pagination_active_btn}
        previousLinkClassName={styles.pagination_special_btn}
      />
    </>
  )
}
