import { DashboardCreateArticleField } from "../fields/DashboardCreateArticleField";

export const DashboardArticlesView: React.FC = () => {
  return (
    <>
      <DashboardCreateArticleField
        title="Create Article"
        description="Start writing a new article."
      />
    </>
  );
};
