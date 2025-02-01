"use server";

import { db } from "@/lib/firebase";
import { LinkProps } from "../link/add-custom-link-action";

export interface ProfileProps {
  name?: string;
  description?: string;
  profilePic?: string;
  imagePath?: string;
  userId: string;
  createdAt: string;
  totalVisits: number;
  socialMedias?: {
    facebook: string;
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string;
  };
  link1?: LinkProps;
  link2?: LinkProps;
  link3?: LinkProps;
  updatedAt: number | undefined;
}

export async function getProfileDataAction(profileId: string) {
  if (!profileId) return;
  const snapshot = await db.collection("profiles").doc(profileId).get();

  return snapshot.data() as ProfileProps;
}
