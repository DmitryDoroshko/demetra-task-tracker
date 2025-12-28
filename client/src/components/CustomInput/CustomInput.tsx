import React, { type ChangeEvent, useState } from "react";
import styles from "./CustomInput.module.scss";
import classNames from "classnames";

interface BaseProps {
  icon?: React.ReactNode;
  onInputChange: (value: string) => void;
  multipleRows?: boolean;
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
    ...otherProps
  }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const enteredInput = (e.target as HTMLInputElement).value;

    setInputValue(enteredInput);
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
          value={inputValue}
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
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        placeholder={placeholder}
      />
      {icon && <button className={styles.buttonWithIcon}>{icon}</button>}
    </div>
  );
};