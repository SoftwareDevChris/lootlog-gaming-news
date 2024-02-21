"use client";

import { useState } from "react";

// Components
import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";
import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/button";

// Types
import { TCategory } from "@/types/types";

type Props = {
  title: string;
  description: string;
  categories?: TCategory[] | null;
};

export const DashboardCreateArticleField: React.FC<Props> = ({
  title,
  description,
  categories,
}) => {
  const [toggleEditor, setToggleEditor] = useState(false);

  return (
    <div>
      <DashboardFieldContainer>
        <div>
          <span className="font-medium text-neutral-900">{title}</span>
          <p className="pt-2 text-sm text-neutral-500">{description}</p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button
            onClick={() => setToggleEditor(!toggleEditor)}
            className="border border-neutral-300 bg-neutral-100 text-neutral-900 hover:border-neutral-200 hover:bg-neutral-200"
          >
            {!toggleEditor ? "Open editor" : "Close editor"}
          </Button>
        </div>
      </DashboardFieldContainer>

      <div
        className={` overflow-hidden transition-[max-height] delay-0 duration-300 ease-in-out ${
          !toggleEditor ? "max-h-0" : "max-h-[2000px]"
        }`}
      >
        <Editor />
      </div>
    </div>
  );
};
