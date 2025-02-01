"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";

export type LinkProps = {
  title: string;
  url: string;
};

interface AddCustomLinkActionProps {
  profileId: string;
  link1: LinkProps;
  link2: LinkProps;
  link3: LinkProps;
}

export async function addCustomLinkAction({
  profileId,
  link1,
  link2,
  link3,
}: AddCustomLinkActionProps) {
  const session = await auth();
  if (!session?.user) return;
  try {
    await db.collection("profiles").doc(profileId).update({
      link1,
      link2,
      link3,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
