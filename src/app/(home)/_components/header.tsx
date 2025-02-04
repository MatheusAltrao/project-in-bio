import { manageAuthAction } from "@/action/auth/manage-auth-action";
import Button from "@/app/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();

  return (
    <header>
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-light">ProjectsInBio</h1>

        <div className="flex items-center gap-2">
          {session && (
            <Link href={"/criar"}>
              <Button>Minha página</Button>
            </Link>
          )}

          <form action={manageAuthAction}>
            <Button>{session ? "Sair" : "Entrar"}</Button>
          </form>
        </div>
      </nav>
    </header>
  );
}
