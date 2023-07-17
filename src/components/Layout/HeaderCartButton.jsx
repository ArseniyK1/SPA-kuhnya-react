import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const cartItemsNumber = ctx.items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0); // 0 - начальное значение, которое присваивается currentValue, item - каждый элемент это обьект контекста с его значениями

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={styles.badge}>${ctx.totalAmount.toFixed(2)}</span>
    </button>
  );
};

export default HeaderCartButton;
