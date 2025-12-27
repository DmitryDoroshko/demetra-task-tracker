import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.appTitle}>Task Tracker</h1>
    </header>
  );
};