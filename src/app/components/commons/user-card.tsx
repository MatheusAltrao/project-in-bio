import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Plus,
} from "lucide-react";
import Button from "../ui/button";
import Image from "next/image";
import { EditSocialLinksDialog } from "./edit-social-links-dialog";
import { ProfileProps } from "@/action/user/get-profile-data-action";
import Link from "next/link";
import { AddCustomLinkDialog } from "./add-custom-link-dialog";
import { formattedUrl } from "@/lib/utils";
import EditUserCardDialog from "./edit-user-card-dialog";
import { getDownloadURLFromPath } from "@/lib/firebase";

interface UserCardProps {
  profile?: ProfileProps;
  isOwner: boolean;
}

export default async function UserCard({ profile, isOwner }: UserCardProps) {
  const profileImage =
    (await getDownloadURLFromPath(profile?.imagePath)) || "/perfil.jpeg";
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border-white border-opacity-10 bg-[#121212] p-8">
      <div className="flex flex-col items-center justify-center gap-2 w-full ">
        <div className="size-48">
          <Image
            width={200}
            height={200}
            src={profileImage}
            alt="Matheus"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="flex items-center flex-col  justify-center">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold">
              {profile?.name || "Matheus Altrão"}
            </h3>
            {isOwner && (
              <EditUserCardDialog
                profile={profile}
                profileImage={profileImage}
              />
            )}
          </div>
          <p className="opacity-40">
            {profile?.description || "Dev front-end"}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Mídias</span>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            {profile?.socialMedias?.github && (
              <Link
                target="_blank"
                href={profile?.socialMedias?.github}
                className="button-link"
              >
                <Github /> Github
              </Link>
            )}

            {profile?.socialMedias?.facebook && (
              <Link
                target="_blank"
                href={profile?.socialMedias?.facebook}
                className="button-link"
              >
                <Facebook /> Facebook
              </Link>
            )}

            {profile?.socialMedias?.instagram && (
              <Link
                target="_blank"
                href={profile?.socialMedias?.instagram}
                className="button-link"
              >
                <Instagram /> Instagram
              </Link>
            )}

            {profile?.socialMedias?.linkedin && (
              <Link
                target="_blank"
                href={profile?.socialMedias?.linkedin}
                className="button-link"
              >
                <Linkedin /> Linkedin
              </Link>
            )}

            {profile?.socialMedias?.twitter && (
              <Link
                target="_blank"
                href={profile?.socialMedias?.twitter}
                className="button-link"
              >
                <Twitter /> Twitter
              </Link>
            )}
          </div>

          {isOwner && (
            <EditSocialLinksDialog socialMedias={profile?.socialMedias} />
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <span className="text-xs font-medium uppercase">Outros</span>
          {profile?.link1 && (
            <Link
              className="w-full"
              target="_blank"
              href={formattedUrl(profile?.link1.url)}
            >
              <button className="button-link">{profile.link1.title}</button>
            </Link>
          )}

          {profile?.link2 && (
            <Link target="_blank" href={formattedUrl(profile?.link2.url)}>
              <button className="button-link">{profile.link2.title}</button>
            </Link>
          )}

          {profile?.link3 && (
            <Link target="_blank" href={formattedUrl(profile?.link3.url)}>
              <button className="button-link">{profile.link3.title}</button>
            </Link>
          )}
        </div>
        {isOwner && (
          <div className="flex flex-col items-center justify-center gap-2">
            <AddCustomLinkDialog />
          </div>
        )}
      </div>
    </div>
  );
}
