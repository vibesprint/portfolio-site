import styles from "./CardDialog.module.css";
import { forwardRef, useRef, useImperativeHandle } from "react";

export const CardDialog = forwardRef(({ content, title }, ref) => {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showModal() {
      dialogRef.current?.showModal();
    },
  }));

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className={styles["dialog"]}>
      <div className={styles["dialog__container"]}>
        <div className={styles["dialog__header"]}>
          <h1 className={styles["dialog__title"]}>{title}</h1>
          <button className={styles["dialog__close-btn"]} onClick={closeDialog}>
            Close
          </button>
        </div>
        {content}
      </div>
    </dialog>
  );
});
