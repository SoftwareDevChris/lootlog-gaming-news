import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button/Button";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";

type Props = {
  title: string;
};

export const FormSubmitButton = ({ title }: Props) => {
  const status = useFormStatus();

  return (
    <Button
      className="button btn-submit"
      disabled={status.pending}
      aria-disabled={status.pending}
    >
      {status.pending ? <LoadingSpinner theme="orange" size="small" /> : title}
    </Button>
  );
};
