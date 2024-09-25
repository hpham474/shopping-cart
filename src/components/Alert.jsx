import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Alert.module.css";

function Alert({ message }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.alert} ${exit ? styles.exit : ""}`}>
      {message}
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;
