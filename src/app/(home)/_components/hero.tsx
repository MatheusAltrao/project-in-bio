import UserCard from "@/app/components/commons/user-card";
import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";

const Hero = () => {
  return (
    <div className="flex mt-[20vh] items-center">
      <div className="grid grid-cols-2 items-center gap-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold">
              Seus projetos e redes sociais em um único link
            </h1>
            <p className="text-xl text-content-body">
              Crie sua própria página de projetos e compartilhe eles com o
              mundo. Acompanhe o engajamento com Analytics de cliques
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p>projectinbio.com/</p>
            <TextInput type="text" placeholder="seu link" />
            <Button>Criar agora</Button>
          </div>
        </div>
        <div className="h-full w-full bg-[radial-gradient(circle_at_40%_40%,#4B2DBB,transparent_50%)]">
          <div className="relative flex w-full items-center justify-center">
            <UserCard isOwner={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
