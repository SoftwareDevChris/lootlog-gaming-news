import "./Button.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button {...props} className={`button ${props.className}`}>
      {children}
    </button>
  );
};
