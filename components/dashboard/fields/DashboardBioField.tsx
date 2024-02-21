import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
};

export const DashboardBioField: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-400 py-4">
      <div>
        <span className="font-medium text-neutral-900">{title}</span>
        <p className="pt-2 text-sm text-neutral-500">{description}</p>
      </div>
      <div>
        <Button className="bg-neutral-200 text-neutral-900 hover:bg-neutral-300">
          Change
        </Button>
      </div>
    </div>
  );
};
