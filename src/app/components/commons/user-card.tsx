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

interface UserCardProps {
  profile?: ProfileProps;
  isOwner: boolean;
}

export default function UserCard({ profile, isOwner }: UserCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border-white border-opacity-10 bg-[#121212] p-8">
      <div className="flex flex-col items-center justify-center gap-2 w-full ">
        <div className="size-48">
          <Image
            width={200}
            height={200}
            src={"/perfil.jpeg"}
            alt="Matheus"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="flex items-center flex-col  justify-center">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold">Matheus Altrão</h3>
            {isOwner && <EditUserCardDialog />}
          </div>
          <p className="opacity-40">Resolvo os seus problemas com JS</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Mídias</span>

        <div className="flex flex-wrap gap-2">
          {profile?.socialMedias?.github && (
            <Link
              target="_blank"
              href={profile?.socialMedias?.github}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Github />{" "}
            </Link>
          )}

          {profile?.socialMedias?.facebook && (
            <Link
              target="_blank"
              href={profile?.socialMedias?.facebook}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Facebook />{" "}
            </Link>
          )}

          {profile?.socialMedias?.instagram && (
            <Link
              target="_blank"
              href={profile?.socialMedias?.instagram}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Instagram />{" "}
            </Link>
          )}

          {profile?.socialMedias?.linkedin && (
            <Link
              target="_blank"
              href={profile?.socialMedias?.linkedin}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Linkedin />{" "}
            </Link>
          )}

          {profile?.socialMedias?.twitter && (
            <Link
              target="_blank"
              href={profile?.socialMedias?.twitter}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Twitter />{" "}
            </Link>
          )}

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
              <Button>{profile.link1.title}</Button>
            </Link>
          )}

          {profile?.link2 && (
            <Link target="_blank" href={formattedUrl(profile?.link2.url)}>
              <Button>{profile.link2.title}</Button>
            </Link>
          )}

          {profile?.link3 && (
            <Link target="_blank" href={formattedUrl(profile?.link3.url)}>
              <Button>{profile.link3.title}</Button>
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
