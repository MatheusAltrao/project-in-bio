import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import imageCompression from 'browser-image-compression'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeLink(link?: string) {
  if (!link) return ''

  return link
    .replace(/\s/g, '')
    .replace(/[!@#$%^&*()_+\-=\]{};':"\\|,ˆ.<>?]+/, '')
    .toLocaleLowerCase()
}

export async function compressFiles(files: File[]) {
  const compressPromisse = files.map(async (file) => {
    try {
      return await compressImage(file)
    } catch (error) {
      console.log(error)
      return null
    }
  })

  return (await Promise.all(compressPromisse)).filter((file) => file !== null)
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: 'image/png',
    }
    imageCompression(file, options).then((compressedFile) => {
      resolve(compressedFile)
    })
  })
}

export const formattedUrl = (link: string) => {
  const url = link.startsWith('http') ? link : `https://${link}`
  return url
}
