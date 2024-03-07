import { OverlayRoot } from "./OverlayRoot";

// Icons
import { MdError } from "react-icons/md";

type Props = {
  message: string;
};

export const OverlayError: React.FC<Props> = ({ message }) => {
  return (
    <OverlayRoot>
      <div className="flex items-center rounded-xl bg-neutral-100 p-4 text-red-600">
        <MdError className="text-4xl text-red-600" />
        <div className="ml-4">
          <p>{message}</p>
        </div>
      </div>
    </OverlayRoot>
  );
};
