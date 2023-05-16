import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={classes.input}
      type={props.type}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};

export default Input;
