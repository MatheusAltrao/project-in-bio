import { getProfileIdAction } from "@/action/user/get-profile-data-action";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const profileId = await getProfileIdAction(session.user?.id as string);

  if (profileId) {
    redirect(`/${profileId}`);
  }
  return <>{children}</>;
}
