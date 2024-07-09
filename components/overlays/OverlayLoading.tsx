import { OverlayRoot } from "./OverlayRoot";
import { LoadingSpinner } from "../ui/loading/spinner/LoadingSpinner";

type Props = {
  message?: string;
};

export const OverlayLoading: React.FC<Props> = ({ message }) => {
  return (
    <OverlayRoot>
      <div className="flex items-center rounded-xl bg-neutral-100 p-4 text-neutral-900 ">
        <div className="h-12 w-12">
          <LoadingSpinner theme="orange" />
        </div>
        {message ? (
          <div className="ml-4">
            <p>{message}</p>
          </div>
        ) : null}
      </div>
    </OverlayRoot>
  );
};
