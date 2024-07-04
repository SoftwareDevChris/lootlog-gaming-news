"use client";

import "./DashboardField.scss";

import { useState } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button/Button";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  getAllUsers,
  getArticlesByUser,
  toggleArticleFeatureStatusById,
  toggleArticlePublicStatusById,
} from "@/lib/queries";

// Types
import { TUser } from "@/types/types";

// Toast
import toast from "react-hot-toast";

type Props = {
  title: string;
  description: string;
};

export const DashboardShowUsersField: React.FC<Props> = ({
  title,
  description,
}) => {
  const [users, setUsers] = useState<TUser[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserArticles = async () => {
    setIsLoading(true);

    const data = await getAllUsers();
    setUsers(data.users as TUser[]);
    setIsLoading(false);
  };

  const handleArticlePublicStatus = async (
    articleId: string,
    publicStatus: boolean,
  ) => {
    const publish = await toggleArticlePublicStatusById(
      articleId,
      publicStatus,
    );

    if (publish.status === 200) {
      toast.success("The article has been updated");
      getUserArticles();
    } else {
      toast.error("An error occurred");
    }
  };

  const handleArticleFeatureStatus = async (
    articleId: string,
    featureStatus: boolean,
  ) => {
    const feature = await toggleArticleFeatureStatusById(
      articleId,
      featureStatus,
    );

    if (feature.status === 200) {
      toast.success("The article has been updated");
      getUserArticles();
    } else {
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <div className="dashboard-field">
        <div>
          <span className="dashboard-field-label">{title}</span>
          <p className="dashboard-field-description">{description}</p>
        </div>

        <div>
          <Button
            disabled={isLoading}
            onClick={getUserArticles}
            className="btn-outlined"
          >
            {isLoading ? (
              <LoadingSpinner theme="orange" />
            ) : users && users.length > 0 ? (
              <span>Refresh</span>
            ) : (
              <span>Get users</span>
            )}
          </Button>
        </div>
      </div>

      {users === null || users.length < 1 ? <p>No users were found.</p> : null}
      {users && users.length > 0 && (
        <div className="users-table-wrapper">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className=" odd:bg-neutral-300" key={user.id}>
                  <td className="p-1">{user.firstName}</td>
                  <td className="p-1 capitalize">{user.lastName}</td>
                  <td className="p-1">{user.email}</td>
                  <td className="space-x-2 p-1">
                    {/* Edit */}
                    <Button className="bg-neutral-400">
                      <Link href={`/dashboard/users/${user.id}`}>Edit</Link>
                    </Button>

                    {/* Delete  */}
                    <Button className="btn-delete">
                      <span>Delete</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
