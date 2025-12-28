import React, { type ChangeEvent } from "react";
import styles from "./CustomInput.module.scss";
import classNames from "classnames";

interface BaseProps {
  icon?: React.ReactNode;
  onInputChange: (value: string) => void;
  multipleRows?: boolean;
  value: string;
}

type CustomInputProps = BaseProps & (
  | (React.InputHTMLAttributes<HTMLInputElement> & { multipleRows?: false })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { multipleRows: true })
  );

export const CustomInput: React.FC<CustomInputProps> = (
  {
    icon,
    style,
    name,
    placeholder,
    onInputChange,
    multipleRows,
    value,
    ...otherProps
  }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const enteredInput = (e.target as HTMLInputElement).value;
    onInputChange(enteredInput);
  };

  if (multipleRows) {
    return (
      <div className={styles.action} style={style}>
        <textarea
          {...(otherProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          name={name}
          className={classNames(styles.input, styles.textarea)}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          rows={5}
        />
        {icon && <button className={styles.buttonWithIcon}>{icon}</button>}
      </div>
    );
  }

  return (
    <div className={styles.action} style={style}>
      <input
        {...(otherProps as React.InputHTMLAttributes<HTMLInputElement>)}
        type="text"
        className={styles.input}
        value={value}
        onChange={handleInputChange}
        name={name}
        placeholder={placeholder}
      />
      {icon && <button className={styles.buttonWithIcon}>{icon}</button>}
    </div>
  );
};