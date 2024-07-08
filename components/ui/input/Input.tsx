import { FC } from "react";

import "./Input.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ ...props }) => {
  return <input {...props} />;
};
