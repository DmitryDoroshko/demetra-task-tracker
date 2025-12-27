import styles from "./CustomCheckbox.module.scss";
import React, { type HTMLAttributes, useId } from "react";

type CustomCheckboxProps = {
  label?: string | React.ReactNode;
  checked?: boolean;
} & Omit<HTMLAttributes<HTMLInputElement>, "type">;

export const CustomCheckbox: React.FC<CustomCheckboxProps> = (
  { label, checked, onChange, ...restProps },
) => {
  const customId = useId();
  const checkboxId = restProps.id || customId;

  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.customCheckboxInput}
        checked={checked}
        id={checkboxId}
        onChange={onChange}
        {...restProps}
      />
      <label htmlFor={checkboxId} className={styles.customCheckboxLabel}>
        <span className={styles.customCheckboxBox}>
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.customCheckboxCheckmark}
          >
            <path
              d="M1 4.5L4.5 8L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div
          className={`${styles.customCheckboxText} ${
            checked ? styles.active : ""
          }`}
        >
          {label}
        </div>
      </label>
    </div>
  );
};