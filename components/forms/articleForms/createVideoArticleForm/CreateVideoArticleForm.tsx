"use client";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import "./CreateVideoArticleForm.scss";

import { TCategory } from "@/types/types";

import { createVideoArticle } from "@/lib/articleService";

import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/Label";
import { Button } from "@/components/ui/button/Button";
import { ArticleEditor } from "@/components/editor/ArticleEditor";
import { TInitialVideoArticleState } from "@/lib/schemas";

const initialState: TInitialVideoArticleState = {
  status: 0,
  errors: null,
  message: "",
};

type Props = {
  category: TCategory;
};

export const CreateVideoArticleForm: FC<Props> = ({ category }) => {
  const router = useRouter();

  const handleSubmit = async (
    state: TInitialVideoArticleState,
    data: FormData,
  ) => {
    const withBound = createVideoArticle.bind(null, {
      body: body ?? "",
      categoryId: category.id,
    });
    const res = await withBound(state, data);

    console.log("State errors:", res.errors?.title);

    return res;
  };

  const [body, setBody] = useState<string | undefined>("");
  const [state, action] = useFormState<TInitialVideoArticleState, FormData>(
    handleSubmit,
    initialState,
  );

  return (
    <form action={action}>
      <div className="input-group">
        <Label>Title</Label>
        <Input type="text" name="title" />
        <p className="input-error">{state.errors?.title}</p>
      </div>

      <div className="input-group">
        <Label>Subtitle</Label>
        <Input type="text" name="subtitle" />
        <p className="input-error">{state.errors?.subtitle}</p>
      </div>

      <div className="input-group">
        <Label>Video link</Label>
        <Input type="text" name="videoLink" />
        <div>
          {state.errors?.videoLink?.map((err, i) => {
            return (
              <p className="input-error" key={i}>
                {err}
              </p>
            );
          })}
        </div>
      </div>

      <div className="input-group">
        <Label>Short body</Label>
        <ArticleEditor onChange={(txt) => setBody(txt)} />
        <p className="input-error">{state.errors?.body}</p>
      </div>

      <Button className="button btn-primary" type="submit">
        <span>Create article</span>
      </Button>
    </form>
  );
};
