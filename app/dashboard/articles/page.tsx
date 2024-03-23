import { DashboardCreateArticleField } from "@/components/dashboard/fields/DashboardCreateArticleField";
import { DashboardShowArticlesField } from "@/components/dashboard/fields/DashboardShowArticlesField";

export default function ArticlesPage() {
  return (
    <>
      <DashboardCreateArticleField
        title="Create Article"
        description="Start writing a new article."
      />
      <DashboardShowArticlesField
        title="Your Articles"
        description="Here are all the articles you've written."
      />
    </>
  );
}
