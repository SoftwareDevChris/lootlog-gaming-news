"use client";
import { useState } from "react";

// Components
import { Button } from "@/components/ui/button";

// Queries
import { getAllUsers } from "@/lib/queries";
import { TUser } from "@/types/types";

export default function UsersPage() {
  const [users, setUsers] = useState<TUser[]>([]);

  const fetchUsers = async () => {
    const users = await getAllUsers();

    if (users.users) {
      setUsers(users.users);
      return;
    } else {
      return [];
    }
  };

  return (
    <>
      <div className="flex flex-col border-b border-neutral-400 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-medium text-neutral-900">Get users</span>
          <p className="pt-2 text-sm text-neutral-500">
            Gets every user that has an account on the website
          </p>
        </div>
        <Button
          onClick={fetchUsers}
          className="mt-2 w-fit border border-neutral-300 bg-neutral-100 text-neutral-900 hover:bg-neutral-100 md:mt-0"
        >
          Get users
        </Button>
      </div>

      {/* Display users */}
      {users.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-neutral-900">Users</h2>
          <ul className="mt-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="mb-2 flex flex-col overflow-hidden rounded-xl bg-neutral-100 px-2 py-4 text-sm hover:bg-neutral-300 md:text-base"
              >
                <div>
                  <span className="text-neutral-900">
                    {user.firstName + " "}
                  </span>
                  <span className="text-neutral-900">{user.lastName}</span>
                </div>

                <span className="text-xs text-neutral-500 md:text-sm">
                  {user.email}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
