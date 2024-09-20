import { create } from "zustand";
import { TUser } from "@/types/user.types";

type TUserStore = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  user: null,
  setUser: (userObj) => set({ user: userObj }),
}));
