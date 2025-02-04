"use server";

import { auth } from "@/lib/auth";
import { db, storage } from "@/lib/firebase";
import { randomUUID } from "crypto";
import { Timestamp } from "firebase-admin/firestore";

export async function createProjectAction(formData: FormData) {
  const session = await auth();

  if (!session?.user) return;

  const profileId = formData.get("profileId") as string;
  const projectName = formData.get("projectName") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const projectDescription = formData.get("projectDescription") as string;
  const file = formData.get("file") as File;

  if (!file) {
    console.error("File is missing in formData");
    return false;
  }

  console.log({ profileId, projectName, projectUrl, projectDescription, file });

  if (!profileId || !projectName || !projectUrl || !projectDescription) {
    console.error("One or more required fields are missing");
    return false;
  }

  const generatedId = randomUUID();

  const storageRef = storage.file(`project-images/${profileId}/${generatedId}`);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await storageRef.save(buffer);
  const imagePath = storageRef.name;

  try {
    await db
      .collection("profiles")
      .doc(profileId)
      .collection("projects")
      .doc(generatedId)
      .set({
        id: generatedId,
        userId: session?.user?.id,
        projectName,
        projectUrl,
        projectDescription,
        imagePath,
        createdAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
