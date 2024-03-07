type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-grow bg-neutral-100 py-2 pr-2 md:py-8 md:pr-8">
      {children}
    </div>
  );
};

export default DashboardLayout;
