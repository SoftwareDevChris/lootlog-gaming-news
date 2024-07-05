import "./CategoriesPage.scss";

import { Button } from "@/components/ui/button/Button";

import { getAllCategoriesWithArticles } from "@/lib/queries";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getAllCategoriesWithArticles();

  return (
    <div className="admin-categories-page">
      <div>
        <h1>Categories</h1>
        <Button className="button btn-primary">
          <Link href="categories/new-category">Create category</Link>
        </Button>
      </div>

      <div>
        {!categories.categories ||
          (categories.categories.length < 1 && (
            <p>{"No categories were found."}</p>
          ))}

        {categories.categories && categories.categories.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Articles</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id.toString()}</td>
                  <td>{category.name}</td>
                  <td>{category.articles.length}</td>
                  <td className="td-actions">
                    <Button className="button btn-outlined">
                      <span>Edit</span>
                    </Button>
                    <Button className="button btn-delete">
                      <span>Delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
