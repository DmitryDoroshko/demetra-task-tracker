import React from "react";
import classNames from "classnames";

import styles from "./CustomButton.module.scss";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType: "primary" | "transparent";
}

export const CustomButton: React.FC<CustomButtonProps> = ({ children, buttonType, ...otherProps }) => {

  const classes = classNames([
      styles.button,
      [styles[buttonType]],
    ],
  );

  return (
    <button className={classes} {...otherProps}>{children}</button>
  );
};