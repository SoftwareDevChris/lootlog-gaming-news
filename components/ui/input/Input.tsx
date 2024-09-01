import { FC } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ ...props }) => {
  return <input {...props} />;
};
