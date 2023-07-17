import React from "react";
import sushiImage from "../../assets/sushi.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Soyomi Alsomi</h1>
        <HeaderCartButton onClick={props.onShowModal} />
      </header>
      <div className={styles["main-image"]}>
        <img src={sushiImage} />
      </div>
    </>
  );
};

export default Header;
