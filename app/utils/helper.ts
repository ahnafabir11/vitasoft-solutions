export function getFileFromObjectURL(objectURL: string): Promise<File> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', objectURL, true)
    xhr.responseType = 'blob'

    xhr.onload = function () {
      if (xhr.status === 200) {
        const file = new File([xhr.response], 'new_file_from_object_url.png')

        resolve(file)
      } else {
        reject('Failed to fetch file data')
      }
    }

    xhr.onerror = function () {
      reject('Failed to fetch file data')
    }

    xhr.send()
  })
}
