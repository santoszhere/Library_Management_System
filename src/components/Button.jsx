import { classNames } from "../utils";

const Button = ({
  fullWidth,
  severity = "primary",
  size = "base",
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "rounded-full inline-flex flex-shrink-0 justify-center items-center text-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-sm"
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
