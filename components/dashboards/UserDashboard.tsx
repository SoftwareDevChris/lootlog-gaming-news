"use client";

import { useState } from "react";

// Types
import { TUser } from "@/types/types";

// Components
import { LoadingSpinner } from "../ui/loading";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteUser } from "@/lib/auth";

type Props = {
  userData: {
    data: TUser | null;
    error: string | null;
  };
};

export const UserDashboard: React.FC<Props> = ({ userData }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteUserHandler = async () => {
    const response = await deleteUser();
    console.log(response);
  };

  if (userData.error) {
    setErrorMessage(userData.error);
  }

  if (!userData.data) {
    return null;
  }

  return (
    <div className="m-4 mx-auto max-w-1300 overflow-hidden rounded-md bg-neutral-100 p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      {errorMessage && (
        <div className=" mb-4 p-4 text-red-600">{errorMessage}</div>
      )}
      <div className="flex flex-col space-y-2">
        <div>
          <span className="font-bold">Email:</span> {userData.data.email}
        </div>
        <div>
          <span className="font-bold">First Name:</span>{" "}
          {userData.data.firstName}
        </div>
        <div>
          <span className="font-bold">Last Name:</span> {userData.data.lastName}
        </div>

        {/* Delete User Button */}
        <AlertDialog>
          <AlertDialogTrigger className="w-fit rounded-md bg-red-600 px-4 py-2 text-neutral-100 hover:bg-red-800">
            Delete Account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 outline-none hover:bg-red-800"
                onClick={deleteUserHandler}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
