import { ReactNode } from "react";

export const SectionContainer: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  return <div className="rounded-sm p-4 sm:p-8">{children}</div>;
};
