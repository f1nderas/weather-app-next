import { FC } from "react";
import styles from "./LoadingSpiner.module.scss";
import { Spinner } from "react-bootstrap";

export const LoadingSpinner: FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
