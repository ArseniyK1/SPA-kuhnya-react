import { useState } from "react";
import Input from "../../UI/input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [inputAmount, setInputAmount] = useState("1"); // начальное значение "1"

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      inputAmount.trim().length === 0 ||
      +inputAmount < 1 ||
      +inputAmount > 10
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddToCart(+inputAmount);
  };

  const amountInputChangeHandler = (event) => {
    setInputAmount(event.target.value);
    setIsAmountValid(true); // сброс ошибки валидации при изменении значения
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Кол-во"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          step: "1",
          value: inputAmount,
          onChange: amountInputChangeHandler, // добавляем обработчик изменения значения
        }}
      />
      <button>Добавить</button>
      {!isAmountValid && <p>Пожалуйста, введите количество от 1 до 10 </p>}
    </form>
  );
};

export default MealItemForm;
