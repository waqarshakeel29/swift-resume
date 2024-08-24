import cx from "classnames";
import styles from "./Label.module.scss";
import { ReactNode } from "react";

type Size = "medium" | "small";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  size?: Size;
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Label = ({
  htmlFor,
  children,
  size = "medium",
  className = "",
  ...props
}: LabelProps) => {
  const labelClass = cx(className, styles["label"], {
    [styles[`label--${size}`]]: size,
  });

  return (
    <label htmlFor={htmlFor} className={labelClass} {...props}>
      {children}
    </label>
  );
};
