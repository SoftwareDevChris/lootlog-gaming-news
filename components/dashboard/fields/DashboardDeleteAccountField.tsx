"use client";

// Auth functions
import { deleteUser } from "@/lib/user-api";

// Toast
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button/Button";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";

type Props = {
  label: string;
  description: string;
  userId: number;
};

export const DashboardDeleteAccountField: React.FC<Props> = ({
  label,
  description,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleDeleteUser = async () => {
    setIsLoading(true);

    const res = await deleteUser(userId);

    if (res.ok) {
      toast("Your account is now deleted", { position: "bottom-right" });
      router.replace("/");
      return;
    }

    toast.error("An unknown error occurred", { position: "bottom-right" });
    setIsLoading(false);
    return;
  };

  return (
    <div className="dashboard-field">
      <div>
        <span className="dashboard-field-label">{label}</span>
        <p className="dashboard-field-description">{description}</p>
      </div>
      <div className="">
        <Button
          disabled={isLoading}
          onClick={handleDeleteUser}
          className="btn-delete"
        >
          {isLoading ? <LoadingSpinner size="small" theme="white" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};
