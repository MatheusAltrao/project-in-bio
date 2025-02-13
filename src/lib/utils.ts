import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeLink(link?: string) {
  if (!link) return "";

  return link
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .replace(/[!@#$%^&*()_+\-=\]{};':"\\|,ˆ.<>?]+/, "")
    .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
  const compressPromisse = files.map(async (file) => {
    try {
      return await compressImage(file);
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  return (await Promise.all(compressPromisse)).filter((file) => file !== null);
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/png",
    };
    imageCompression(file, options).then((compressedFile) => {
      resolve(compressedFile);
    });
  });
};

export const formatUrl = (link: string) => {
  const url = link.startsWith("http") ? link : `https://${link}`;
  return url;
};

export function triggerImageInput(id: string) {
  document.getElementById(id)?.click();
}

export function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0] ?? null;
  if (file) {
    const imageURL = URL.createObjectURL(file);
    return imageURL;
  }
  return null;
}
