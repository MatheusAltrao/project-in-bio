"use server";

import { auth } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";
import { randomUUID } from "crypto";
import { Timestamp } from "firebase-admin/firestore";

export async function saveProfileAction(formData: FormData) {
  const session = await auth();

  if (!session?.user) return;

  try {
    const profileId = formData.get("profileId") as string;
    const yourName = formData.get("yourName") as string;
    const youDescription = formData.get("yourDescription") as string;
    const file = formData.get("profilePic") as File;

    let imagePath = null;
    const generatedId = randomUUID();

    const hasFile = file && file.size > 0;

    if (hasFile) {
      const currentProfile = await db
        .collection("profiles")
        .doc(profileId)
        .get();
      const currentImagePath = currentProfile.data()?.profilePic;

      if (currentImagePath) {
        const currentStorageRef = storage.file(currentImagePath);
        const [exist] = await currentStorageRef.exists();

        if (exist) {
          await currentStorageRef.delete();
        }
      }

      const storageRef = storage.file(
        `profile-images/${profileId}/${generatedId}`
      );
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await storageRef.save(buffer);
      imagePath = storageRef.name;
    }

    await db
      .collection("profiles")
      .doc(profileId)
      .update({
        ...(hasFile && { imagePath }),
        name: yourName,
        description: youDescription,
        profilePic: imagePath,
        updatedAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
