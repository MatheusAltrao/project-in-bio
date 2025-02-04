"use server";

import { db } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function increaseProfileVisitsAction(profileId: string) {
  const profileRef = db.collection("profiles").doc(profileId);

  await db.runTransaction(async (transaction) => {
    const profile = await transaction.get(profileRef);

    if (!profile.exists) {
      console.error("Profile not found");
      return;
    }

    transaction.update(profileRef, {
      totalVisits: FieldValue.increment(1),
    });
  });
}
