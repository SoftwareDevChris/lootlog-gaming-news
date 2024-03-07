import { OverlayRoot } from "./OverlayRoot";

// Icons
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  message: string;
};

export const OverlaySuccess: React.FC<Props> = ({ message }) => {
  return (
    <OverlayRoot>
      <div className="flex items-center rounded-xl bg-neutral-100 p-4 text-green-600">
        <FaCheckCircle className="text-4xl text-green-600" />
        <div className="ml-4">
          <p>{message}</p>
        </div>
      </div>
    </OverlayRoot>
  );
};
