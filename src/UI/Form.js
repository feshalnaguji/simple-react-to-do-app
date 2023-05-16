import classes from "./Form.module.css";

const Form = (props) => {
  return (
    <form className={classes.form} onSubmit={props.onClick}>
      {props.children}
    </form>
  );
};

export default Form;
