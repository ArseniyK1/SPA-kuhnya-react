import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const totalAmount = `$${Math.abs(ctx.totalAmount).toFixed(2)}`;

  const hasItems = ctx.items.length > 0;

  const removeCartItemHandler = (id) => {
    ctx.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addCartItemHandler.bind(null, item)}
            onRemove={removeCartItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          Закрыть
        </button>
        {hasItems && <button className={styles.button}>Заказ</button>}
      </div>
    </Modal>
  );
};

export default Cart;
