"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import "./CreateArticleForm.scss";

import { TCategory } from "@/types/types";

// Lib
import { resizeImage } from "@/lib/resize-image";
import { TInitialNewsArticleState } from "@/lib/schemas";

// Components
import { Label } from "@/components/ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { ArticleEditor } from "@/components/editor/ArticleEditor";
import { LoadingScreen } from "@/components/ui/loading/screen/LoadingScreen";

// Services
import { createNewsArticle } from "@/lib/articleService";

// Toast
import toast from "react-hot-toast";

type Props = {
  category: TCategory;
};

export const CreateArticleForm: React.FC<Props> = ({ category }) => {
  const router = useRouter();

  const handleSubmit = async (
    state: TInitialNewsArticleState,
    formData: FormData,
  ) => {
    // Resize the image and put in back into the formData
    const resizedImage = await resizeImage(formData.get("image") as File);
    formData.set("image", resizedImage.image as File);

    const withBind = createNewsArticle.bind(null, {
      body: body,
      categoryId: category.id,
    });

    const res = await withBind(state, formData);

    if (res.status === 201) {
      toast.success("Article has been created", {
        icon: "🎉",
        duration: 4000,
      });
      router.push("/dashboard/author/my-articles");
      return res;
    } else return res;
  };

  const initialState: TInitialNewsArticleState = {
    status: 0,
    message: "",
    errors: null,
  };

  const [body, setBody] = useState("");
  const [state, action] = useFormState<TInitialNewsArticleState, FormData>(
    handleSubmit,
    initialState,
  );

  // If the editor is not loaded yet
  if (ArticleEditor === undefined) {
    return <LoadingScreen />;
  }

  return (
    <div className="form-wrapper">
      <h1>Create article</h1>
      <form action={action} className="create-article-form">
        {/* Title */}
        <div className="input-group">
          <Label htmlFor="title">Title</Label>
          <Input required name="title" />
          <p className="input-error">{state.errors?.title}</p>
        </div>

        <div className="input-group">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input required name="subtitle" />
          <p className="input-error">{state.errors?.subtitle}</p>
        </div>

        {/* Image */}
        <div className="input-group">
          <Label>{"Select image (1300x732 or above)"}</Label>
          <Input name="image" required type="file" accept="image/*" />
          <p className="input-error">{state.errors?.image}</p>
        </div>

        {/* Content */}
        <div className="input-group">
          <Label>Article body</Label>
          <ArticleEditor onChange={(text) => setBody(text)} />
          <p className="input-error">{state.errors?.body}</p>
        </div>

        {/* Save */}
        <Button type="submit" className="button btn-primary">
          <span>Create</span>
        </Button>
      </form>
    </div>
  );
};
