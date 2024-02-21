type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const DashboardFieldContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col border-b border-neutral-400 py-4 lg:flex-row lg:items-center lg:justify-between">
      {children}
    </div>
  );
};
