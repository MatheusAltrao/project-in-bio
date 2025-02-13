"use client";
import Button from "@/app/components/ui/button";
import TextInput from "@/app/components/ui/text-input";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function CreateNowButton() {
  const [link, setLink] = useState("");

  return (
    <div className="flex items-center gap-2">
      <p>projectinbio.com/</p>
      <TextInput
        onChange={(e) => setLink(e.target.value)}
        type="text"
        placeholder="seu link"
      />
      <Button
        onClick={() =>
          signIn("google", {
            redirectTo: `/criar?link=${link}`,
          })
        }
      >
        Criar agora
      </Button>
    </div>
  );
}
