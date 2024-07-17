"use client";

// Auth functions
import { deleteUser } from "@/lib/authService";

// Toast
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button/Button";

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
  const router = useRouter();

  const handleDeleteUser = async () => {
    const res = await deleteUser(userId);

    if (res.status === 200) {
      toast("Your account has been deleted.", {
        icon: "👋",
      });
      router.push("/");
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="dashboard-field">
      <div>
        <span className="dashboard-field-label">{label}</span>
        <p className="dashboard-field-description">{description}</p>
      </div>
      <div className="">
        <Button onClick={handleDeleteUser} className="btn-delete">
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};
