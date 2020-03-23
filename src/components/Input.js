import React from "react";
import TextField from "@material-ui/core/TextField";

const Input = props => {
  let { InputProps } = props;

  if (InputProps === null) {
    InputProps = { disableUnderline: true };
  } else {
    InputProps = { ...InputProps, disableUnderline: true };
  }

  return <TextField {...props} variant="filled" InputProps={InputProps} />;
};

export default Input;
