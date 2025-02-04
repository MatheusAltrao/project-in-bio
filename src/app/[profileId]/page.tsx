"use server";
import ProjectCard from "../components/commons/project-card";
import TotalVisits from "../components/commons/total-visits";
import UserCard from "../components/commons/user-card";
import Link from "next/link";
import { getProfileDataAction } from "@/action/user/get-profile-data-action";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import NewProjectDialog from "../components/commons/new-project-dialog";
import getProfileProjectsAction from "@/action/project/get-profile-projects-action";
import { getDownloadURLFromPath } from "@/lib/firebase";
import { increaseProfileVisitsAction } from "@/action/user/increase-profile-visits-action";

interface ProfilePageProps {
  params: Promise<{ profileId: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await auth();
  const { profileId } = await params;

  const profileData = await getProfileDataAction(profileId);
  if (!profileData) return notFound();

  const isOwer = profileData.userId === session?.user?.id;
  const projects = await getProfileProjectsAction(profileId);

  if (!isOwer) {
    await increaseProfileVisitsAction(profileId);
  }

  console.log(projects);

  return (
    <div className="min-h-screen w-full space-y-8 ">
      {isOwer && (
        <div className="flex w-full items-center justify-center gap-1 bg-background-secondary py-2 text-center">
          <span className="text-content-body">
            Você esta usando a versão trial.
          </span>
          <Link
            href={`/${profileId}/upgrade`}
            className="font-bold text-accent-green underline"
          >
            Faça um upgrade
          </Link>
        </div>
      )}

      {isOwer && (
        <div className=" flex items-center justify-center  ">
          <TotalVisits visits={profileData.totalVisits} />
        </div>
      )}

      <div className="flex w-full mx-auto max-w-[1000px] flex-col gap-4 p-4">
        <div className="grid grid-cols-2  w-full  gap-10">
          <UserCard profile={profileData} isOwner={isOwer} />
          <div className="flex h-[610px] w-full flex-col content-start gap-4">
            <NewProjectDialog isOwer={isOwer} profileId={profileId} />
            <div className="flex flex-col gap-4 overflow-y-auto">
              {projects.map(async (project) => {
                const image =
                  (await getDownloadURLFromPath(project.imagePath)) || "";

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    image={image}
                    isOwner={isOwer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
