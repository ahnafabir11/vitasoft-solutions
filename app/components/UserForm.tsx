'use client'

import styles from './userForm.module.css'
import Dropzone from 'react-dropzone'
import DatePicker from 'react-datepicker'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useState } from 'react'
import Image from 'next/image'
import { getFileFromObjectURL } from '../utils/helper'
import dayjs from 'dayjs'

export type InitialValues = {
  name: string
  profilePicture: string | null
  birthDate: string | null
  isActive: boolean
  description?: string | null
}

interface UserFormProps {
  isEditing?: boolean
  initialValues?: InitialValues
  onSubmit: (values: FormData) => void
}

export default function UserForm({
  onSubmit,
  isEditing,
  initialValues,
}: UserFormProps) {
  const [name, setName] = useState<string>(initialValues?.name || '')
  const [profilePicture, setProfilePicture] = useState<string | null>(
    initialValues?.profilePicture ?? null
  )
  const [isActive, setIsActive] = useState<boolean>(
    initialValues?.isActive || false
  )
  const [description, setDescription] = useState<string | null>(
    initialValues?.description || ''
  )
  const [birthDate, setBirthDate] = useState<string | null>(
    initialValues?.birthDate || null
  )

  const handleFormSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    if (!name) return alert('Name is required!')
    if (!birthDate) return alert('Birth Date is required!')

    const form = new FormData()

    form.append('name', name)
    form.append('birthdate', birthDate)

    if (!isEditing && profilePicture)
      form.append('profile_picture', await getFileFromObjectURL(profilePicture))
    if (isActive) form.append('active_status', `${isActive}`)
    if (description) form.append('description', description)

    onSubmit(form)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={styles.formControl}>
        <label htmlFor="name" className={styles.formItemLabel}>
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          className={styles.input}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="profilePicture" className={styles.formItemLabel}>
          Profile Picture:
        </label>
        {profilePicture ? (
          <div className={styles.selected_image_container}>
            {!isEditing && (
              <button
                className={styles.selected_image_close_btn}
                onClick={() => setProfilePicture(null)}
              >
                -
              </button>
            )}

            <Image
              width={200}
              height={200}
              src={profilePicture}
              alt="profile picture"
            />
          </div>
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) =>
              setProfilePicture(URL.createObjectURL(acceptedFiles[0]))
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className={styles.dropArea} {...getRootProps()}>
                  <input id="profilePicture" {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        )}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="birthDate" className={styles.formItemLabel}>
          Birth Date:
        </label>
        <DatePicker
          dateFormat="MM/dd/yyyy"
          className={styles.input}
          placeholderText="Select your birth date"
          wrapperClassName={styles.datePickerWrapper}
          selected={birthDate ? new Date(birthDate) : null}
          onChange={(date) => setBirthDate(dayjs(date).format('YYYY-MM-DD'))}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="activeStatus" className={styles.formItemLabel}>
          Active Status:
        </label>
        <input
          type="checkbox"
          name="status"
          id="activeStatus"
          defaultChecked={isActive}
          onClick={() => setIsActive(!isActive)}
        />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="description" className={styles.formItemLabel}>
          Description:
        </label>
        <CKEditor
          data={description}
          editor={ClassicEditor}
          onChange={(_event, editor) => {
            setDescription(editor.getData())
          }}
        />
      </div>

      <button className={styles.btn}>Confirm</button>
    </form>
  )
}
