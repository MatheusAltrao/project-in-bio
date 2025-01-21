import { Plus, Rocket } from "lucide-react";
import Header from "../(home)/_components/header";
import TextInput from "../components/ui/text-input";
import Button from "../components/ui/button";

export default function CriarPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 py-4">
      <Header />
      <div className="mx-auto mt-[35vh] flex max-w-xl flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-4">
          <h1>Escolha o seu link</h1>
          <Rocket size={20} />
        </div>

        <form className="w-[600px]" action="">
          <div className="flex w-full items-center justify-center gap-2">
            <span>project.bio.com/</span>
            <TextInput />
            <Button>
              {" "}
              <Plus size={20} /> Criar{" "}
            </Button>
          </div>
        </form>
        <span className="text-sm font-medium text-red-500">
          Erro de exemplo
        </span>
      </div>
    </div>
  );
}
