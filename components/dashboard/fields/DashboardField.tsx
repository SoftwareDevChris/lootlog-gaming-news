import "./DashboardField.scss";

type Props = {
  label: string;
  description: string;
  value: string;
};

export const DashboardField: React.FC<Props> = ({
  label,
  description,
  value,
}) => {
  return (
    <div className="dashboard-field">
      <div>
        <span className="dashboard-field-label">{label}</span>
        <p className="dashboard-field-description">{description}</p>
      </div>
      <div>
        <span className="dashboard-field-value">{value}</span>
      </div>
    </div>
  );
};
