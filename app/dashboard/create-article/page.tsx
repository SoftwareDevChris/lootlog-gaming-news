import { Editor } from "./Editor";

export default function CreateArticle() {
  if (typeof document === "undefined") {
    return null;
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-4xl text-neutral-100">Create Article</h1>

      <div className="my-4">
        <Editor />
      </div>
    </div>
  );
}
