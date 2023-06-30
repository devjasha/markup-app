import { useEffect, useState } from "react";
import styles from "./MarkdownEditorNavigation.module.scss";

interface Props {
  clickFunctionCode: void;
  clickFunctionList: void;
  clickFunctionLink: void;
}

const MarkdownEditorNavigation = ({
  clickFunctionCode,
  clickFunctionList,
  clickFunctionLink,
}: Props) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const handleKeydownEvent = (event: any) => {
      if (event.metaKey && event.key === "k") {
        setVisibility(true);
      }

      if ((event.metaKey && event.key === "u") || event.key === "Escape") {
        setVisibility(false);
      }
    };

    window.document.addEventListener("keydown", handleKeydownEvent);
    return () => {
      window.document.removeEventListener("keydown", handleKeydownEvent);
    };
  }, []);

  return (
    <div
      className={styles.header}
      style={{ display: visibility ? "block" : "none" }}
    >
      <button className={styles.button} onClick={clickFunctionCode}>
        code
      </button>
      <button className={styles.button} onClick={clickFunctionList}>
        list
      </button>
      <button className={styles.button} onClick={clickFunctionLink}>
        link
      </button>
    </div>
  );
};

export default MarkdownEditorNavigation;
