import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div> // {...props.input} - при добавлении обьекта в этот кастомный элемент в инпут добавляются все свойства обьекта, т.е + type: "text"
  );
};

export default Input;
