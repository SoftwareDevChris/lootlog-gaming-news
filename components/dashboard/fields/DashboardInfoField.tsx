import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";

type Props = {
  title: string;
  description: string;
  value: string;
};

export const DashboardInfoField: React.FC<Props> = ({
  title,
  description,
  value,
}) => {
  return (
    <DashboardFieldContainer>
      <div>
        <span className="font-medium text-neutral-900">{title}</span>
        <p className="pt-1 text-sm text-neutral-500">{description}</p>
      </div>
      <div className="mt-4 lg:mt-0">
        <span className="text-neutral-900">{value}</span>
      </div>
    </DashboardFieldContainer>
  );
};
