import React from "react";
import PropTypes from "prop-types";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
  form: {
    background: "white",
    borderRadius: "5px",
    width: "100%",
    paddingLeft: "10px",
    border: "1px solid rgba(0,0,0,0.25)"
  }
}));

const CustomInput = ({
  className,
  type,
  placeHolder,
  onChange,
  required,
  minLength,
  maxLength
}) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <FormControl className={classes.form}>
        <InputLabel variant="filled" required={required}>
          {placeHolder}
        </InputLabel>
        <Input
          type={type}
          disableUnderline={true}
          onChange={onChange}
          required={required}
          inputProps={{ maxLength, minLength }}
        />
      </FormControl>
    </div>
  );
};

CustomInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number
};

CustomInput.defaultProps = {
  required: false,
  maxLength: 50,
  minLength: 0
};

export default CustomInput;
