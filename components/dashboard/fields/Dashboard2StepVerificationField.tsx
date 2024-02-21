import { DashboardFieldContainer } from "../containers/DashboardFieldContainer";

type Props = {
  title: string;
  description: string;
};

export const Dashboard2StepVerificationField: React.FC<Props> = ({
  title,
  description,
}) => {
  return (
    <DashboardFieldContainer>
      <div>
        <span className="font-medium text-neutral-900">{title}</span>
        <p className="pt-2 text-sm text-neutral-500">{description}</p>
      </div>
      <div className="mt-4 lg:mt-0">
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" value="" className="peer sr-only" />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full  peer-focus:outline-none peer-focus:ring-4  dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
        </label>
      </div>
    </DashboardFieldContainer>
  );
};
