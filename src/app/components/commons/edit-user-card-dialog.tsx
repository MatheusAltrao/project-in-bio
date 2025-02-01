"use client";

import { UserPen } from "lucide-react";
import Button from "../ui/button";

export default function EditUserCardDialog() {
  return (
    <div>
      <Button variant="icon">
        <UserPen size={20} />
      </Button>
    </div>
  );
}
