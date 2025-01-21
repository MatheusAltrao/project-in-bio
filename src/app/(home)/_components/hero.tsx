import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";

const Hero = () => {
  return (
    <div className="mt-[35vh] flex">
      <div className="max-w-[600px] space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">
            Seus projetos e redes sociais em um único link
          </h1>
          <p className="text-xl text-content-body">
            Crie sua própria página de projetos e compartilhe eles com o mundo.
            Acompanhe o engajamento com Analytics de cliques
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p>projectinbio.com/</p>
          <TextInput type="text" placeholder="seu link" />
          <Button>Criar agora</Button>
        </div>
      </div>
      <div className="flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative">
          {/* <UseCard /> */}
          <div className="absolute -bottom-[7%] -right-[45%]"></div>
          {/* <TotalVisits /> */}
          <div className="absolute -left-[45%] top-[20%] -z-10">
            {/* <ProjectCard /> */}
          </div>
          <div className="absolute -left-[55%] top-[5%] -z-10">
            {/* <ProjectCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
