import React from "react";
import styles from "./CustomInput.module.scss";

interface CustomInputProps extends React.HTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  name?: string;
  placeholder?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ icon, style, name, placeholder, ...otherProps }) => {
  return (
    <div className={styles.action} style={style ? style : {}}>
      <input type="text" className={styles.input} {...otherProps} name={name ? name : ""}
             placeholder={placeholder ? placeholder : ""} {...otherProps} />
      {icon ? <button className={styles.buttonWithIcon}>{icon}</button> : null}
    </div>
  );
};