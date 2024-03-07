type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const DashboardViewContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex h-full flex-grow">
      <div
        className={`flex-grow overflow-hidden rounded-2xl bg-neutral-200 p-2 md:mt-0 md:p-8`}
      >
        <div className="overflow-hidden rounded-2xl bg-neutral-100 px-2 pb-2 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
